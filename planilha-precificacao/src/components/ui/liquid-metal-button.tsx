import { forwardRef, useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { createShaderRenderer, type ShaderRenderer } from "@/lib/webgl"
import { cn } from "@/lib/utils"

/**
 * Liquid metal shader — animated chrome bands with a subtle chromatic
 * split on the edges, rendered only on the thin rim around the button.
 */
const LIQUID_METAL_SHADER = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_time * 0.55;

  float w = p.x * 0.9 + p.y * 2.2;
  w += 0.32 * sin(p.x * 2.6 + t * 1.7);
  w += 0.18 * sin(p.y * 7.0 - t * 1.3 + p.x * 1.8);

  float phase = w * 3.6 - t * 2.4;
  float g = 0.5 + 0.5 * sin(phase);
  float r = 0.5 + 0.5 * sin(phase + 0.22);
  float b = 0.5 + 0.5 * sin(phase - 0.22);

  vec3 bands = vec3(pow(r, 2.2), pow(g, 2.2), pow(b, 2.2));
  vec3 dark = vec3(0.12, 0.125, 0.14);
  vec3 light = vec3(0.97, 0.975, 0.99);
  vec3 col = mix(dark, light, bands);

  float spec = pow(max(0.0, sin(phase * 0.5 + 1.2)), 24.0);
  col += spec * 0.35;

  gl_FragColor = vec4(col, 1.0);
}
`

const liquidMetalVariants = cva("lm-button", {
  variants: {
    size: {
      md: "lm-button--md",
      lg: "lm-button--lg",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: { size: "lg", fullWidth: false },
})

export interface LiquidMetalButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof liquidMetalVariants> {
  children: ReactNode
  showIcon?: boolean
}

export const LiquidMetalButton = forwardRef<HTMLAnchorElement, LiquidMetalButtonProps>(
  ({ className, size, fullWidth, children, showIcon = true, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rendererRef = useRef<ShaderRenderer | null>(null)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      rendererRef.current = createShaderRenderer(canvas, {
        fragmentShader: LIQUID_METAL_SHADER,
        maxDpr: 1.5,
        fps: 45,
        speed: 0.6,
        onReady: () => canvas.classList.add("is-ready"),
      })
      return () => {
        rendererRef.current?.destroy()
        rendererRef.current = null
      }
    }, [])

    return (
      <a
        ref={ref}
        className={cn(liquidMetalVariants({ size, fullWidth }), className)}
        onMouseEnter={(e) => {
          rendererRef.current?.setSpeed(1.8)
          onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          rendererRef.current?.setSpeed(0.6)
          onMouseLeave?.(e)
        }}
        {...props}
      >
        <canvas ref={canvasRef} className="lm-button__canvas" aria-hidden="true" />
        <span className="lm-button__inner">
          {children}
          {showIcon && <ArrowRight className="lm-button__icon size-[1.1em]" aria-hidden="true" strokeWidth={2.25} />}
        </span>
      </a>
    )
  },
)
LiquidMetalButton.displayName = "LiquidMetalButton"
