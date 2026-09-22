import { CHECKOUT_URL, PRODUCT_NAME } from "@/lib/constants"
import { Logo } from "./LogoMark"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/[0.06] pb-28 pt-14 md:pb-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#topo" aria-label="Precifica — voltar ao topo" className="inline-block rounded-md">
            <Logo />
          </a>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">Precificação para gastronomia</p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            A compra, o pagamento e a entrega do produto são realizados pela plataforma Kiwify.
          </p>
        </div>

        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          <a href="#problema" className="text-neutral-400 transition-colors hover:text-neutral-100">O problema</a>
          <a href="#planilha" className="text-neutral-400 transition-colors hover:text-neutral-100">A planilha</a>
          <a href="#para-quem" className="text-neutral-400 transition-colors hover:text-neutral-100">Para quem é</a>
          <a href="#faq" className="text-neutral-400 transition-colors hover:text-neutral-100">Dúvidas</a>
          <a href={CHECKOUT_URL} className="col-span-2 font-medium text-neutral-100 transition-colors hover:text-white">
            Comprar na Kiwify →
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <p className="border-t border-white/[0.06] pt-6 text-[13px] text-neutral-600">
          © {year} {PRODUCT_NAME} para Gastronomia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
