import Link from "next/link"
import { Sparkles, PenTool, Search } from "lucide-react"

export function ServicesSection() {
  const serviciosTattoo = [
    {
      id: "personalizado",
      nombre: "Tatuaje Personalizado",
      descripcion: "Diseño único creado exclusivamente para ti basado en tus ideas.",
      icon: PenTool
    },
    {
      id: "tradicional",
      nombre: "Tatuaje Tradicional",
      descripcion: "Colores sólidos y líneas gruesas. Un clásico que nunca muere.",
      icon: PenTool
    },
    {
      id: "fine-line",
      nombre: "Fine Line",
      descripcion: "Detalles minimalistas y líneas muy finas para un resultado elegante.",
      icon: PenTool
    },
    {
      id: "blackwork",
      nombre: "Blackwork",
      descripcion: "Geometría, puntillismo y alto contraste solo con tinta negra.",
      icon: PenTool
    }
  ]

  const coberturas = [
    {
      id: "cover-up",
      nombre: "Cover-up (Cobertura)",
      descripcion: "Ocultamos tatuajes antiguos o cicatrices con un diseño nuevo (previa evaluación detallada).",
      icon: Search
    }
  ]

  const evaluaciones = [
    {
      id: "asesoria",
      nombre: "Asesoría de diseño",
      descripcion: "Nos reunimos para hablar de tu idea, ubicarla en el cuerpo y cotizar adecuadamente.",
      icon: Sparkles
    }
  ]

  return (
    <section id="servicios" className="relative py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Nuestros Servicios
          </p>
          <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl text-secondary">
            Tu cuerpo es el <span className="italic text-accent">lienzo</span>
          </h2>
          <p className="mt-4 text-secondary/70 text-pretty">
            Nos enfocamos en entregar un trabajo artístico y profesional. Todo trabajo requiere evaluación previa para un resultado óptimo.
          </p>
        </header>

        <div className="mt-16 space-y-16">
          <CategoryBlock title="Tatuajes" description="Estilos y diseños a tu medida." icon={PenTool} items={serviciosTattoo} />
          <CategoryBlock title="Coberturas" description="Renueva tu piel con un diseño mejor." icon={Search} items={coberturas} />
          <CategoryBlock title="Evaluación" description="El primer paso hacia tu nuevo tattoo." icon={Sparkles} items={evaluaciones} />
        </div>

        <p className="mt-16 text-center text-sm text-secondary/60">
          * Los precios no son fijos, todo valor exacto está sujeto a evaluación de diseño, tamaño y zona del cuerpo.
        </p>
      </div>
    </section>
  )
}

function CategoryBlock({ title, description, icon: Icon, items }: { title: string, description: string, icon: any, items: any[] }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-secondary/20 pb-4">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-secondary">{title}</h3>
            <p className="text-sm text-secondary/70">{description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const SIcon = s.icon
          return (
            <Link
              href={`/reservar?servicio=${s.id}`}
              key={s.id}
              className="group flex flex-col rounded-2xl border border-secondary/20 bg-white p-6 transition-all hover:-translate-y-1 hover:border-secondary/50 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <SIcon className="h-4 w-4" />
                </span>
                <span className="text-xs uppercase tracking-widest text-secondary/60">
                  Previa Eval.
                </span>
              </div>
              <h4 className="mt-5 font-serif text-2xl text-secondary">{s.nombre}</h4>
              <p className="mt-2 flex-1 text-sm text-secondary/70">
                {s.descripcion}
              </p>
              <div className="mt-6 flex items-end justify-between border-t border-secondary/20 pt-4">
                <span className="text-xs uppercase tracking-widest text-secondary/60">
                  Valor
                </span>
                <span className="font-serif text-xl text-accent">
                  Desde / A cotizar
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
