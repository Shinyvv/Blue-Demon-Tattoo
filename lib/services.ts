import {
  Scissors,
  Palette,
  Sparkles,
  Wand2,
  Heart,
  Brush,
  Eye,
  Flower2,
  Droplet,
  type LucideIcon,
} from "lucide-react"

/**
 * Categorías visibles del catálogo. Se usan en la landing y en el filtro
 * del formulario de reservas.
 */
export type ServiceCategoryId =
  | "cortes"
  | "color"
  | "tratamientos"
  | "alisados"
  | "otros"

export interface ServiceCategory {
  id: ServiceCategoryId
  nombre: string
  descripcion: string
  icon: LucideIcon
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "cortes",
    nombre: "Cortes",
    descripcion: "Cortes personalizados para dama, varón y niños.",
    icon: Scissors,
  },
  {
    id: "color",
    nombre: "Color",
    descripcion: "Balayage, mechas, visos y técnicas avanzadas de colorimetría.",
    icon: Palette,
  },
  {
    id: "tratamientos",
    nombre: "Tratamientos",
    descripcion: "Hidratación profunda, botox capilar y reparación intensiva.",
    icon: Droplet,
  },
  {
    id: "alisados",
    nombre: "Alisados",
    descripcion: "Keratina, bioplastía y técnicas anti-frizz de larga duración.",
    icon: Wand2,
  },
  {
    id: "otros",
    nombre: "Estética",
    descripcion: "Maquillaje profesional, diseño de cejas y depilación.",
    icon: Flower2,
  },
]

export interface Service {
  id: string
  nombre: string
  descripcion: string
  categoria: ServiceCategoryId
  duracion: number // minutos (sugerida y mínima)
  precioDesde: number // CLP — base, puede variar según largo del cabello
  icon: LucideIcon
}

/**
 * Catálogo de servicios. Los precios son "desde" (referenciales);
 * el valor final se confirma en el salón según el tipo de cabello.
 */
export const SERVICES: Service[] = [
  // Cortes
  {
    id: "corte-dama",
    nombre: "Corte Dama",
    descripcion: "Corte personalizado, lavado y peinado final.",
    categoria: "cortes",
    duracion: 45,
    precioDesde: 15000,
    icon: Scissors,
  },
  {
    id: "corte-varon",
    nombre: "Corte Varón",
    descripcion: "Corte preciso a tijera o máquina, lavado incluido.",
    categoria: "cortes",
    duracion: 30,
    precioDesde: 10000,
    icon: Scissors,
  },
  {
    id: "corte-ninos",
    nombre: "Corte Niños",
    descripcion: "Corte cómodo y paciente para los más pequeños.",
    categoria: "cortes",
    duracion: 30,
    precioDesde: 9000,
    icon: Scissors,
  },

  // Color
  {
    id: "balayage",
    nombre: "Balayage",
    descripcion: "Iluminación natural pintada a mano para un acabado degradado.",
    categoria: "color",
    duracion: 180,
    precioDesde: 65000,
    icon: Palette,
  },
  {
    id: "visos",
    nombre: "Visos",
    descripcion: "Reflejos sutiles que aportan luz y dimensión al cabello.",
    categoria: "color",
    duracion: 150,
    precioDesde: 55000,
    icon: Sparkles,
  },
  {
    id: "mechas",
    nombre: "Mechas",
    descripcion: "Mechas clásicas con técnica de papelillo o gorro.",
    categoria: "color",
    duracion: 150,
    precioDesde: 50000,
    icon: Sparkles,
  },
  {
    id: "color-global",
    nombre: "Color Global",
    descripcion: "Coloración completa con productos profesionales premium.",
    categoria: "color",
    duracion: 120,
    precioDesde: 35000,
    icon: Palette,
  },
  {
    id: "baby-lights",
    nombre: "Baby Lights",
    descripcion: "Iluminaciones finísimas y sutiles, efecto luz natural.",
    categoria: "color",
    duracion: 180,
    precioDesde: 70000,
    icon: Sparkles,
  },

  // Tratamientos
  {
    id: "botox-capilar",
    nombre: "Botox Capilar",
    descripcion: "Reconstrucción profunda que devuelve brillo y suavidad.",
    categoria: "tratamientos",
    duracion: 90,
    precioDesde: 30000,
    icon: Droplet,
  },
  {
    id: "hidratacion",
    nombre: "Hidratación Profunda",
    descripcion: "Tratamiento intensivo de nutrición y reparación.",
    categoria: "tratamientos",
    duracion: 60,
    precioDesde: 18000,
    icon: Heart,
  },
  {
    id: "anti-frizz",
    nombre: "Anti-Frizz",
    descripcion: "Tratamiento que controla el frizz y disciplina el cabello.",
    categoria: "tratamientos",
    duracion: 75,
    precioDesde: 25000,
    icon: Sparkles,
  },

  // Alisados
  {
    id: "keratina",
    nombre: "Keratina",
    descripcion: "Alisado de keratina con duración prolongada y brillo natural.",
    categoria: "alisados",
    duracion: 180,
    precioDesde: 55000,
    icon: Wand2,
  },
  {
    id: "bioplastia",
    nombre: "Bioplastía",
    descripcion: "Reconstrucción y alisado con activos vegetales premium.",
    categoria: "alisados",
    duracion: 180,
    precioDesde: 60000,
    icon: Wand2,
  },
  {
    id: "keratina-coffee",
    nombre: "Keratina Coffee",
    descripcion: "Alisado con extracto de café que nutre y suaviza.",
    categoria: "alisados",
    duracion: 180,
    precioDesde: 65000,
    icon: Wand2,
  },

  // Otros
  {
    id: "maquillaje",
    nombre: "Maquillaje Profesional",
    descripcion: "Maquillaje para eventos, sociales o sesiones fotográficas.",
    categoria: "otros",
    duracion: 60,
    precioDesde: 25000,
    icon: Brush,
  },
  {
    id: "cejas",
    nombre: "Diseño de Cejas",
    descripcion: "Perfilado profesional con cera o pinza según el caso.",
    categoria: "otros",
    duracion: 30,
    precioDesde: 8000,
    icon: Eye,
  },
  {
    id: "depilacion",
    nombre: "Depilación",
    descripcion: "Depilación con cera tibia, técnica higiénica y precisa.",
    categoria: "otros",
    duracion: 45,
    precioDesde: 12000,
    icon: Flower2,
  },
]

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

export function getServicesByCategory(cat: ServiceCategoryId): Service[] {
  return SERVICES.filter((s) => s.categoria === cat)
}

export function getCategoryById(id: ServiceCategoryId): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.id === id)
}

/**
 * Marcas con las que trabaja el salón.
 */
export interface Brand {
  id: string
  nombre: string
  descripcion: string
}

export const BRANDS: Brand[] = [
  {
    id: "loreal",
    nombre: "L'Oréal",
    descripcion: "Color profesional con tecnología de vanguardia.",
  },
  {
    id: "wella",
    nombre: "Wella",
    descripcion: "Referente mundial en colorimetría y cuidado capilar.",
  },
  {
    id: "schwarzkopf",
    nombre: "Schwarzkopf",
    descripcion: "Innovación alemana en coloración y tratamientos.",
  },
  {
    id: "alfaparf",
    nombre: "Alfaparf",
    descripcion: "Excelencia italiana en técnica y resultado.",
  },
]
