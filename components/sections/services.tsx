import Link from "next/link"
import {
  SERVICE_CATEGORIES,
  getServicesByCategory,
  type ServiceCategoryId,
} from "@/lib/services"

const formatCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n)

export function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            Nuestros servicios
          </p>
          <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl">
            Belleza capilar con <span className="italic text-primary">propósito</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Cada servicio se adapta a tu cabello, tu estilo y tu rutina. Equipo
            especializado y productos profesionales para resultados consistentes.
          </p>
        </header>

        <div className="mt-16 space-y-16">
          {SERVICE_CATEGORIES.map((cat) => (
            <CategoryBlock key={cat.id} categoryId={cat.id} />
          ))}
        </div>

        <p className="mt-16 text-center text-sm text-muted-foreground">
          Los precios son referenciales (&ldquo;desde&rdquo;). El valor final depende del
          largo y tipo de cabello, y se confirma al momento de la atención.
        </p>
      </div>
    </section>
  )
}

function CategoryBlock({ categoryId }: { categoryId: ServiceCategoryId }) {
  const cat = SERVICE_CATEGORIES.find((c) => c.id === categoryId)
  if (!cat) return null
  const services = getServicesByCategory(categoryId)
  const Icon = cat.icon

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl">{cat.nombre}</h3>
            <p className="text-sm text-muted-foreground">{cat.descripcion}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const SIcon = s.icon
          return (
            <Link
              href={`/reservar?servicio=${s.id}`}
              key={s.id}
              className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <SIcon className="h-4 w-4" />
                </span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {s.duracion} min
                </span>
              </div>
              <h4 className="mt-5 font-serif text-2xl">{s.nombre}</h4>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {s.descripcion}
              </p>
              <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Desde
                </span>
                <span className="font-serif text-2xl text-primary">
                  {formatCLP(s.precioDesde)}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
