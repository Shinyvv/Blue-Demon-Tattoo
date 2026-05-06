"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, CheckCircle2, Clock, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"

import { SERVICES, SERVICE_CATEGORIES, getServiceById, getServicesByCategory } from "@/lib/services"
import { OPCIONES_DURACION } from "@/lib/horarios"
import { BUSINESS } from "@/lib/config"
import { cn } from "@/lib/utils"

type Status = "idle" | "loadingSlots" | "submitting" | "success" | "error"

interface FormState {
  nombre: string
  email: string
  telefono: string
  categoriaId: string
  servicioId: string
  duracion: number
  fecha?: Date
  hora?: string
  notas: string
}

export function ReservationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const initialId = searchParams.get("servicio") ?? "corte-dama"
  const initialService = getServiceById(initialId) ?? SERVICES[0]

  const [form, setForm] = useState<FormState>({
    nombre: "",
    email: "",
    telefono: "",
    categoriaId: initialService.categoria,
    servicioId: initialService.id,
    duracion: initialService.duracion,
    fecha: undefined,
    hora: undefined,
    notas: "",
  })
  const [slots, setSlots] = useState<string[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const [reservaConfirmada, setReservaConfirmada] = useState<{
    nombre: string
    fecha: string
    hora: string
    servicio: string
  } | null>(null)

  const servicioActual = useMemo(
    () => getServiceById(form.servicioId) ?? SERVICES[0],
    [form.servicioId],
  )

  // Días bloqueados: domingos y fechas pasadas
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  // Cargar slots cuando cambia fecha o duración
  useEffect(() => {
    const fecha = form.fecha
    if (!fecha) {
      setSlots([])
      return
    }
    const fechaStr = format(fecha, "yyyy-MM-dd")
    const controller = new AbortController()
    setStatus("loadingSlots")
    fetch(
      `/api/reservas/disponibilidad?fecha=${fechaStr}&duracion=${form.duracion}`,
      { signal: controller.signal, cache: "no-store" },
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.ok) {
          setSlots(data.slots ?? [])
          setStatus("idle")
          // Si la hora seleccionada ya no existe, limpiarla
          if (form.hora && !data.slots?.includes(form.hora)) {
            setForm((s) => ({ ...s, hora: undefined }))
          }
        } else {
          setSlots([])
          setStatus("error")
          toast.error(data?.error ?? "No se pudo cargar la disponibilidad")
        }
      })
      .catch((err) => {
        if (err?.name === "AbortError") return
        console.log("[v0] Error cargando slots:", err)
        setStatus("error")
      })
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.fecha, form.duracion])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  function onSelectCategory(id: string) {
    const subServices = getServicesByCategory(id as any)
    const firstSvc = subServices[0] ?? SERVICES[0]
    setForm((s) => ({
      ...s,
      categoriaId: id,
      servicioId: firstSvc.id,
      duracion: firstSvc.duracion,
      hora: undefined,
    }))
  }

  function onSelectService(id: string) {
    const svc = getServiceById(id) ?? SERVICES[0]
    setForm((s) => ({
      ...s,
      servicioId: svc.id,
      duracion: svc.duracion,
      hora: undefined,
    }))
  }

  function validar(): string | null {
    if (form.nombre.trim().length < 2) return "Ingresa tu nombre completo."
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email inválido."
    if (form.telefono.replace(/\D/g, "").length < 8) return "Teléfono inválido."
    if (!form.fecha) return "Selecciona una fecha."
    if (!form.hora) return "Selecciona un horario."
    return null
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validar()
    if (err) {
      toast.error(err)
      return
    }

    setStatus("submitting")
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          tipoServicio: SERVICE_CATEGORIES.find(c => c.id === form.categoriaId)?.nombre ?? "",
          servicio: servicioActual.nombre,
          fecha: format(form.fecha!, "yyyy-MM-dd"),
          hora: form.hora,
          duracion: form.duracion,
          notas: form.notas.trim() || null,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setStatus("error")
        toast.error(data?.error ?? "No se pudo crear la reserva")
        return
      }
      setReservaConfirmada({
        nombre: form.nombre,
        fecha: format(form.fecha!, "EEEE d 'de' MMMM 'de' yyyy", { locale: es }),
        hora: form.hora!,
        servicio: servicioActual.nombre,
      })
      setStatus("success")
      toast.success("¡Reserva confirmada!")
      startTransition(() => router.refresh())
    } catch (err) {
      console.log("[v0] Error enviando reserva:", err)
      setStatus("error")
      toast.error("Error de red. Inténtalo nuevamente.")
    }
  }

  if (status === "success" && reservaConfirmada) {
    return (
      <Card className="border-primary/40 bg-card/80">
        <CardHeader className="items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <CardTitle className="font-serif text-3xl">¡Reserva confirmada!</CardTitle>
          <CardDescription>
            Te esperamos en {BUSINESS.name}, {reservaConfirmada.nombre}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <dl className="mx-auto grid max-w-sm grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between rounded-md border border-border bg-background/40 px-4 py-2">
              <dt className="text-muted-foreground">Servicio</dt>
              <dd>{reservaConfirmada.servicio}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-background/40 px-4 py-2">
              <dt className="text-muted-foreground">Fecha</dt>
              <dd className="capitalize">{reservaConfirmada.fecha}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-background/40 px-4 py-2">
              <dt className="text-muted-foreground">Hora</dt>
              <dd>{reservaConfirmada.hora} hrs</dd>
            </div>
          </dl>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              onClick={() => {
                setReservaConfirmada(null)
                setStatus("idle")
                setForm((s) => ({ ...s, hora: undefined, notas: "" }))
              }}
              variant="outline"
              className="border-border"
            >
              Hacer otra reserva
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/">Volver al inicio</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* Columna izquierda: servicio, calendario, hora */}
      <div className="space-y-6">
        <Card className="border-border bg-card/60">
          <CardHeader>
            <CardTitle className="font-serif text-xl">1. Servicio y duración</CardTitle>
            <CardDescription>Elige qué quieres reservar.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="categoria">Tipo de servicio</Label>
              <Select value={form.categoriaId} onValueChange={onSelectCategory}>
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Selecciona un tipo de servicio" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicio">Servicio</Label>
              <Select value={form.servicioId} onValueChange={onSelectService}>
                <SelectTrigger id="servicio">
                  <SelectValue placeholder="Selecciona un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {getServicesByCategory(form.categoriaId as any).map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duracion">Duración</Label>
              <Select
                value={String(form.duracion)}
                onValueChange={(v) => update("duracion", Number(v))}
              >
                <SelectTrigger id="duracion">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPCIONES_DURACION.map((o) => (
                    <SelectItem key={o.value} value={String(o.value)}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/60">
          <CardHeader>
            <CardTitle className="font-serif text-xl">2. Fecha y hora</CardTitle>
            <CardDescription>
              Atendemos lunes a sábado entre {BUSINESS.openHour}:00 y {BUSINESS.closeHour}:00.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="rounded-lg border border-border bg-background/40 p-2">
              <Calendar
                mode="single"
                locale={es}
                weekStartsOn={1}
                selected={form.fecha}
                onSelect={(d) => update("fecha", d ?? undefined)}
                disabled={(date) => {
                  if (date < today) return true
                  return date.getDay() === 0 // domingo
                }}
                className="bg-transparent"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <Label className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Horarios disponibles
                </Label>
                {form.fecha && (
                  <span className="text-xs text-muted-foreground">
                    {format(form.fecha, "EEEE d MMM", { locale: es })}
                  </span>
                )}
              </div>

              {!form.fecha && (
                <p className="mt-3 rounded-md border border-dashed border-border bg-background/30 p-4 text-sm text-muted-foreground">
                  Selecciona primero una fecha en el calendario.
                </p>
              )}

              {form.fecha && status === "loadingSlots" && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 rounded-md" />
                  ))}
                </div>
              )}

              {form.fecha && status !== "loadingSlots" && slots.length === 0 && (
                <p className="mt-3 rounded-md border border-dashed border-border bg-background/30 p-4 text-sm text-muted-foreground">
                  No hay horarios disponibles para esta fecha y duración. Prueba con otra
                  combinación.
                </p>
              )}

              {form.fecha && status !== "loadingSlots" && slots.length > 0 && (
                <div
                  role="radiogroup"
                  aria-label="Horarios disponibles"
                  className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4"
                >
                  {slots.map((s) => {
                    const active = form.hora === s
                    return (
                      <button
                        type="button"
                        key={s}
                        role="radio"
                        aria-checked={active}
                        onClick={() => update("hora", s)}
                        className={cn(
                          "rounded-md border px-2 py-2 text-sm transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background/40 hover:border-primary/50 hover:bg-card",
                        )}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna derecha: datos personales + resumen */}
      <div className="space-y-6">
        <Card className="border-border bg-card/60">
          <CardHeader>
            <CardTitle className="font-serif text-xl">3. Tus datos</CardTitle>
            <CardDescription>Para confirmar tu reserva.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                placeholder="Juan Pérez"
                autoComplete="name"
                required
                maxLength={120}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                  maxLength={160}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  type="tel"
                  inputMode="tel"
                  value={form.telefono}
                  onChange={(e) => update("telefono", e.target.value)}
                  placeholder="+56 9 XXXX XXXX"
                  autoComplete="tel"
                  required
                  maxLength={20}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notas">Notas (opcional)</Label>
              <Textarea
                id="notas"
                value={form.notas}
                onChange={(e) => update("notas", e.target.value)}
                placeholder="Comentarios o preferencias"
                maxLength={500}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-card/60">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">            <Row label="Tipo de servicio" value={SERVICE_CATEGORIES.find(c => c.id === form.categoriaId)?.nombre ?? ""} />            <Row label="Servicio" value={servicioActual.nombre} />
            <Row label="Duración" value={`${form.duracion} minutos`} />
            <Row
              label="Fecha"
              value={
                form.fecha
                  ? format(form.fecha, "EEEE d 'de' MMMM", { locale: es })
                  : "—"
              }
              capitalize
            />
            <Row label="Hora" value={form.hora ?? "—"} />

            <Button
              type="submit"
              size="lg"
              className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={status === "submitting" || isPending}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Confirmar reserva
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Al confirmar aceptas nuestras políticas de atención. Si necesitas cancelar,
              avísanos al menos 2 horas antes.
            </p>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string
  value: string
  capitalize?: boolean
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn(capitalize && "capitalize")}>{value}</span>
    </div>
  )
}
