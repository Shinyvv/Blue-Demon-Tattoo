import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReservationForm } from "@/components/reservas/reservation-form"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Agendar evaluación",
  description: "Agenda tu evaluación online para tu próximo tatuaje con Blue Demon Tattoo."
}

export default function ReservarPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-28 pb-24 bg-zinc-950 min-h-screen text-zinc-50">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-red-600">
              Solicitud de Evaluación
            </p>
            <h1 className="mt-3 font-serif text-4xl text-balance md:text-5xl text-white">
              Cuéntanos tu <span className="italic text-red-600">idea</span>
            </h1>
            <p className="mt-4 text-zinc-400 text-pretty">
              Todo tatuaje requiere una evaluación previa para definir diseño, tiempo y valor final. 
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
      <Skeleton className="h-[420px] rounded-xl bg-zinc-900" />
      <Skeleton className="h-[420px] rounded-xl bg-zinc-900" />
    </div>
  )
}
