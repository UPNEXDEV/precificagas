import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { HowItHelps } from "@/components/landing/HowItHelps"
import { ProductPreview } from "@/components/landing/ProductPreview"
import { Audience } from "@/components/landing/Audience"
import { Benefits } from "@/components/landing/Benefits"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA"

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Problem />
        <HowItHelps />
        <ProductPreview />
        <Audience />
        <Benefits />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
