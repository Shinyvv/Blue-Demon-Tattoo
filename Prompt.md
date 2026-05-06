Actúa como un desarrollador senior full-stack experto en Next.js (App Router), TypeScript, UX/UI moderno y refactorización de proyectos existentes.

Ya existe un proyecto funcional de una barbería (Fortune Barbershop) con sistema de reservas. NO debes crearlo desde cero.

Tu tarea es MODIFICAR, ADAPTAR y MEJORAR este proyecto para un nuevo cliente:

"New Hair Salón - Talagante"

----------------------------------------
📍 CONTEXTO DEL NUEVO NEGOCIO
----------------------------------------

Nombre: New Hair Salón  
Ubicación: Boulevard Talagante - Enrique Alcalde 1080, Local 90  
Teléfono: +56 9 8821 5996  
Horario: Lunes a Sábado, 10:00 a 19:00  

Descripción:
Salón de belleza profesional enfocado en:
- Colorimetría (Balayage, visos, mechas, etc.)
- Tratamientos capilares
- Alisados
- Corte dama, varón y niños
- Maquillaje y estética

Trabajan con:
- L'Oréal
- Wella
- Schwarzkopf
- Alfaparf

Tienen enfoque más femenino/estético (NO solo barbería)

----------------------------------------
🎯 OBJETIVO
----------------------------------------

Adaptar la web existente de barbería a un salón de belleza moderno, elegante y orientado a servicios capilares avanzados.

NO cambiar el stack ni la arquitectura, solo modificar contenido, diseño y lógica donde sea necesario.

----------------------------------------
🎨 CAMBIOS EN FRONTEND (MUY IMPORTANTE)
----------------------------------------

1. LANDING PAGE (app/page.tsx)

Reemplazar completamente el contenido:

- Cambiar branding:
  "Fortune Barbershop" → "New Hair Salón"

- Hero:
  - Texto principal enfocado en belleza capilar
  - Ejemplo:
    "Transforma tu cabello con expertos en color y estilo"

- Subtexto:
  destacar experiencia, productos premium y personalización

- CTA:
  "Reservar hora"

----------------------------------------

2. SECCIÓN SERVICIOS

Eliminar servicios de barbería pura y reemplazar por:

Categorías:

✂️ Cortes:
- Corte dama
- Corte varón
- Corte niños

🎨 Color:
- Balayage
- Visos
- Mechas
- Color global
- Baby lights

💆 Tratamientos:
- Botox capilar
- Hidratación profunda
- Anti-frizz

✨ Alisados:
- Keratina
- Bioplastía
- Keratina Coffee

💄 Otros:
- Maquillaje profesional
- Diseño de cejas
- Depilación

Mostrar en cards modernas con íconos.

----------------------------------------

3. ELIMINAR PLAN MENSUAL

Eliminar completamente cualquier sección de:
- suscripción mensual
- planes tipo barbería

Este negocio NO usa ese modelo.

----------------------------------------

4. NUEVA SECCIÓN (MUY IMPORTANTE)

Agregar sección:

"Trabajamos con productos profesionales"

Mostrar:
- L’Oréal
- Wella
- Schwarzkopf
- Alfaparf

Diseño tipo badges o logos elegantes.

----------------------------------------

5. INFORMACIÓN DE CONTACTO

Actualizar:

- Dirección completa
- Teléfono correcto
- Horario (hasta 19:00)

Agregar botón directo a WhatsApp:
https://wa.me/56988215996

----------------------------------------

6. ESTILO VISUAL (CRÍTICO)

Cambiar estética:

ANTES:
- Oscuro, masculino, barbería

DESPUÉS:
- Elegante, limpio, moderno
- Paleta clara o neutra (blanco, beige, negro suave)
- Tipografía más femenina/estética
- Más aire y espacios

----------------------------------------

📅 CAMBIOS EN RESERVAS
----------------------------------------

1. HORARIO

Actualizar lógica:
- 10:00 a 19:00
- Lunes a sábado

----------------------------------------

2. DURACIÓN DE SERVICIOS

Mejorar lógica:

Permitir seleccionar duración:
- 30 min (corte)
- 60 min
- 120+ min (color, tratamientos)

----------------------------------------

3. FORMULARIO

Agregar campo:

- Tipo de servicio (select)

Opciones:
- Corte
- Color
- Tratamiento
- Alisado
- Otros

----------------------------------------

💾 BACKEND (API)
----------------------------------------

Modificar endpoint existente:

POST /api/reservas

Agregar:
- campo servicio
- validar duración según servicio
- mantener lógica anti-solapamiento

----------------------------------------

🧠 EXPERIENCIA DE USUARIO
----------------------------------------

- Flujo simple y claro
- Ideal para usuarios no técnicos
- Mobile-first
- Feedback visual claro

----------------------------------------

📦 ENTREGA
----------------------------------------

Quiero que me entregues:

1. SOLO los archivos modificados
2. Código completo de cada archivo
3. Explicación breve de cada cambio

----------------------------------------

⚠️ REGLAS
----------------------------------------

- NO recrear el proyecto desde cero
- NO cambiar stack
- NO eliminar funcionalidades clave
- Mantener código limpio y escalable
- Priorizar claridad visual y UX

----------------------------------------

Si necesitas asumir algo, hazlo con criterio profesional.