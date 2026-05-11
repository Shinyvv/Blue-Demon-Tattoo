import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2000&auto=format&fit=crop"
          alt="Tattoo Studio Background"
          className="h-full w-full object-cover opacity-40 sepia-[.2]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent z-20" />
      </div>

      <div className="relative z-30 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-secondary sm:text-6xl md:text-7xl lg:text-8xl">
          Convierte tu idea en <span className="text-accent block mt-2">arte permanente</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary/70 md:text-xl mb-10">
          Tatuajes personalizados, artistas profesionales y estilos variados. Cada sesión requiere evaluación previa para garantizar la mejor calidad y diseño.
        </p>
        <Button asChild size="lg" className="rounded-full bg-secondary px-8 py-6 text-lg font-medium text-white hover:bg-secondary/90 border-0">
          <Link href="/reservar">Reservar evaluación</Link>
        </Button>
      </div>
    </section>
  )
}