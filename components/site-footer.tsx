"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { BUSINESS, whatsappLink } from "@/lib/config"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-secondary/20 bg-white text-secondary/70 py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-4 md:px-6 md:gap-8">
        
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl uppercase tracking-widest text-secondary block">
              Blue <span className="text-accent">Demon</span>
            </span>
            <span className="text-xs uppercase tracking-widest text-secondary/60">Tattoo Studio</span>
          </Link>
          <p className="text-sm text-balance max-w-xs text-secondary/70">{BUSINESS.tagline}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Ubicación
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <a
                href={BUSINESS.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                {BUSINESS.address}
                <br />
                {BUSINESS.city}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a href={BUSINESS.phoneHref} className="hover:text-secondary transition-colors">
                {BUSINESS.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-secondary transition-colors">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Horario
          </h3>
          <ul className="space-y-2 text-sm text-secondary/60">
            <li className="flex justify-between">
              <span>Lunes a Sábado</span>
              <span>{BUSINESS.openHour}:00 - {BUSINESS.closeHour}:00</span>
            </li>
            <li className="flex justify-between mt-1 pt-1 border-t border-secondary/20">
              <span>Domingo</span>
              <span>Cerrado</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-secondary/20 px-4 pt-8 md:flex-row md:px-6">
        <p className="text-xs text-secondary/60">
          &copy; {currentYear} {BUSINESS.name}. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-secondary/60 hover:text-secondary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-secondary/60 hover:text-secondary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
