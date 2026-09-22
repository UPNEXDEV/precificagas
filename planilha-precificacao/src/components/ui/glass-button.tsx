import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glassButtonVariants = cva("glass-button", {
  variants: {
    size: {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-[15px]",
      lg: "h-14 px-8 text-base",
    },
  },
  defaultVariants: { size: "md" },
})

export interface GlassButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof glassButtonVariants> {
  children: ReactNode
  showIcon?: boolean
  wrapperClassName?: string
}

export const GlassButton = forwardRef<HTMLAnchorElement, GlassButtonProps>(
  ({ className, wrapperClassName, size, children, showIcon = true, ...props }, ref) => (
    <span className={cn("glass-button-wrap", wrapperClassName)}>
      <a ref={ref} className={cn(glassButtonVariants({ size }), className)} {...props}>
        {children}
        {showIcon && <ArrowRight className="glass-button__icon size-[1.05em]" aria-hidden="true" />}
      </a>
    </span>
  ),
)
GlassButton.displayName = "GlassButton"
