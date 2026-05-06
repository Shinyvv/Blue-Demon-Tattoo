/**
 * Configuración central del negocio.
 * Cambiar aquí afecta a toda la app (landing, reservas, API).
 */

export const BUSINESS = {
  name: "New Hair Salón",
  shortName: "New Hair",
  tagline: "Color, estilo y cuidado capilar profesional.",
  phone: "+56 9 8821 5996",
  phoneHref: "tel:+56988215996",
  whatsappHref: "https://wa.me/56988215996",
  whatsappMessage:
    "Hola New Hair Salón, me gustaría reservar una hora. ¿Tienen disponibilidad?",
  email: "contacto@newhairsalon.cl",
  address: "Boulevard Talagante - Enrique Alcalde 1080, Local 90",
  city: "Talagante, Región Metropolitana",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Enrique+Alcalde+1080,+Talagante&output=embed",
  mapsLink: "https://maps.google.com/?q=Enrique+Alcalde+1080,+Talagante",
  // Lunes (1) a Sábado (6)
  openDays: [1, 2, 3, 4, 5, 6] as const,
  openHour: 10,
  closeHour: 19,
  // Granularidad mínima del calendario en minutos
  slotStepMinutes: 15,
  // Duraciones permitidas (entre 15 minutos y 4 horas — color y alisados pueden ser largos)
  minDuration: 15,
  maxDuration: 240,
} as const

export type WeekDay = (typeof BUSINESS.openDays)[number]

/**
 * Helper para construir el link de WhatsApp con un mensaje pre-llenado.
 */
export function whatsappLink(message?: string): string {
  const base = BUSINESS.whatsappHref
  const text = encodeURIComponent(message ?? BUSINESS.whatsappMessage)
  return `${base}?text=${text}`
}
