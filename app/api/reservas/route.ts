import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { reservaSchema } from "@/lib/validations"
import { combinarFechaHora, esDiaLaboral } from "@/lib/horarios"
import { BUSINESS } from "@/lib/config"
import { addMinutes, isBefore } from "date-fns"

export const runtime = "nodejs"

/**
 * POST /api/reservas
 * Crea una reserva validando datos, horario laboral y solapamientos.
 */
export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 })
  }

  const parsed = reservaSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Datos inválidos",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const data = parsed.data
  const fechaBase = new Date(`${data.fecha}T00:00:00`)
  const inicio = combinarFechaHora(fechaBase, data.hora)
  const fin = addMinutes(inicio, data.duracion)

  // Día laboral
  if (!esDiaLaboral(fechaBase)) {
    return NextResponse.json(
      { ok: false, error: "La barbería no atiende ese día (lunes a sábado)." },
      { status: 409 },
    )
  }

  // Horario válido (no antes de apertura ni después del cierre)
  const apertura = new Date(fechaBase)
  apertura.setHours(BUSINESS.openHour, 0, 0, 0)
  const cierre = new Date(fechaBase)
  cierre.setHours(BUSINESS.closeHour, 0, 0, 0)

  if (isBefore(inicio, apertura) || fin.getTime() > cierre.getTime()) {
    return NextResponse.json(
      {
        ok: false,
        error: `La reserva debe estar entre ${BUSINESS.openHour}:00 y ${BUSINESS.closeHour}:00.`,
      },
      { status: 409 },
    )
  }

  // No permitir fechas/horas pasadas
  if (isBefore(inicio, new Date())) {
    return NextResponse.json(
      { ok: false, error: "No es posible reservar en el pasado." },
      { status: 409 },
    )
  }

  try {
    // Verificar solapamiento: cualquier reserva que cruce con [inicio, fin)
    const conflicto = await prisma.reserva.findFirst({
      where: {
        estado: { in: ["PENDIENTE", "CONFIRMADA"] },
        AND: [{ inicioAt: { lt: fin } }, { finAt: { gt: inicio } }],
      },
      select: { id: true, inicioAt: true, finAt: true },
    })

    if (conflicto) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Ese horario ya no está disponible. Por favor escoge otro horario o duración.",
        },
        { status: 409 },
      )
    }

    const creada = await prisma.reserva.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        servicio: data.servicio,
        fecha: fechaBase,
        hora: data.hora,
        duracion: data.duracion,
        inicioAt: inicio,
        finAt: fin,
          notas: data.descripcion ?? data.notas ?? null,
          tipoTatuaje: data.tipoTatuaje ?? null,
          tamano: data.tamano ?? null,
          zonaCuerpo: data.zonaCuerpo ?? null,
          servicio: creada.servicio,
          fecha: data.fecha,
          hora: creada.hora,
          duracion: creada.duracion,
        },
      },
      { status: 201 },
    )
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[reservas:POST] Prisma error", err.code, err.message)
    } else {
      console.error("[reservas:POST] Error inesperado", err)
    }
    return NextResponse.json(
      { ok: false, error: "Error interno al crear la reserva." },
      { status: 500 },
    )
  }
}

/**
 * GET /api/reservas?fecha=YYYY-MM-DD
 * Devuelve las reservas activas de una fecha (sin datos sensibles).
 * Útil para el panel admin si se construye más adelante.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fecha = searchParams.get("fecha")

  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return NextResponse.json(
      { ok: false, error: "Parámetro 'fecha' (YYYY-MM-DD) requerido." },
      { status: 400 },
    )
  }

  const desde = new Date(`${fecha}T00:00:00`)
  const hasta = new Date(`${fecha}T23:59:59.999`)

  try {
    const reservas = await prisma.reserva.findMany({
      where: {
        estado: { in: ["PENDIENTE", "CONFIRMADA"] },
        inicioAt: { gte: desde, lte: hasta },
      },
      orderBy: { inicioAt: "asc" },
      select: {
        id: true,
        servicio: true,
        hora: true,
        duracion: true,
        inicioAt: true,
        finAt: true,
      },
    })
    return NextResponse.json({ ok: true, reservas })
  } catch (err) {
    console.error("[reservas:GET] Error", err)
    return NextResponse.json(
      { ok: false, error: "Error interno al consultar reservas." },
      { status: 500 },
    )
  }
}
