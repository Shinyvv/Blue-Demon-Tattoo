export function TrabajosSection() {
  const trabajos = [
    "https://images.unsplash.com/photo-1598371839696-5c5cb0047271?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572573210742-1ee7cb347ec0?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621360841013-c76831f12560?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590246814883-5782782eeb52?q=80&w=400&auto=format&fit=crop",
  ]

  return (
    <section className="relative py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-serif text-4xl text-balance md:text-5xl text-secondary">
            Trabajos <span className="text-accent italic">Recientes</span>
          </h2>
          <p className="mt-4 text-secondary/70">
            Un vistazo a nuestro arte en la piel de nuestros clientes.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {trabajos.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden bg-white rounded-lg border border-secondary/10">
              <img 
                src={img} 
                alt={`Trabajo ${i + 1}`} 
                className="h-full w-full object-cover transition-transform hover:scale-105 duration-300" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
