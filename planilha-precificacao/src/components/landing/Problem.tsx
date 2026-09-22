import { CircleHelp, EyeOff, Layers, Search, Shuffle } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "./SectionHeading"

const problems = [
  {
    icon: CircleHelp,
    title: "Não sabe quanto custa produzir",
    text: "Sabe o preço do chocolate, mas não quanto dele vai em cada unidade.",
  },
  {
    icon: Search,
    title: "Copia o preço do concorrente",
    text: "O valor é definido olhando a vitrine do vizinho, não os próprios custos.",
  },
  {
    icon: Layers,
    title: "Esquece os custos indiretos",
    text: "Gás, energia, embalagem e o seu tempo ficam de fora da conta.",
  },
  {
    icon: EyeOff,
    title: "Vende sem enxergar a margem",
    text: "O caixa gira, mas fica difícil dizer quanto sobra em cada venda.",
  },
  {
    icon: Shuffle,
    title: "Números espalhados",
    text: "Anotações no caderno, no celular e na cabeça. Nada em um só lugar.",
  },
]

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problema-title" className="relative py-24 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="problema-title"
            eyebrow="O problema"
            title={
              <>
                Vender bem não adianta <span className="text-neutral-500">se o preço está errado.</span>
              </>
            }
            description="Na gastronomia, é comum definir preços no feeling. Se algum destes pontos parece familiar, a planilha foi feita para você."
          />
        </div>

        <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {problems.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 70} className="group flex gap-5 py-6 sm:gap-6 sm:py-7">
              <span className="font-mono text-xs tabular-nums text-neutral-600 sm:pt-1">0{i + 1}</span>
              <div className="flex-1">
                <h3 className="flex items-center gap-2.5 text-[17px] font-medium tracking-tight text-neutral-100 sm:text-lg">
                  {title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-500">{text}</p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-neutral-400 transition-colors duration-300 group-hover:border-white/20 group-hover:text-neutral-100">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
