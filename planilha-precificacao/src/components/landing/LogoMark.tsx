import { useId } from "react"
import { cn } from "@/lib/utils"

/** Símbolo da marca Precifica: três barras com etiqueta de preço. */
export function LogoMark({ className }: { className?: string }) {
  const maskId = useId()
  return (
    <svg viewBox="378 326 148 124" className={cn("h-[22px] w-auto", className)} aria-hidden="true" fill="currentColor">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="378" y="326" width="148" height="124">
          <rect x="378" y="326" width="148" height="124" fill="#fff" />
          <circle cx="513.6" cy="427" r="4.3" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <rect x="380" y="330" width="140" height="23" rx="11.5" />
        <rect x="395" y="368" width="110" height="23" rx="11.5" />
        <rect x="380" y="406" width="140" height="23" rx="11.5" />
        <rect x="489.5" y="412.5" width="27" height="27" rx="4" transform="rotate(45 503 426)" />
      </g>
    </svg>
  )
}

/** Logo completa: símbolo + nome. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-neutral-50", className)}>
      <LogoMark />
      <span className="text-[15px] font-bold uppercase leading-none tracking-[0.14em]">Precifica</span>
    </span>
  )
}
