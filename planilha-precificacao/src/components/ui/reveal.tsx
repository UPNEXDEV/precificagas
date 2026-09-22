import type { CSSProperties, ElementType, ReactNode } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

interface RevealProps {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}

export function Reveal({ as: Tag = "div", delay = 0, className, children }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
