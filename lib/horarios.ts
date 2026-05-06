import { addMinutes, format, isBefore, set, startOfDay } from "date-fns"
import { BUSINESS } from "./config"

/**
 * Combina una fecha (Y-M-D) con una hora "HH:mm" en un Date local.
 */
export function combinarFechaHora(fecha: Date, hora: string): Date {
  const [h, m] = hora.split(":").map(Number)
  return set(startOfDay(fecha), { hours: h, minutes: m, seconds: 0, milliseconds: 0 })
}

/** Devuelve "HH:mm" desde un Date. */
export function formatearHora(date: Date): string {
  return format(date, "HH:mm")
}

/**
 * Indica si la barbería trabaja ese día (lunes a sábado).
 */
export function esDiaLaboral(date: Date): boolean {
  const dow = date.getDay() // 0=domingo ... 6=sabado
  return (BUSINESS.openDays as readonly number[]).includes(dow)
}

/** Una "reserva" simplificada para cálculo de disponibilidad. */
export interface RangoOcupado {
  inicio: Date
  fin: Date
}

/**
 * Genera todos los slots posibles del día respetando:
 * - horario de apertura/cierre
 * - duración del servicio (debe terminar antes de cerrar)
 * - solapamientos con reservas existentes
 * - si la fecha es hoy, no permite slots ya pasados
 */
export function generarSlotsDisponibles(params: {
  fecha: Date
  duracion: number
  ocupados: RangoOcupado[]
  ahora?: Date
}): string[] {
  const { fecha, duracion, ocupados, ahora = new Date() } = params

  if (!esDiaLaboral(fecha)) return []
  if (duracion < BUSINESS.minDuration || duracion > BUSINESS.maxDuration) return []

  const apertura = set(startOfDay(fecha), { hours: BUSINESS.openHour })
  const cierre = set(startOfDay(fecha), { hours: BUSINESS.closeHour })

  const slots: string[] = []
  let cursor = apertura

  while (true) {
    const fin = addMinutes(cursor, duracion)
    if (isBefore(cierre, fin) && cierre.getTime() !== fin.getTime()) break

    const yaPaso = isBefore(cursor, ahora)
    const choca = ocupados.some((r) => seSolapan(cursor, fin, r.inicio, r.fin))

    if (!yaPaso && !choca) {
      slots.push(formatearHora(cursor))
    }

    cursor = addMinutes(cursor, BUSINESS.slotStepMinutes)
    if (!isBefore(cursor, cierre)) break
  }

  return slots
}

/** [aIni, aFin) intersecta [bIni, bFin) ? */
export function seSolapan(aIni: Date, aFin: Date, bIni: Date, bFin: Date): boolean {
  return aIni < bFin && bIni < aFin
}

/**
 * Opciones de duración mostradas en el formulario (10 min a 3 h).
 */
export const OPCIONES_DURACION: { value: number; label: string }[] = [
  { value: 10, label: "10 minutos" },
  { value: 15, label: "15 minutos" },
  { value: 20, label: "20 minutos" },
  { value: 30, label: "30 minutos" },
  { value: 45, label: "45 minutos" },
  { value: 60, label: "1 hora" },
  { value: 75, label: "1 h 15 min" },
  { value: 90, label: "1 h 30 min" },
  { value: 120, label: "2 horas" },
  { value: 150, label: "2 h 30 min" },
  { value: 180, label: "3 horas" },
]
