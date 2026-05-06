import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { BrandsSection } from "@/components/sections/brands"
import { ContactSection } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ServicesSection />
        <BrandsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
