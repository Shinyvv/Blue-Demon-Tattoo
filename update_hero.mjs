
import fs from "fs/promises"
async function run() {
  const heroContent = `import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2000&auto=format&fit=crop"
          alt="Tattoo Studio Background"
          className="h-full w-full object-cover opacity-50 sepia-[.3] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-20" />
      </div>

      <div className="relative z-30 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Convierte tu idea en <span className="text-red-600 block mt-2">arte permanente</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl mb-10">
          Tatuajes personalizados, artistas profesionales y estilos variados. Cada sesión requiere evaluación previa para garantizar la mejor calidad y diseño.
        </p>
        <Button asChild size="lg" className="rounded-full bg-red-600 px-8 py-6 text-lg font-medium text-white hover:bg-red-700">
          <Link href="/reservar">Reservar evaluación</Link>
        </Button>
      </div>
    </section>
  )
}
`
  await fs.writeFile("components/sections/hero.tsx", heroContent)

  const serviciosContent = `import Link from "next/link"
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

  const eval = [
    {
      id: "asesoria",
      nombre: "Asesoría de diseño",
      descripcion: "Nos reunimos para hablar de tu idea, ubicarla en el cuerpo y cotizar adecuadamente.",
      icon: Sparkles
    }
  ]

  return (
    <section id="servicios" className="relative py-24 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-red-600">
            Nuestros Servicios
          </p>
          <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl text-white">
            Tu cuerpo es el <span className="italic text-red-600">lienzo</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-pretty">
            Nos enfocamos en entregar un trabajo artístico y profesional. Todo trabajo requiere evaluación previa para un resultado óptimo.
          </p>
        </header>

        <div className="mt-16 space-y-16">
          <CategoryBlock title="Tatuajes" description="Estilos y diseños a tu medida." icon={PenTool} items={serviciosTattoo} />
          <CategoryBlock title="Coberturas" description="Renueva tu piel con un diseño mejor." icon={Search} items={coberturas} />
          <CategoryBlock title="Evaluación" description="El primer paso hacia tu nuevo tattoo." icon={Sparkles} items={eval} />
        </div>

        <p className="mt-16 text-center text-sm text-zinc-500">
          * Los precios no son fijos, todo valor exacto está sujeto a evaluación de diseño, tamaño y zona del cuerpo.
        </p>
      </div>
    </section>
  )
}

function CategoryBlock({ title, description, icon: Icon, items }: { title: string, description: string, icon: any, items: any[] }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-red-600/30 bg-red-600/10 text-red-600">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-white">{title}</h3>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const SIcon = s.icon
          return (
            <Link
              href={\`/reservar?servicio=\${s.id}\`}
              key={s.id}
              className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-1 hover:border-red-600/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-red-600/10 text-red-600">
                  <SIcon className="h-4 w-4" />
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  Previa Eval.
                </span>
              </div>
              <h4 className="mt-5 font-serif text-2xl text-white">{s.nombre}</h4>
              <p className="mt-2 flex-1 text-sm text-zinc-400">
                {s.descripcion}
              </p>
              <div className="mt-6 flex items-end justify-between border-t border-zinc-800 pt-4">
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  Valor
                </span>
                <span className="font-serif text-xl text-red-500">
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
`
  await fs.writeFile("components/sections/services.tsx", serviciosContent)

  console.log("Updated Hero and Services.")
}
run();

