import Link from "next/link"
import { BUSINESS, whatsappLink } from "@/lib/config"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary font-serif italic">
              N
            </span>
            <span className="font-serif text-xl">
              New Hair <span className="text-primary italic">Salón</span>
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {BUSINESS.tagline} Salón profesional en {BUSINESS.city}.
          </p>
        </div>

        <div className="text-sm">
          <p className="text-xs uppercase tracking-widest text-primary">Contacto</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>{BUSINESS.address}</li>
            <li>
              <a className="hover:text-foreground" href={BUSINESS.phoneHref}>
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground"
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              Lunes a Sábado · {BUSINESS.openHour}:00 — {BUSINESS.closeHour}:00
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-xs uppercase tracking-widest text-primary">Navegación</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" href="/#servicios">
                Servicios
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/#marcas">
                Marcas
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/#contacto">
                Contacto
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/reservar">
                Reservar hora
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© {year} {BUSINESS.name}. Todos los derechos reservados.</p>
          <p>Hecho con cuidado en Talagante, Chile.</p>
        </div>
      </div>
    </footer>
  )
}
