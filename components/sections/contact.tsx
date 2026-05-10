"use client"

import { Mail, MapPin, Phone, Instagram, Facebook, Clock } from "lucide-react"
import { BUSINESS, whatsappLink } from "@/lib/config"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-red-600">
            Hablemos de tu idea
          </p>
          <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl text-white">
            Contacto & <span className="italic text-red-600">Ubicación</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-pretty">
            Cotiza tu próximo tatuaje, resuelve dudas o agenda tu evaluación. Estaremos felices de asesorarte.
          </p>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-600/10 text-red-500">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white">Visítanos</h3>
                <p className="mt-2 text-zinc-400">
                  {BUSINESS.address}
                  <br />
                  {BUSINESS.city}
                </p>
                <a
                  href={BUSINESS.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-red-500 hover:text-red-400 hover:underline"
                >
                  Ver en Google Maps &rarr;
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-600/10 text-red-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white">Horario</h3>
                <p className="mt-2 text-zinc-400">
                  Lunes a Sábado <br />
                  {BUSINESS.openHour}:00 - {BUSINESS.closeHour}:00 hrs
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-600/10 text-red-500">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white">Teléfono & WhatsApp</h3>
                <p className="mt-2 text-zinc-400">
                  {BUSINESS.phone}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    Escríbenos por WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-600/10 text-red-500">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-4 mt-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl lg:h-[500px]">
            <iframe
              title="Mapa de ubicaciÃ³n"
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
