import { z } from "zod"
import { BUSINESS } from "./config"

export const reservaSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(120, "El nombre es demasiado largo"),
  email: z.string().trim().toLowerCase().email("Email inválido").max(160),
  telefono: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d+]/g, ""))
    .pipe(
      z
        .string()
        .min(8, "Teléfono inválido")
        .max(20, "Teléfono inválido")
        .regex(/^\+?\d{8,15}$/, "Teléfono inválido"),
    ),
  tipoServicio: z.string().trim().optional(),
  servicio: z.string().trim().min(2).max(120),
  tipoTatuaje: z.string().trim().optional(),
  tamano: z.string().trim().optional(),
  zonaCuerpo: z.string().trim().optional(),
  descripcion: z.string().max(1000).optional().nullable(),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (YYYY-MM-DD)"),
  hora: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Hora inválida (HH:mm)"),
  duracion: z
    .number({ invalid_type_error: "Duración debe ser numérica" })
    .int("Duración entera en minutos")
    .min(BUSINESS.minDuration, `Mínimo ${BUSINESS.minDuration} minutos`)
    .max(BUSINESS.maxDuration, `Máximo ${BUSINESS.maxDuration} minutos`),
  notas: z.string().max(500).optional().nullable(),
})

export type ReservaInput = z.infer<typeof reservaSchema>

export const disponibilidadQuerySchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  duracion: z.coerce
    .number()
    .int()
    .min(BUSINESS.minDuration)
    .max(BUSINESS.maxDuration),
})
