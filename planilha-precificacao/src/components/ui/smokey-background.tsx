import { useEffect, useRef, useState } from "react"
import { createShaderRenderer } from "@/lib/webgl"
import { cn } from "@/lib/utils"

/**
 * Monochrome smoke rendered with domain-warped fbm noise.
 * Intended for a single bounded area (hero / final CTA), never the whole page.
 * Rendered at reduced resolution and paused off-screen.
 */
const SMOKE_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0) * 1.8;
  float t = u_time * 0.05;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(p + 2.4 * r);

  float smoke = smoothstep(0.32, 0.95, f);
  vec2 c = (uv - vec2(0.5, 0.82)) * vec2(1.1, 1.5);
  float fade = 1.0 - smoothstep(0.15, 0.95, length(c));
  fade *= smoothstep(0.0, 0.35, uv.y);

  vec3 base = vec3(0.039);
  vec3 col = base + vec3(0.20) * smoke * fade + vec3(0.035) * f * fade;
  gl_FragColor = vec4(col, 1.0);
}
`

interface SmokeyBackgroundProps {
  className?: string
}

export function SmokeyBackground({ className }: SmokeyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const renderer = createShaderRenderer(canvas, {
      fragmentShader: SMOKE_SHADER,
      maxDpr: 1,
      resolutionScale: window.innerWidth < 768 ? 0.35 : 0.5,
      fps: 30,
      speed: 1,
      onReady: () => setReady(true),
    })
    return () => renderer?.destroy()
  }, [])

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* CSS fallback, visible until (or if) WebGL is ready */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(255,255,255,0.08),transparent_70%)]" />
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-1000",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}
