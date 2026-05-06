import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { disponibilidadQuerySchema } from "@/lib/validations"
import { generarSlotsDisponibles } from "@/lib/horarios"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * GET /api/reservas/disponibilidad?fecha=YYYY-MM-DD&duracion=NN
 * Devuelve la lista de horarios disponibles ese día para la duración pedida,
 * ya descontando las reservas existentes.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parsed = disponibilidadQuerySchema.safeParse({
    fecha: searchParams.get("fecha"),
    duracion: searchParams.get("duracion"),
  })

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Parámetros inválidos.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const { fecha, duracion } = parsed.data
  const fechaBase = new Date(`${fecha}T00:00:00`)
  const desde = new Date(`${fecha}T00:00:00`)
  const hasta = new Date(`${fecha}T23:59:59.999`)

  try {
    const reservas = await prisma.reserva.findMany({
      where: {
        estado: { in: ["PENDIENTE", "CONFIRMADA"] },
        inicioAt: { gte: desde, lte: hasta },
      },
      select: { inicioAt: true, finAt: true },
    })

    const slots = generarSlotsDisponibles({
      fecha: fechaBase,
      duracion,
      ocupados: reservas.map((r) => ({ inicio: r.inicioAt, fin: r.finAt })),
    })

    return NextResponse.json({ ok: true, fecha, duracion, slots })
  } catch (err) {
    console.error("[disponibilidad:GET] Error", err)
    // Fallback: si la DB no está disponible (build/preview),
    // devolvemos slots sin reservas para no romper la UI.
    const slots = generarSlotsDisponibles({
      fecha: fechaBase,
      duracion,
      ocupados: [],
    })
    return NextResponse.json({
      ok: true,
      fecha,
      duracion,
      slots,
      warning: "Disponibilidad calculada sin datos de DB.",
    })
  }
}
