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

import { SERVICES, SERVICE_CATEGORIES, getServicesByCategory, getServiceById } from "@/lib/services"
import { BUSINESS } from "@/lib/config"
import { cn } from "@/lib/utils"

type Status = "idle" | "loadingSlots" | "submitting" | "success" | "error"

interface FormState {
  nombre: string
  email: string
  telefono: string
  categoriaId: string
  servicioId: string
  fecha?: Date
  hora?: string
  tipoTatuaje: string
  tamano: string
  zonaCuerpo: string
  descripcion: string
}

export function ReservationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const initialId = searchParams.get("servicio") ?? "personalizado"
  const initialService = getServiceById(initialId) ?? SERVICES[0]

  const [form, setForm] = useState<FormState>({
    nombre: "",
    email: "",
    telefono: "",
    categoriaId: initialService.categoria,
    servicioId: initialService.id,
    fecha: undefined,
    hora: undefined,
    tipoTatuaje: initialService.nombre,
    tamano: "Pequeño (1-5cm)",
    zonaCuerpo: "",
    descripcion: "",
  })
  const [slots, setSlots] = useState<string[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const [reservaConfirmada, setReservaConfirmada] = useState<any>(null)

  const servicioActual = useMemo(
    () => getServiceById(form.servicioId) ?? SERVICES[0],
    [form.servicioId],
  )

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

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
      `/api/evaluaciones/disponibilidad?fecha=${fechaStr}&duracion=30`,
      { signal: controller.signal, cache: "no-store" },
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.ok) {
          setSlots(data.slots ?? [])
          setStatus("idle")
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
        setStatus("error")
      })
    return () => controller.abort()
  }, [form.fecha])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  function validar(): string | null {
    if (form.nombre.trim().length < 2) return "Ingresa tu nombre."
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email inválido."
    if (form.telefono.replace(/\D/g, "").length < 8) return "Teléfono inválido."
    if (!form.fecha) return "Selecciona una fecha."
    if (!form.hora) return "Selecciona un horario."
    if (!form.zonaCuerpo) return "Ingresa la zona del cuerpo."
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
      const res = await fetch("/api/evaluaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          tipoServicio: SERVICE_CATEGORIES.find(c => c.id === form.categoriaId)?.nombre ?? "",
          servicio: servicioActual.nombre,
          tipoTatuaje: form.tipoTatuaje,
          tamano: form.tamano,
          zonaCuerpo: form.zonaCuerpo.trim(),
          descripcion: form.descripcion.trim() || null,
          fecha: format(form.fecha!, "yyyy-MM-dd"),
          hora: form.hora,
          duracion: 30, // Fijado a 30 mins
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setStatus("error")
        toast.error(data?.error ?? "No se pudo agendar la evaluación")
        return
      }
      setReservaConfirmada({
        nombre: form.nombre,
        fecha: format(form.fecha!, "EEEE d 'de' MMMM 'de' yyyy", { locale: es }),
        hora: form.hora!,
        servicio: servicioActual.nombre,
      })
      setStatus("success")
      toast.success("¡Evaluación agendada!")
      startTransition(() => router.refresh())
    } catch (err) {
      setStatus("error")
      toast.error("Error de red. Inténtalo nuevamente.")
    }
  }

  if (status === "success" && reservaConfirmada) {
    return (
      <Card className="border-secondary/30 bg-white">
        <CardHeader className="items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary/10 text-secondary">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <CardTitle className="font-serif text-3xl text-secondary">¡Evaluación Agendada!</CardTitle>
          <CardDescription className="text-secondary/70">
            Te esperamos en {BUSINESS.name}, {reservaConfirmada.nombre}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <dl className="mx-auto grid max-w-sm grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between rounded-md border border-secondary/20 bg-white px-4 py-2">
              <dt className="text-secondary/60">Trabajo</dt>
              <dd className="text-secondary">{reservaConfirmada.servicio}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border border-secondary/20 bg-white px-4 py-2">
              <dt className="text-secondary/60">Fecha</dt>
              <dd className="capitalize text-secondary">{reservaConfirmada.fecha}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border border-secondary/20 bg-white px-4 py-2">
              <dt className="text-secondary/60">Hora</dt>
              <dd className="text-secondary">{reservaConfirmada.hora} hrs</dd>
            </div>
          </dl>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              onClick={() => {
                setReservaConfirmada(null)
                setStatus("idle")
                setForm((s) => ({ ...s, hora: undefined, descripcion: "" }))
              }}
              variant="outline"
              className="border-secondary/30 bg-transparent text-secondary/70 hover:text-secondary"
            >
              Agendar otra evaluación
            </Button>
            <Button asChild className="bg-secondary text-white hover:bg-secondary/90">
              <a href="/">Volver al inicio</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        
        <Card className="border-secondary/20 bg-white">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-secondary">1. Detalles del Tatuaje</CardTitle>
            <CardDescription className="text-secondary/70">Cuéntanos sobre tu idea para la evaluación.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tipoTatuaje" className="text-secondary">Tipo de trabajo</Label>
              <Select value={form.tipoTatuaje} onValueChange={(v) => update("tipoTatuaje", v)}>
                <SelectTrigger id="tipoTatuaje" className="bg-white border-secondary/20">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent className="bg-white border-secondary/20 text-secondary">
                  {SERVICES.map((s) => (
                    <SelectItem key={s.id} value={s.nombre}>{s.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tamano" className="text-secondary">Tamaño aprox.</Label>
              <Select value={form.tamano} onValueChange={(v) => update("tamano", v)}>
                <SelectTrigger id="tamano" className="bg-white border-secondary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-secondary/20 text-secondary">
                  <SelectItem value="Pequeño (1-5cm)">Pequeño (1-5cm)</SelectItem>
                  <SelectItem value="Mediano (6-15cm)">Mediano (6-15cm)</SelectItem>
                  <SelectItem value="Grande (16cm+)">Grande (16cm+)</SelectItem>
                  <SelectItem value="Manga completa">Manga completa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="zonaCuerpo" className="text-secondary">Zona del cuerpo</Label>
              <Input
                id="zonaCuerpo"
                value={form.zonaCuerpo}
                onChange={(e) => update("zonaCuerpo", e.target.value)}
                placeholder="Ej. Antebrazo, espalda, costillas..."
                className="bg-white border-secondary/20 text-secondary"
                required
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="descripcion" className="text-secondary">Descripción / Idea / Referencias</Label>
              <Textarea
                id="descripcion"
                value={form.descripcion}
                onChange={(e) => update("descripcion", e.target.value)}
                placeholder="Describe tu idea, si tienes referencias, etc."
                className="bg-white border-secondary/20 text-secondary"
                rows={3}
              />
            </div>
            <p className="sm:col-span-2 text-sm text-secondary/60 italic mt-2">
              * Duración: El tiempo estimado del tatuaje se definirá tras esta evaluación.
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-white">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-secondary">2. Fecha y hora para la Evaluación</CardTitle>
            <CardDescription className="text-secondary/70">
              Disponibilidad de {BUSINESS.openHour}:00 a {BUSINESS.closeHour}:00.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="rounded-lg border border-secondary/20 bg-white p-2">
              <Calendar
                mode="single"
                locale={es}
                weekStartsOn={1}
                selected={form.fecha}
                onSelect={(d) => update("fecha", d ?? undefined)}
                disabled={(date) => {
                  if (date < today) return true
                  return date.getDay() === 0 
                }}
                className="bg-transparent text-secondary"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <Label className="inline-flex items-center gap-2 text-secondary">
                  <Clock className="h-4 w-4" />
                  Horarios
                </Label>
                {form.fecha && (
                  <span className="text-xs text-secondary/60">
                    {format(form.fecha, "EEEE d MMM", { locale: es })}
                  </span>
                )}
              </div>

              {!form.fecha && (
                <p className="mt-3 rounded-md border border-dashed border-secondary/20 bg-white p-4 text-sm text-secondary/60">
                  Selecciona primero una fecha.
                </p>
              )}

              {form.fecha && status === "loadingSlots" && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 rounded-md bg-secondary/10" />
                  ))}
                </div>
              )}

              {form.fecha && status !== "loadingSlots" && slots.length === 0 && (
                <p className="mt-3 rounded-md border border-dashed border-secondary/20 bg-white p-4 text-sm text-secondary/60">
                  No hay horarios disponibles para evaluación este día.
                </p>
              )}

              {form.fecha && status !== "loadingSlots" && slots.length > 0 && (
                <div
                  role="radiogroup"
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
                            ? "border-secondary bg-secondary text-white"
                            : "border-secondary/20 bg-white text-secondary/70 hover:border-secondary/50 hover:bg-secondary/5",
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

      <div className="space-y-6">
        <Card className="border-secondary/30 bg-white">
          <CardHeader>
            <CardTitle className="font-serif text-xl border-secondary/20 text-secondary">3. Tus datos</CardTitle>
            <CardDescription className="text-secondary/70">Para contactarte y agendar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-secondary">Nombre completo</Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                placeholder="Juan Pérez"
                autoComplete="name"
                required
                maxLength={120}
                className="bg-white border-secondary/20 text-secondary"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-secondary">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                  maxLength={160}
                  className="bg-white border-secondary/20 text-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-secondary">Teléfono</Label>
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
                  className="bg-white border-secondary/20 text-secondary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/30 bg-white">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-secondary">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Trabajo" value={form.tipoTatuaje} />
            <Row label="Tamaño" value={form.tamano} />
            <Row label="Zona" value={form.zonaCuerpo || "—"} />
            <Row
              label="Fecha Evaluación"
              value={form.fecha ? format(form.fecha, "EEEE d 'de' MMMM", { locale: es }) : "—"}
              capitalize
            />
            <Row label="Hora Evaluación" value={form.hora ?? "—"} />

            <Button
              type="submit"
              size="lg"
              className="mt-4 w-full bg-secondary text-white hover:bg-secondary/90 font-medium"
              disabled={status === "submitting" || isPending}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                  Agendando...
                </>
              ) : (
                <>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Agendar Evaluación
                </>
              )}
            </Button>
            <p className="text-xs text-secondary/60 text-center mt-2">
              Esta solicitud es para una reunión de evaluación, sin monto a pagar aún.
            </p>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}

function Row({ label, value, capitalize }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-secondary/20 py-2 last:border-b-0">
      <span className="text-secondary/60">{label}</span>
      <span className={cn(capitalize && "capitalize", "text-secondary truncate max-w-50")}>{value}</span>
    </div>
  )
}
