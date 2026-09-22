import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { CHECKOUT_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"

/** Discreet bottom CTA on mobile: appears after the hero, hides near the final CTA. */
export function MobileStickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("topo")
    const finalCta = document.getElementById("comprar")
    if (!hero || !finalCta) return

    let heroVisible = true
    let ctaVisible = false
    const update = () => setShow(!heroVisible && !ctaVisible)

    const heroIo = new IntersectionObserver(([e]) => {
      heroVisible = e.isIntersecting
      update()
    }, { rootMargin: "-40% 0px 0px 0px" })
    const ctaIo = new IntersectionObserver(([e]) => {
      ctaVisible = e.isIntersecting
      update()
    })
    heroIo.observe(hero)
    ctaIo.observe(finalCta)
    return () => {
      heroIo.disconnect()
      ctaIo.disconnect()
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-[transform,opacity] duration-300 md:hidden",
        "bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!show}
    >
      <a
        href={CHECKOUT_URL}
        tabIndex={show ? 0 : -1}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-neutral-100 text-[15px] font-semibold text-neutral-950 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8)] transition-transform active:scale-[0.98]"
      >
        Quero minha planilha
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  )
}
