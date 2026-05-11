import Image from "next/image"

const ESTILOS = [
  {
    id: "tradicional",
    nombre: "Tradicional",
    desc: "Colores sólidos y líneas gruesas firmes.",
    img: "https://images.unsplash.com/photo-1598371839696-5c5cb0047271?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "blackwork",
    nombre: "Blackwork",
    desc: "Alto contraste solo con tinta negra.",
    img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fineline",
    nombre: "Fine Line",
    desc: "Elegancia minimalista y trazos finos.",
    img: "https://images.unsplash.com/photo-1621360841013-c76831f12560?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "lettering",
    nombre: "Lettering",
    desc: "Letras, frases y caligrafía a medida.",
    img: "https://images.unsplash.com/photo-1605333333333-2ccf9d146985?q=80&w=600&auto=format&fit=crop" // fallback
  }
]

export function EstilosSection() {
  return (
    <section className="relative py-24 bg-white border-y border-secondary/20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-serif text-4xl text-balance md:text-5xl text-secondary">
            Nuestros <span className="text-accent italic">Estilos</span>
          </h2>
          <p className="mt-4 text-secondary/70">
            Trabajamos distintos estilos para adaptarnos a tu idea.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ESTILOS.map((e) => (
            <div key={e.id} className="group relative overflow-hidden rounded-xl border border-secondary/20 bg-white h-80">
              <img src={e.img} alt={e.nombre} className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" />
              <div className="absolute inset-0 bg-linear-to-t from-white via-white/30 to-transparent" />
              <div className="absolute bottom-0 w-full p-6 text-left">
                <h3 className="font-serif text-2xl text-secondary">{e.nombre}</h3>
                <p className="mt-1 text-sm text-secondary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
