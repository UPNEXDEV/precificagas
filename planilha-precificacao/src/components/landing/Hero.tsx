import { LiquidMetalButton } from "@/components/ui/liquid-metal-button"
import { GlassButton } from "@/components/ui/glass-button"
import { SmokeyBackground } from "@/components/ui/smokey-background"
import { Reveal } from "@/components/ui/reveal"
import { CHECKOUT_URL } from "@/lib/constants"
import { CheckoutNote } from "./CheckoutNote"
import { HeroDashboard } from "./HeroDashboard"

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-36">
      <SmokeyBackground className="h-[760px] sm:h-[860px]" />
      <div className="hairline-grid pointer-events-none absolute inset-x-0 top-0 h-[760px] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] whitespace-nowrap px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] min-[400px]:px-3.5 min-[400px]:text-[10.5px] min-[400px]:tracking-[0.12em] sm:text-[11px] sm:tracking-[0.16em] text-neutral-300 backdrop-blur">
              <span className="size-1.5 rounded-full bg-neutral-300" aria-hidden="true" />
              Precificação inteligente para gastronomia
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-7 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-50 min-[400px]:text-5xl sm:text-6xl lg:text-7xl"
            >
              Pare de chutar o preço <span className="metal-text">do que você vende.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg">
              Uma planilha de precificação feita para quem trabalha com comida. Organize os custos de cada produto e
              defina seu preço de venda com clareza, sabendo a margem que fica no seu bolso.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-col items-center gap-4">
            <div className="flex w-full flex-col items-stretch justify-center gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:items-center">
              <LiquidMetalButton href={CHECKOUT_URL} fullWidth className="min-[480px]:w-auto">
                Quero minha planilha
              </LiquidMetalButton>
              <GlassButton href="#planilha" size="lg" showIcon={false} wrapperClassName="w-full min-[480px]:w-auto">
                Ver a planilha
              </GlassButton>
            </div>
            <CheckoutNote />
          </Reveal>
        </div>

        <Reveal delay={320} className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  )
}
