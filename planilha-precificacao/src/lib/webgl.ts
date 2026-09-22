/**
 * Minimal full-screen-quad WebGL renderer shared by the shader components.
 * - Renders only while the canvas is on screen and the tab is visible
 * - Caps DPR and frame rate to keep GPU usage low
 * - Honors prefers-reduced-motion (renders a single static frame)
 * - Releases every GL resource on destroy
 */

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

export interface ShaderRendererOptions {
  fragmentShader: string
  maxDpr?: number
  resolutionScale?: number
  fps?: number
  speed?: number
  onReady?: () => void
}

export interface ShaderRenderer {
  setSpeed: (speed: number) => void
  destroy: () => void
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (import.meta.env.DEV) console.warn(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function createShaderRenderer(
  canvas: HTMLCanvasElement,
  { fragmentShader, maxDpr = 2, resolutionScale = 1, fps = 60, speed = 1, onReady }: ShaderRendererOptions,
): ShaderRenderer | null {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
  })
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentShader)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
  const positionLoc = gl.getAttribLocation(program, "a_position")
  gl.enableVertexAttribArray(positionLoc)
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(program, "u_res")
  const uTime = gl.getUniformLocation(program, "u_time")

  const reduced = prefersReducedMotion()
  let currentSpeed = speed
  let targetSpeed = speed
  let time = 0
  let lastTs = 0
  let lastDraw = 0
  let raf = 0
  let visible = false
  let destroyed = false
  let readyFired = false
  const frameInterval = 1000 / fps

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr) * resolutionScale
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
  }

  const draw = () => {
    if (destroyed) return
    resize()
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uTime, time)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    if (!readyFired) {
      readyFired = true
      onReady?.()
    }
  }

  const loop = (ts: number) => {
    if (destroyed || !visible) return
    raf = requestAnimationFrame(loop)
    if (!lastTs) lastTs = ts
    const dt = Math.min((ts - lastTs) / 1000, 0.1)
    lastTs = ts
    currentSpeed += (targetSpeed - currentSpeed) * Math.min(1, dt * 4)
    time += dt * currentSpeed
    if (ts - lastDraw < frameInterval - 1) return
    lastDraw = ts
    draw()
  }

  const start = () => {
    if (destroyed || raf) return
    if (reduced) {
      time = 12
      draw()
      return
    }
    lastTs = 0
    raf = requestAnimationFrame(loop)
  }

  const stop = () => {
    cancelAnimationFrame(raf)
    raf = 0
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === "visible"
      if (visible) start()
      else stop()
    },
    { rootMargin: "80px" },
  )
  io.observe(canvas)

  const onVisibility = () => {
    if (document.visibilityState !== "visible") {
      visible = false
      stop()
    } else {
      const rect = canvas.getBoundingClientRect()
      visible = rect.bottom > 0 && rect.top < window.innerHeight
      if (visible) start()
    }
  }
  document.addEventListener("visibilitychange", onVisibility)

  const ro = new ResizeObserver(() => {
    if (reduced || !raf) draw()
  })
  ro.observe(canvas)

  return {
    setSpeed: (s: number) => {
      targetSpeed = s
    },
    destroy: () => {
      destroyed = true
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      gl.deleteBuffer(buffer)
      gl.detachShader(program, vs)
      gl.detachShader(program, fs)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteProgram(program)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}
