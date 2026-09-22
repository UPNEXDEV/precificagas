import { Cake, Coffee, Croissant, Candy, Pizza, Sandwich, Truck, UtensilsCrossed, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "./SectionHeading"

const audiences: { icon: LucideIcon; label: string; hint: string }[] = [
  { icon: Cake, label: "Confeitaria", hint: "Bolos, tortas e encomendas" },
  { icon: Pizza, label: "Pizzaria", hint: "Pizzas e massas" },
  { icon: Sandwich, label: "Lanchonete", hint: "Lanches e porções" },
  { icon: Croissant, label: "Salgados", hint: "Fritos, assados e festas" },
  { icon: Candy, label: "Doces", hint: "Brigadeiros e docinhos" },
  { icon: UtensilsCrossed, label: "Marmitas", hint: "Refeições do dia a dia" },
  { icon: Coffee, label: "Cafeteria", hint: "Cafés, bebidas e quitutes" },
  { icon: Truck, label: "Food truck", hint: "Cozinha sobre rodas" },
]

export function Audience() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="relative border-t border-white/[0.06] py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="para-quem-title"
            eyebrow="Para quem é"
            title="Para quem vive de comida, do forno ao balcão."
          />
          <Reveal className="max-w-sm text-[15px] leading-relaxed text-neutral-500 lg:pb-2">
            Restaurantes, pequenos negócios e quem vende doces, bolos e salgados por encomenda.
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:mt-16 lg:grid-cols-4">
          {audiences.map(({ icon: Icon, label, hint }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 50}
              className="group relative flex min-h-36 flex-col justify-between gap-6 bg-neutral-950 p-4 transition-colors duration-300 hover:bg-neutral-900 sm:min-h-44 sm:p-6"
            >
              <Icon
                className="size-6 text-neutral-500 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-neutral-100"
                aria-hidden="true"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-base font-medium tracking-tight text-neutral-100 sm:text-lg">{label}</h3>
                <p className="mt-1 text-[13px] leading-snug text-neutral-500">{hint}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
