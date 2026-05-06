import Link from "next/link"
import { Clock, MapPin, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS, whatsappLink } from "@/lib/config"

export function ContactSection() {
  return (
    <section id="contacto" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Visítanos</p>
          <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl">
            Te esperamos en <span className="italic text-primary">Talagante</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Reserva online o escríbenos directamente por WhatsApp. Atendemos
            de lunes a sábado.
          </p>
        </header>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <InfoRow
              icon={<MapPin className="h-5 w-5" />}
              title="Dirección"
              text={BUSINESS.address}
              subtext={BUSINESS.city}
              actionHref={BUSINESS.mapsLink}
              actionLabel="Cómo llegar"
            />
            <InfoRow
              icon={<Phone className="h-5 w-5" />}
              title="Teléfono"
              text={BUSINESS.phone}
              actionHref={BUSINESS.phoneHref}
              actionLabel="Llamar"
            />
            <InfoRow
              icon={<MessageCircle className="h-5 w-5" />}
              title="WhatsApp"
              text="Escríbenos directamente"
              subtext="Respuesta rápida en horario de atención"
              actionHref={whatsappLink()}
              actionLabel="Abrir chat"
              highlight
            />
            <InfoRow
              icon={<Clock className="h-5 w-5" />}
              title="Horario"
              text={`Lunes a Sábado · ${BUSINESS.openHour}:00 a ${BUSINESS.closeHour}:00`}
              subtext="Domingos cerrado"
            />

            <div className="mt-2 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/reservar">Reservar online</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-1 border-border bg-card hover:bg-card/80"
              >
                <a href={whatsappLink()} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Mapa de ${BUSINESS.name}`}
              src={BUSINESS.mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[460px] w-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({
  icon,
  title,
  text,
  subtext,
  actionHref,
  actionLabel,
  highlight,
}: {
  icon: React.ReactNode
  title: string
  text: string
  subtext?: string
  actionHref?: string
  actionLabel?: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border bg-card/60 p-5 ${
        highlight ? "border-primary/40" : "border-border"
      }`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
          highlight
            ? "bg-primary text-primary-foreground"
            : "border border-primary/30 bg-primary/10 text-primary"
        }`}
      >
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
        <p className="mt-1 text-foreground">{text}</p>
        {subtext && <p className="mt-0.5 text-xs text-muted-foreground">{subtext}</p>}
      </div>
      {actionHref && actionLabel && (
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-border bg-background"
        >
          <a href={actionHref} target="_blank" rel="noreferrer">
            {actionLabel}
          </a>
        </Button>
      )}
    </div>
  )
}
