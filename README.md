# Fortune Barbershop

Aplicación web de reservas para **Fortune Barbershop** (Talagante, Chile).
Construida con Next.js 16 (App Router), TypeScript, Tailwind v4, shadcn/ui,
Prisma y PostgreSQL.

## Funcionalidades

- Landing premium con hero, servicios, plan mensual destacado y mapa.
- Sistema de reservas con calendario, slots dinámicos y validación de
  solapamientos.
- API REST en `app/api/reservas`:
  - `POST /api/reservas` crea una reserva validando datos y solapamientos.
  - `GET  /api/reservas?fecha=YYYY-MM-DD` lista reservas del día.
  - `GET  /api/reservas/disponibilidad?fecha=YYYY-MM-DD&duracion=NN` retorna
    los horarios libres considerando duración y reservas existentes.
- Duración configurable entre 10 minutos y 3 horas.
- Días laborales lunes a sábado, horario 10:00–20:00.

## Stack

- **Frontend**: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 ·
  shadcn/ui · react-day-picker · date-fns · sonner.
- **Backend**: Next.js API Routes · Zod · Prisma 7 · PostgreSQL 14+.
- **Infra**: lista para Hostinger VPS (Node 20+) con Nginx + PM2 o systemd.

## Estructura

```
.
├── app/
│   ├── api/reservas/
│   │   ├── route.ts                  # POST + GET reservas
│   │   └── disponibilidad/route.ts   # GET disponibilidad
│   ├── reservar/page.tsx             # Página de reserva
│   ├── layout.tsx                    # Layout raíz + fuentes + metadata
│   ├── globals.css                   # Tema premium oscuro
│   └── page.tsx                      # Landing
├── components/
│   ├── sections/{hero,services,monthly-plan,contact}.tsx
│   ├── reservas/reservation-form.tsx
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   └── ui/*                          # shadcn/ui
├── lib/
│   ├── config.ts                     # Datos del negocio
│   ├── services.ts                   # Catálogo de servicios + plan mensual
│   ├── horarios.ts                   # Generación de slots
│   ├── validations.ts                # Schemas Zod
│   ├── prisma.ts                     # Singleton de Prisma
│   └── utils.ts
├── prisma/
│   └── schema.prisma                 # Modelo Reserva (PostgreSQL)
├── public/images/                    # Hero, barbero, herramientas
└── .env.example
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```bash
cp .env.example .env
```

| Variable             | Requerida | Ejemplo                                              |
| -------------------- | --------- | ---------------------------------------------------- |
| `DATABASE_URL`       | Sí        | `postgresql://user:pass@localhost:5432/fortune?schema=public` |
| `NEXT_PUBLIC_SITE_URL` | No      | `https://fortunebarbershop.cl`                       |

## Desarrollo local

```bash
# 1. Instalar dependencias
pnpm install        # o npm install / yarn

# 2. Crear y migrar la base de datos
pnpm db:migrate     # crea la migración inicial y aplica

# 3. (Opcional) abrir Prisma Studio
pnpm db:studio

# 4. Iniciar el servidor
pnpm dev
```

La app queda en `http://localhost:3000`.

## Comandos disponibles

| Comando             | Descripción                                  |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Servidor de desarrollo                       |
| `pnpm build`        | `prisma generate` + build de producción      |
| `pnpm start`        | Servir la build de producción                |
| `pnpm db:migrate`   | Crear/aplicar migraciones (dev)              |
| `pnpm db:deploy`    | Aplicar migraciones (producción)             |
| `pnpm db:studio`    | UI visual de Prisma                          |
| `pnpm lint`         | ESLint                                       |

## Despliegue en Hostinger VPS

### 1. Preparar el VPS (Ubuntu 22.04)

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs postgresql nginx
sudo npm install -g pnpm pm2
```

### 2. Crear la base de datos

```bash
sudo -u postgres psql <<SQL
CREATE DATABASE fortune_barbershop;
CREATE USER fortune WITH ENCRYPTED PASSWORD 'cambia_este_password';
GRANT ALL PRIVILEGES ON DATABASE fortune_barbershop TO fortune;
SQL
```

### 3. Clonar y configurar el proyecto

```bash
git clone https://github.com/<tu-org>/fortune-barbershop.git
cd fortune-barbershop
cp .env.example .env
nano .env   # editar DATABASE_URL
pnpm install
pnpm db:deploy
pnpm build
```

### 4. Servir con PM2

```bash
pm2 start "pnpm start" --name fortune-barbershop --cwd /var/www/fortune-barbershop
pm2 save
pm2 startup
```

### 5. Configurar Nginx + SSL (Let's Encrypt)

```nginx
# /etc/nginx/sites-available/fortunebarbershop.cl
server {
    server_name fortunebarbershop.cl www.fortunebarbershop.cl;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/fortunebarbershop.cl /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d fortunebarbershop.cl -d www.fortunebarbershop.cl
```

### 6. Deploy automático con GitHub (opcional)

Crear un workflow `.github/workflows/deploy.yml` que ejecute via SSH:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/fortune-barbershop
            git pull origin main
            pnpm install --frozen-lockfile
            pnpm db:deploy
            pnpm build
            pm2 reload fortune-barbershop
```

## Reglas de negocio

- Lunes a sábado de 10:00 a 20:00 (domingos cerrado).
- Duraciones permitidas: de 10 min a 3 h.
- Slots en intervalos de 10 min (`slotStepMinutes` en `lib/config.ts`).
- No se aceptan reservas en el pasado.
- No se permite solape: se valida en DB con `inicioAt < newFin && finAt > newInicio`.
