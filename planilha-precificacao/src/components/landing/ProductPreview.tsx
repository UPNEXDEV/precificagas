import type { CSSProperties, ReactNode } from "react"
import { Receipt, Tag, TrendingUp } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { GlassButton } from "@/components/ui/glass-button"
import { CHECKOUT_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./SectionHeading"
import { MarginRing } from "./MarginRing"
import { brl, exampleCosts, exampleMargin, examplePrice, exampleProduct, exampleTotal, pct } from "./mockup-data"

const columns = ["A", "B", "C", "D"]

export function ProductPreview() {
  return (
    <section id="planilha" aria-labelledby="planilha-title" className="relative border-t border-white/[0.06] py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="planilha-title"
          align="center"
          eyebrow="A planilha"
          title="Do custo ao preço, em uma única visão."
          description="Veja com clareza o que compõe o valor de um produto e qual margem ele entrega."
        />

        <Reveal delay={100} className="relative mt-14 sm:mt-20">
          <div className="pointer-events-none absolute inset-x-8 -top-8 h-40 rounded-full bg-white/[0.04] blur-3xl" />

          <figure
            className="card-surface relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 sm:rounded-3xl"
            aria-label={`Mockup ilustrativo da planilha com o exemplo ${exampleProduct}`}
          >
            {/* toolbar */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.015] px-4 py-3 sm:px-5">
              <div className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-md border border-white/[0.07] bg-black/40 px-2.5 font-mono text-[11px] text-neutral-500 sm:max-w-md">
                <span className="text-neutral-400">fx</span>
                <span className="h-3 w-px bg-white/10" />
                <span className="truncate">=SOMA(B2:B5)</span>
              </div>
              <span className="ml-auto hidden rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500 sm:inline">
                Valores ilustrativos
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.6fr_1fr]">
              {/* sheet grid */}
              <div className="min-w-0 border-b border-white/[0.07] lg:border-b-0 lg:border-r">
                <div className="px-4 pb-2 pt-5 sm:px-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-600">Produto</p>
                  <p className="mt-1 text-xl font-medium tracking-tight text-neutral-50 sm:text-2xl">{exampleProduct}</p>
                </div>

                <table className="mt-3 w-full border-collapse text-left text-[13px] sm:text-sm">
                  <caption className="sr-only">Exemplo de composição de custos do produto {exampleProduct}</caption>
                  <thead>
                    <tr className="border-y border-white/[0.07] bg-white/[0.02] font-mono text-[10px] text-neutral-600">
                      <th scope="col" className="w-9 border-r border-white/[0.07] py-1.5 text-center font-normal">
                        #
                      </th>
                      {columns.map((c, i) => (
                        <th
                          key={c}
                          scope="col"
                          className={cn(
                            "border-r border-white/[0.07] px-3 py-1.5 text-center font-normal last:border-r-0",
                            i === 2 && "hidden sm:table-cell",
                          )}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                    <tr className="border-b border-white/[0.07] text-[11px] uppercase tracking-wider text-neutral-500">
                      <td className="border-r border-white/[0.07] py-2.5 text-center font-mono text-[10px] text-neutral-600">1</td>
                      <th scope="col" className="border-r border-white/[0.07] px-3 py-2.5 font-medium">Custo</th>
                      <th scope="col" className="border-r border-white/[0.07] px-3 py-2.5 text-right font-medium">Valor</th>
                      <th scope="col" className="hidden border-r border-white/[0.07] px-3 py-2.5 font-medium sm:table-cell">
                        Participação
                      </th>
                      <th scope="col" className="px-3 py-2.5 text-right font-medium">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exampleCosts.map((c, i) => {
                      const share = c.value / exampleTotal
                      return (
                        <tr key={c.label} className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]">
                          <td className="border-r border-white/[0.07] py-3 text-center font-mono text-[10px] text-neutral-600">
                            {i + 2}
                          </td>
                          <td className="border-r border-white/[0.07] px-3 py-3 text-neutral-300">{c.label}</td>
                          <td className="border-r border-white/[0.07] px-3 py-3 text-right font-mono tabular-nums text-neutral-100">
                            {brl(c.value)}
                          </td>
                          <td className="hidden border-r border-white/[0.07] px-3 py-3 sm:table-cell">
                            <div className="h-1.5 w-full min-w-10 overflow-hidden rounded-full bg-white/[0.06]">
                              <div
                                className="bar-fill h-full rounded-full bg-gradient-to-r from-neutral-500 to-neutral-200"
                                style={{ "--fill": share, "--reveal-delay": `${300 + i * 120}ms` } as CSSProperties}
                              />
                            </div>
                          </td>
                          <td className="px-3 py-3 text-right font-mono tabular-nums text-neutral-500">
                            {pct(share)}
                          </td>
                        </tr>
                      )
                    })}
                    <tr className="bg-white/[0.03]">
                      <td className="border-r border-white/[0.07] py-3.5 text-center font-mono text-[10px] text-neutral-600">6</td>
                      <th scope="row" className="border-r border-white/[0.07] px-3 py-3.5 font-medium text-neutral-100">
                        Custo total
                      </th>
                      <td className="border-r border-white/[0.07] px-3 py-3.5 text-right font-mono font-medium tabular-nums text-neutral-50">
                        {brl(exampleTotal)}
                      </td>
                      <td className="hidden border-r border-white/[0.07] px-3 py-3.5 sm:table-cell" />
                      <td className="px-3 py-3.5 text-right font-mono tabular-nums text-neutral-400">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* summary */}
              <div className="grid gap-px bg-white/[0.07] sm:grid-cols-3 lg:grid-cols-1">
                <SummaryCard icon={<Receipt className="size-4" aria-hidden="true" />} label="Custo total" value={brl(exampleTotal)} />
                <SummaryCard
                  icon={<Tag className="size-4" aria-hidden="true" />}
                  label="Preço sugerido"
                  value={brl(examplePrice)}
                  highlight
                />
                <div className="flex items-center justify-between gap-4 bg-neutral-950 p-5 sm:p-6">
                  <div>
                    <p className="inline-flex items-center gap-2 text-[13px] text-neutral-400">
                      <TrendingUp className="size-4 text-neutral-500" aria-hidden="true" />
                      Margem
                    </p>
                    <p className="mt-2 font-mono text-3xl font-medium tabular-nums text-neutral-50 sm:text-2xl lg:text-3xl">{pct(exampleMargin)}</p>
                  </div>
                  <span className="sm:max-lg:hidden">
                    <MarginRing value={exampleMargin} size={60} />
                  </span>
                </div>
              </div>
            </div>
          </figure>
          <p className="mt-4 text-center text-[13px] text-neutral-600">
            Interface meramente ilustrativa. Os valores acima são apenas um exemplo visual.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <GlassButton href={CHECKOUT_URL} size="lg" wrapperClassName="w-full min-[480px]:w-auto">
            Quero minha planilha
          </GlassButton>
        </Reveal>
      </div>
    </section>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: ReactNode
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={cn("bg-neutral-950 p-5 sm:p-6", highlight && "bg-[linear-gradient(180deg,#161616,#0c0c0c)]")}>
      <p className="inline-flex items-center gap-2 text-[13px] text-neutral-400">
        <span className="text-neutral-500">{icon}</span>
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-mono font-medium tracking-tight tabular-nums",
          highlight ? "metal-text text-4xl sm:text-3xl lg:text-4xl" : "text-3xl text-neutral-100 sm:text-2xl lg:text-3xl",
        )}
      >
        {value}
      </p>
    </div>
  )
}
