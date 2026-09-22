import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { CHECKOUT_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Logo } from "./LogoMark"

const links = [
  { href: "#problema", label: "O problema" },
  { href: "#planilha", label: "A planilha" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#faq", label: "Dúvidas" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-white/[0.07] bg-neutral-950/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#topo" aria-label="Precifica — voltar ao topo" className="rounded-md py-1">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded text-sm text-neutral-400 transition-colors duration-200 hover:text-neutral-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={CHECKOUT_URL}
            className="hidden h-9 items-center rounded-full bg-neutral-100 px-4 text-sm font-medium text-neutral-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.97] sm:inline-flex"
          >
            Quero minha planilha
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/[0.06] px-4 pb-5 pt-2 md:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 text-[15px] text-neutral-300 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={CHECKOUT_URL}
          className="mt-3 flex h-12 items-center justify-center rounded-full bg-neutral-100 text-[15px] font-medium text-neutral-950 active:scale-[0.98]"
        >
          Quero minha planilha
        </a>
      </div>
    </header>
  )
}
