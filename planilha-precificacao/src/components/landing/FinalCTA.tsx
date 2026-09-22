import { LiquidMetalButton } from "@/components/ui/liquid-metal-button"
import { SmokeyBackground } from "@/components/ui/smokey-background"
import { Reveal } from "@/components/ui/reveal"
import { CHECKOUT_URL } from "@/lib/constants"
import { CheckoutNote } from "./CheckoutNote"

export function FinalCTA() {
  return (
    <section id="comprar" aria-labelledby="cta-title" className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950">
        <SmokeyBackground />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center sm:px-10 sm:py-32">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              Planilha de precificação para gastronomia
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="cta-title"
              className="mt-5 text-balance text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.04em] text-neutral-50 sm:text-6xl"
            >
              Seu preço precisa de números, <span className="metal-text">não de achismo.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg">
              Organize os custos dos seus produtos e defina preços de venda com mais segurança, usando os números do seu
              próprio negócio.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-10 flex w-full flex-col items-center gap-4">
            <LiquidMetalButton href={CHECKOUT_URL} fullWidth className="min-[480px]:w-auto">
              Quero acessar a planilha
            </LiquidMetalButton>
            <CheckoutNote />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
