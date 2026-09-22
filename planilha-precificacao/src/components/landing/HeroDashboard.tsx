import type { CSSProperties } from "react"
import { Percent, Receipt, Tag } from "lucide-react"
import { brl, exampleCosts, exampleMargin, examplePrice, exampleProduct, exampleTotal, pct } from "./mockup-data"
import { MarginRing } from "./MarginRing"

export function HeroDashboard() {
  const max = Math.max(...exampleCosts.map((c) => c.value))

  return (
    <div
      role="img"
      aria-label={`Ilustração da planilha: custos do produto ${exampleProduct}, custo total, preço sugerido e margem`}
      className="relative"
    >
      <div className="pointer-events-none absolute -inset-x-10 -bottom-10 top-1/3 rounded-[50%] bg-white/[0.035] blur-3xl" />

      <div className="card-surface relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-sm sm:rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden gap-1.5 sm:flex">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/[0.06]" />
            </div>
            <p className="truncate font-mono text-[11px] text-neutral-500 sm:text-xs">
              precificação / <span className="text-neutral-300">{exampleProduct.toLowerCase()}</span>
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Exemplo ilustrativo
          </span>
        </div>

        <div className="grid gap-px bg-white/[0.06] md:grid-cols-[1.35fr_1fr]">
          <div className="bg-neutral-950 p-4 sm:p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-medium text-neutral-300">Composição de custos</p>
              <p className="font-mono text-[11px] text-neutral-600">por unidade</p>
            </div>
            <ul className="mt-5 space-y-4">
              {exampleCosts.map((c, i) => (
                <li key={c.label}>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <span className="text-neutral-400">{c.label}</span>
                    <span className="font-mono tabular-nums text-neutral-200">{brl(c.value)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="bar-fill h-full rounded-full bg-gradient-to-r from-neutral-500 to-neutral-200"
                      style={{ "--fill": c.value / max, "--reveal-delay": `${250 + i * 120}ms` } as CSSProperties}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-dashed border-white/10 pt-4">
              <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400">
                <Receipt className="size-4 text-neutral-500" aria-hidden="true" />
                Custo total
              </span>
              <span className="font-mono text-lg font-medium tabular-nums text-neutral-50">{brl(exampleTotal)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-1">
            <div className="col-span-2 bg-neutral-950 p-4 sm:p-6 md:col-span-1">
              <p className="inline-flex items-center gap-2 text-[13px] text-neutral-400">
                <Tag className="size-4 text-neutral-500" aria-hidden="true" />
                Preço sugerido
              </p>
              <p className="metal-text mt-3 font-mono text-4xl font-medium tracking-tight tabular-nums sm:text-[2.75rem]">
                {brl(examplePrice)}
              </p>
              <div className="mt-4 flex h-10 items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3">
                <span className="text-xs text-neutral-500">Preço de venda</span>
                <span className="font-mono text-sm tabular-nums text-neutral-200">
                  {brl(examplePrice)}
                  <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-neutral-400" />
                </span>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-4 bg-neutral-950 p-4 sm:p-6 md:col-span-1">
              <div>
                <p className="inline-flex items-center gap-2 text-[13px] text-neutral-400">
                  <Percent className="size-4 text-neutral-500" aria-hidden="true" />
                  Margem
                </p>
                <p className="mt-2 font-mono text-3xl font-medium tabular-nums text-neutral-50">{pct(exampleMargin)}</p>
              </div>
              <MarginRing value={exampleMargin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
