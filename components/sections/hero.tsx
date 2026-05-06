import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS, whatsappLink } from "@/lib/config"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto grid min-h-[88vh] max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-28 pb-16 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Columna texto */}
        <div className="relative">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3 w-3" />
            Salón profesional en Talagante
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            Transforma tu cabello con expertos en{" "}
            <span className="italic text-primary">color y estilo</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty md:text-xl">
            Colorimetría avanzada, tratamientos capilares y atención personalizada
            con productos profesionales L&apos;Oréal, Wella, Schwarzkopf y Alfaparf.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/reservar">
                Reservar hora
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border bg-background hover:bg-card"
            >
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                Escribir por WhatsApp
              </a>
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            <Stat
              icon={<Clock className="h-4 w-4" />}
              label="Horario"
              value={`Lun a Sáb · ${BUSINESS.openHour}:00–${BUSINESS.closeHour}:00`}
            />
            <Stat
              icon={<MapPin className="h-4 w-4" />}
              label="Ubicación"
              value="Boulevard Talagante"
            />
            <Stat
              icon={<Sparkles className="h-4 w-4 text-primary" />}
              label="Productos"
              value="Profesionales premium"
            />
          </dl>
        </div>

        {/* Columna imagen */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-card lg:aspect-[3/4]">
          <Image
            src="/images/hero-salon.jpg"
            alt="Interior elegante de New Hair Salón en Talagante"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/60 bg-background/80 p-4 backdrop-blur-md">
            <p className="font-serif text-lg italic leading-snug text-foreground">
              &ldquo;Cada visita es un cuidado personalizado para ti.&rdquo;
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-primary">
              New Hair Salón
            </p>
          </div>
        </div>
      </div>

      {/* Decoración sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-soft-grain opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl"
      />
    </section>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="font-serif text-lg">{value}</dd>
    </div>
  )
}
