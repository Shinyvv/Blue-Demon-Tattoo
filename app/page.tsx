import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { EstilosSection } from "@/components/sections/estilos"
import { TrabajosSection } from "@/components/sections/trabajos"
import { ContactSection } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white text-secondary selection:bg-accent/30">
        <Hero />
        <ServicesSection />
        <EstilosSection />
        <TrabajosSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
