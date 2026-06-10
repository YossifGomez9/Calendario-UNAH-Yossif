# Frontend - Calendario Académico UNAH

Este es el frontend del calendario académico interactivo UNAH. Está desarrollado con Next.js, Tailwind CSS y componentes de shadcn/ui.

# Funciones principales

* Muestra eventos académicos en cards.
* Consume datos desde Payload CMS.
* Permite buscar eventos.
* Permite filtrar por tipo de evento.
* Permite filtrar por fecha.
* Muestra detalle de cada evento.
* Incluye estados de carga y error.
* Diseño responsive.

# Variable de entorno

Crear el archivo:

.env.local

Con el contenido:

NEXT_PUBLIC_PAYLOAD_URL=http://127.0.0.1:3001

# Ejecutar localmente

npm install
npm run dev

El frontend se abre en:

http://localhost:3000

# Archivos importantes

src/app/page.tsx
src/app/loading.tsx
src/app/error.tsx
src/componentes/CalendarSection.tsx
src/componentes/EventCard.tsx
src/lib/getAcademicEvents.ts
