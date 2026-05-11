"use client"

import { Mail, MapPin, Phone, Instagram, Facebook, Clock } from "lucide-react"
import { BUSINESS, whatsappLink } from "@/lib/config"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Hablemos de tu idea
          </p>
          <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl text-secondary">
            Contacto & <span className="italic text-accent">Ubicación</span>
          </h2>
          <p className="mt-4 text-secondary/70 text-pretty">
            Cotiza tu próximo tatuaje, resuelve dudas o agenda tu evaluación. Estaremos felices de asesorarte.
          </p>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-secondary">Visítanos</h3>
                <p className="mt-2 text-secondary/70">
                  {BUSINESS.address}
                  <br />
                  {BUSINESS.city}
                </p>
                <a
                  href={BUSINESS.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                >
                  Ver en Google Maps &rarr;
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-secondary">Horario</h3>
                <p className="mt-2 text-secondary/70">
                  Lunes a Sábado <br />
                  {BUSINESS.openHour}:00 - {BUSINESS.closeHour}:00 hrs
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-secondary">Teléfono & WhatsApp</h3>
                <p className="mt-2 text-secondary/70">
                  {BUSINESS.phone}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    Escríbenos por WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-4 mt-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-secondary/70 hover:text-secondary">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-secondary/70 hover:text-secondary">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-secondary/20 bg-white shadow-xl lg:h-125">
            <iframe
              title="Mapa de ubicación"
              src={BUSINESS.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale sepia-[0.3]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
