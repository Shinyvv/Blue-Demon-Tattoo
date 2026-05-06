import type { Metadata, Viewport } from "next"
import { DM_Sans, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { BUSINESS } from "@/lib/config"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-custom",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif-custom",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://newhairsalon.cl"),
  title: {
    default: `${BUSINESS.name} — Salón de Belleza en Talagante`,
    template: `%s · ${BUSINESS.name}`,
  },
  description:
    "New Hair Salón en Talagante. Especialistas en colorimetría, balayage, tratamientos capilares, alisados y estética. Reserva online en minutos.",
  keywords: [
    "salón de belleza",
    "Talagante",
    "New Hair Salón",
    "balayage",
    "color de cabello",
    "keratina",
    "tratamientos capilares",
    "maquillaje profesional",
    "reserva online",
  ],
  authors: [{ name: BUSINESS.name }],
  openGraph: {
    title: `${BUSINESS.name} — Salón de Belleza en Talagante`,
    description:
      "Color, estilo y cuidado capilar profesional. Reserva tu hora online.",
    type: "website",
    locale: "es_CL",
    siteName: BUSINESS.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — Salón de Belleza en Talagante`,
    description: "Reserva online tu próxima visita.",
  },
}

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        {children}
        <Toaster
          theme="light"
          richColors
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "bg-card border-border text-foreground",
            },
          }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
