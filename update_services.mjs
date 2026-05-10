
import fs from "fs/promises"

async function run() {
  const content = `import { PenTool, Target, Layers } from "lucide-react"

export type ServiceCategoryId = "tatuajes" | "coberturas"

export interface ServiceCategory {
  id: ServiceCategoryId
  nombre: string
  descripcion: string
  icon: any
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "tatuajes",
    nombre: "Tatuajes",
    descripcion: "Evaluación para nuevos proyectos de tatuaje.",
    icon: PenTool,
  },
  {
    id: "coberturas",
    nombre: "Coberturas (Cover-up)",
    descripcion: "Evaluación para tapar o mejorar tatuajes antiguos.",
    icon: Layers,
  },
]

export interface Service {
  id: string
  nombre: string
  descripcion: string
  categoria: ServiceCategoryId
  duracion: number 
  precioDesde: number 
  icon: any
}

export const SERVICES: Service[] = [
  {
    id: "tradicional",
    nombre: "Tatuaje Tradicional",
    descripcion: "Evaluación para tatuaje tradicional (americano/neo).",
    categoria: "tatuajes",
    duracion: 30,
    precioDesde: 0,
    icon: PenTool,
  },
  {
    id: "blackwork",
    nombre: "Blackwork",
    descripcion: "Evaluación para proyector blackwork.",
    categoria: "tatuajes",
    duracion: 30,
    precioDesde: 0,
    icon: PenTool,
  },
  {
    id: "fine-line",
    nombre: "Fine Line",
    descripcion: "Evaluación para tatuajes de línea fina.",
    categoria: "tatuajes",
    duracion: 30,
    precioDesde: 0,
    icon: PenTool,
  },
  {
    id: "personalizado",
    nombre: "Diseño Personalizado",
    descripcion: "Trae tu idea y la adaptamos a un diseño único.",
    categoria: "tatuajes",
    duracion: 30,
    precioDesde: 0,
    icon: PenTool,
  },
  {
    id: "cover-up",
    nombre: "Cover-up / Arreglo",
    descripcion: "Evaluación para coberturas o arreglos, analizamos la viabilidad.",
    categoria: "coberturas",
    duracion: 30,
    precioDesde: 0,
    icon: Layers,
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
`
  await fs.writeFile("lib/services.ts", content)
  console.log("updated lib/services")
}
run();

