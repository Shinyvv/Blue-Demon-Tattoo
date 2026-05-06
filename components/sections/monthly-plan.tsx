import Link from "next/link"
import Image from "next/image"
import { Check, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MONTHLY_PLAN } from "@/lib/services"

const formatCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n)

export function MonthlyPlanSection() {
  return (
    <section id="plan" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            Plan mensual
          </p>
          <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl">
            La experiencia <span className="text-primary italic">Fortune</span> todo el mes
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Un solo pago, tres visitas premium. Servicios personalizados pensados para
            quienes valoran el detalle y la consistencia.
          </p>
        </header>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Tarjeta del plan */}
          <article className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-card to-card/40 p-8 md:p-10">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="border-primary/40 bg-primary/10 text-primary uppercase tracking-widest text-[10px]"
                >
                  <Crown className="mr-1 h-3 w-3" />
                  Membresía premium
                </Badge>
                <span className="text-xs text-muted-foreground">Fortune Club</span>
              </div>

              <h3 className="mt-6 font-serif text-3xl md:text-4xl">
                {MONTHLY_PLAN.nombre}
              </h3>
              <p className="mt-2 text-muted-foreground">
                Servicios personalizados con todo lo que necesitas para verte y sentirte
                impecable.
              </p>

              <div className="mt-8 flex items-end gap-3">
                <span className="font-serif text-6xl leading-none text-primary md:text-7xl">
                  {formatCLP(MONTHLY_PLAN.precio)}
                </span>
                <span className="pb-2 text-sm text-muted-foreground">/ mes</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Válido para{" "}
                <span className="text-foreground font-medium">
                  {MONTHLY_PLAN.visitas} visitas al mes
                </span>
                .
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MONTHLY_PLAN.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href={`/reservar?servicio=${MONTHLY_PLAN.id}`}>
                    Reservar plan mensual
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-border">
                  <Link href="#contacto">Consultar</Link>
                </Button>
              </div>
            </div>
          </article>

          {/* Imagen complementaria */}
          <aside className="relative overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/barber-cutting.jpg"
              alt="Barbero atendiendo a un cliente"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-widest">Sin sorpresas</span>
              </div>
              <p className="mt-2 max-w-sm font-serif text-2xl leading-snug">
                Una rutina premium, al precio de una sola visita por sesión.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
