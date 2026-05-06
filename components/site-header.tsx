"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS, whatsappLink } from "@/lib/config"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#marcas", label: "Marcas" },
  { href: "/#contacto", label: "Contacto" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary font-serif text-lg italic">
            N
          </span>
          <span className="font-serif text-xl tracking-wide">
            New Hair <span className="text-primary italic">Salón</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            aria-label="Escríbenos por WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/reservar">Reservar hora</Link>
          </Button>
        </div>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card/60"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Button
              asChild
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/reservar" onClick={() => setOpen(false)}>
                Reservar hora
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
