import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReservationForm } from "@/components/reservas/reservation-form"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Reservar tu hora",
  description:
    "Reserva online en Fortune Barbershop. Cortes, barba, cejas, masajes y plan mensual.",
}

export default function ReservarPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Reserva tu hora
            </p>
            <h1 className="mt-3 font-serif text-4xl text-balance md:text-5xl">
              Agenda tu próxima visita
            </h1>
            <p className="mt-4 text-muted-foreground text-pretty">
              Elige servicio, fecha y horario. Te confirmamos al instante.
            </p>
          </header>

          <div className="mt-12">
            <Suspense fallback={<FormSkeleton />}>
              <ReservationForm />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

function FormSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Skeleton className="h-[420px] rounded-xl" />
      <Skeleton className="h-[420px] rounded-xl" />
    </div>
  )
}
