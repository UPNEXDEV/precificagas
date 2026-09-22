import type { ReactNode } from "react"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  className?: string
  id?: string
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, id }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</p>
      <h2
        id={id}
        className="mt-4 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-neutral-50 sm:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg">{description}</p>
      )}
    </Reveal>
  )
}
