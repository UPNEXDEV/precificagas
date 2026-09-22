import { Calculator, FolderKanban, Scale, TrendingUp, Wallet, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { GlassButton } from "@/components/ui/glass-button"
import { CHECKOUT_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./SectionHeading"

interface Item {
  icon: LucideIcon
  title: string
  text: string
  className?: string
}

const items: Item[] = [
  {
    icon: Wallet,
    title: "Controle dos custos",
    text: "Organize os custos envolvidos na produção de cada item, dos ingredientes à embalagem.",
    className: "md:col-span-3",
  },
  {
    icon: Calculator,
    title: "Precificação organizada",
    text: "Tenha uma visão mais clara na hora de definir o preço de venda.",
    className: "md:col-span-3",
  },
  {
    icon: TrendingUp,
    title: "Margem de lucro",
    text: "Visualize melhor a margem obtida em cada produto.",
    className: "md:col-span-2",
  },
  {
    icon: FolderKanban,
    title: "Mais organização",
    text: "Centralize as informações de precificação em um único lugar.",
    className: "md:col-span-2",
  },
  {
    icon: Scale,
    title: "Menos achismo",
    text: "Tome decisões com base nos números do seu negócio.",
    className: "md:col-span-2",
  },
]

export function HowItHelps() {
  return (
    <section aria-labelledby="ajuda-title" className="relative border-t border-white/[0.06] py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="ajuda-title"
          eyebrow="Como a planilha ajuda"
          title="Seus números organizados, seu preço com fundamento."
          description="Uma estrutura simples para sair do chute e enxergar o que realmente compõe o valor de cada produto."
        />

        <div className="mt-14 grid gap-3 sm:mt-16 md:grid-cols-6 md:gap-4">
          {items.map(({ icon: Icon, title, text, className }, i) => (
            <Reveal
              key={title}
              delay={i * 70}
              className={cn(
                "card-surface group relative overflow-hidden rounded-2xl border border-white/[0.08] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] sm:p-7",
                className,
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-neutral-200">
                <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-lg sm:mt-8 font-medium tracking-tight text-neutral-50">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">{text}</p>
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-white/[0.03] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-lg font-medium tracking-tight text-neutral-100">Pronto para organizar seus custos?</p>
            <p className="mt-1 text-[15px] text-neutral-500">A compra é feita pela Kiwify, direto no checkout.</p>
          </div>
          <GlassButton href={CHECKOUT_URL} size="md" wrapperClassName="w-full sm:w-auto">
            Quero minha planilha
          </GlassButton>
        </Reveal>
      </div>
    </section>
  )
}
