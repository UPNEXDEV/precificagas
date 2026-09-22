import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "./SectionHeading"

const benefits = [
  {
    title: "Saiba quanto custa produzir",
    text: "Enxergue o custo real de cada produto antes de colocar um preço na etiqueta.",
  },
  {
    title: "Tenha mais clareza na hora de precificar",
    text: "Defina valores com base em números, e não só no que o mercado está cobrando.",
  },
  {
    title: "Organize seus custos",
    text: "Tire as contas do caderno e da memória e deixe tudo estruturado em um só lugar.",
  },
  {
    title: "Tenha uma visão mais profissional do seu negócio",
    text: "Trate a precificação como parte da gestão, com a seriedade que o seu trabalho merece.",
  },
]

export function Benefits() {
  return (
    <section aria-labelledby="beneficios-title" className="relative border-t border-white/[0.06] py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="beneficios-title"
          eyebrow="Benefícios"
          title={
            <>
              Menos dúvida no preço. <span className="text-neutral-500">Mais controle no negócio.</span>
            </>
          }
        />

        <ol className="mt-16 grid gap-x-16 gap-y-14 sm:mt-24 md:grid-cols-2 md:gap-y-20">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 80} className="relative border-t border-white/10 pt-8">
              <span
                className="absolute -top-px left-0 h-px w-16 bg-gradient-to-r from-neutral-200 to-transparent"
                aria-hidden="true"
              />
              <span className="font-mono text-sm tabular-nums text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 max-w-md text-balance text-2xl font-medium leading-tight tracking-[-0.025em] text-neutral-50 sm:text-3xl">
                {b.title}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-400 sm:text-base">{b.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
