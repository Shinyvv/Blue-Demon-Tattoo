import Image from "next/image"
import { ShieldCheck } from "lucide-react"
import { BRANDS } from "@/lib/services"

export function BrandsSection() {
  return (
    <section id="marcas" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Calidad profesional
            </p>
            <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl">
              Trabajamos con{" "}
              <span className="italic text-primary">productos profesionales</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-pretty">
              Solo usamos marcas reconocidas mundialmente por su calidad,
              cuidado y resultados duraderos. Cada producto pasa por la selección
              y experiencia de nuestro equipo.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Productos originales y libres de sulfatos en su mayoría
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BRANDS.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-col gap-1 rounded-xl border border-border bg-card/60 px-5 py-4"
                >
                  <span className="font-serif text-xl">{b.nombre}</span>
                  <span className="text-xs text-muted-foreground">{b.descripcion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border">
              <Image
                src="/images/treatment.jpg"
                alt="Productos profesionales para tratamiento capilar"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>

            {/* Tira de badges con nombres de marcas */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BRANDS.map((b) => (
                <div
                  key={b.id}
                  className="grid h-16 place-items-center rounded-xl border border-border bg-card/40 px-3 text-center"
                >
                  <span className="font-serif text-base tracking-wide">
                    {b.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
