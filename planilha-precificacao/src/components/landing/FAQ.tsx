import type { ReactNode } from "react"
import { Plus } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { CHECKOUT_URL } from "@/lib/constants"
import { SectionHeading } from "./SectionHeading"

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Preciso entender de contabilidade?",
    a: "Não. A planilha foi pensada para facilitar a organização dos custos de quem trabalha com gastronomia. A ideia é que você consiga preencher com os números do seu negócio sem precisar de conhecimento contábil.",
  },
  {
    q: "A planilha é para quais tipos de negócio?",
    a: "Para negócios de alimentação em geral: confeitarias, docerias, restaurantes, lanchonetes, pizzarias, marmitarias, cafeterias, food trucks e também quem vende doces, bolos e salgados por conta própria.",
  },
  {
    q: "Consigo usar para diferentes produtos?",
    a: "A proposta da planilha é ajudar você a organizar os custos e a precificar os produtos que vende, seja um bolo, um lanche ou uma marmita. Se tiver alguma dúvida específica sobre o arquivo antes de comprar, consulte as informações disponíveis na página de compra.",
  },
  {
    q: "Como recebo a planilha?",
    a: "A compra e a entrega são processadas pela Kiwify. Após a confirmação do pagamento, as informações de acesso são enviadas pela plataforma para o e-mail informado na compra.",
  },
  {
    q: "Onde faço a compra?",
    a: (
      <>
        A compra é feita diretamente no checkout seguro da Kiwify.{" "}
        <a
          href={CHECKOUT_URL}
          className="font-medium text-neutral-100 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-200"
        >
          Clique aqui para acessar o checkout
        </a>
        .
      </>
    ),
  },
]

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-white/[0.06] py-24 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading
          id="faq-title"
          eyebrow="Dúvidas frequentes"
          title="Perguntas frequentes"
          description="O essencial para você decidir com tranquilidade."
        />

        <Reveal as="div" className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq-item group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-6 text-left text-[17px] font-medium tracking-tight text-neutral-100 transition-colors hover:text-white sm:text-lg">
                {f.q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors group-hover:border-white/25 group-hover:text-neutral-100">
                  <Plus className="faq-icon size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-xl pb-6 pr-10 text-[15px] leading-relaxed text-neutral-400">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
