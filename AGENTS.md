# GlobalLift Next.js - AGENTS.md

Guia operativa para cualquier agente de IA que trabaje en este repositorio.
Este archivo es una fuente de verdad viva: si cambia el proyecto y este documento queda desactualizado, la tarea NO esta completa.

## 1) Objetivo del agente

- Entregar cambios correctos y verificables en Next.js sin romper tipografia, estilos globales ni configuracion base.
- Mantener alineados codigo, comandos y documentacion operativa (`AGENTS.md`).
- Evitar repetir errores ya resueltos usando la bitacora de incidencias de este archivo.

## 2) Stack y comandos del proyecto

- Framework: Next.js `14.x` + React `18.x` + TypeScript.
- Estilos: Tailwind CSS `3.x` + `styles/globals.css`.
- Email transaccional de contacto: `resend` (API route en App Router).
- Scripts disponibles:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
  - `npm run typecheck`

## 3) Mapa rapido del repo

- `src/app/*`: App Router (layout, page, errores globales).
- `src/app/fonts/*`: fuentes locales usadas por `next/font/local` cuando una fuente de Google no esta disponible en `next/font/google`.
- `src/app/api/contact/route.ts`: endpoint POST para envio de formulario de contacto por email.
- `src/components/*`: componentes de UI y secciones.
- `src/contexts/*`: contextos de React (ej. `FontClassContext` para exponer la clase de fuente mono del layout al badge de Image Reveal).
- `src/content/siteContent.ts`: contenido principal del sitio.
- `styles/globals.css`: tokens visuales, reglas base y utilidades globales.
- `tailwind.config.js`: extensiones de tema (colores, fuentes, sombras, radios).
- `pages/_app.tsx` y `pages/_document.tsx`: compatibilidad heredada de Pages Router.

### 3.1 Variables de entorno para contacto por email

- `RESEND_API_KEY`: API key de Resend para envio transaccional.
- `CONTACT_FROM_EMAIL`: remitente validado (formato sugerido: `Nombre <correo@dominio>`).
- `CONTACT_TO_EMAIL`: destino interno donde llegan los leads.
- Mantener plantilla de variables en `.env.example` y secretos reales solo en `.env.local` o entorno de despliegue.

## 4) Contrato de tipografia (NO romper)

- Primary/body font: `Onest`
- Display/headings font: `Host Grotesk` (self-hosted via `next/font/local`) solo para headings destacados con `font-display` y para el Hero.
- Mono font: `JetBrains Mono`
- Alcance vigente: `Host Grotesk` se aplica al Hero (`font-hero`) y headings seleccionados por clase (`font-display`), sin reemplazar la tipografia base de todos los `h1-h4` ni la tipografia de cuerpo (`Onest`).
- Labels, badges, kickers y texto auxiliar deben conservar su tipografia original de componente (no usar `Host Grotesk` por defecto). Ejemplo actual: badge `Global Lift` en sticky reveal usa `JetBrains Mono`.

### Source of truth de fuentes

- Cargar fuentes solo en `src/app/layout.tsx` usando `next/font/google` y/o `next/font/local`.
- `Host Grotesk` debe mantenerse como asset local en `src/app/fonts/host-grotesk-latin.woff2` y exponerse via variable CSS.
- Consumir fuentes por variables CSS en todas las capas de estilos:
  - `styles/globals.css`
  - `tailwind.config.js`

### Patrones prohibidos

- No importar `Archivo Semi Expanded` ni `Archivo_Semi_Expanded` desde `next/font/google`.
- No usar `Archivo` como display font en este repo hasta validar cambio de referencia visual en produccion.
- No hardcodear nombres de fuentes en `tailwind.config.js` cuando existan variables CSS.
- No mezclar `<link>` de Google Fonts con `next/font` para estas fuentes del proyecto.

### Verificacion obligatoria tras cambios de fuente

1. Ejecutar `npm run lint`
2. Ejecutar `npm run typecheck`
3. Confirmar alineacion entre:
   - `src/app/layout.tsx`
   - `styles/globals.css`
   - `tailwind.config.js`
4. Verificar que se mantienen las variables:
   - `--font-onest`
   - `--font-jetbrains-mono`
   - `--font-host-grotesk`

## 5) Flujo minimo de trabajo del agente

1. Leer este archivo antes de editar codigo.
2. Hacer cambios minimos y enfocados al objetivo.
3. Ejecutar validaciones segun impacto:
   - Cambios TS/React/CSS/config: `npm run lint` y `npm run typecheck`.
   - Cambios de build/dependencias/ruteo mayor: sumar `npm run build`.
4. Reportar que se cambio, que se verifico y cualquier riesgo residual.

### 5.1 Convencion visual para boxes (Liquid Glass)

- Aplicar estilo liquid glass a los boxes de Nosotros, Compromiso, Process y Por que elegirnos.
- En Valores, aplicar liquid glass solo a los boxes de Vision y Mision.
- Mantener la lista de valores individuales (value-thread) en su estilo de hilo original, sin liquid glass.
- Mantener estos boxes sin degradados de fondo: usar superficie translucida, borde suave y blur (backdrop-filter) para consistencia visual.
- Evitar crear estilos inline duplicados cuando exista una utilidad global o clase reutilizable para liquid glass.
- Aplicar el mismo lenguaje liquid glass al selector de idioma (`LanguageToggle`) para mantener consistencia en componentes de control visibles en el header.

## 6) Protocolo de auto-actualizacion de AGENTS.md (OBLIGATORIO)

Regla dura: si una tarea cambia algo del proyecto que afecte reglas, estructura, comandos o decisiones documentadas aqui, el agente DEBE actualizar `AGENTS.md` en la misma tarea.

### 6.1 Archivos gatillo de actualizacion documental

Si se modifica cualquiera de estos archivos o areas, revisar y actualizar `AGENTS.md` automaticamente:

- `package.json` (scripts, dependencias, tooling)
- `next.config.mjs`, `tsconfig.json`, `.eslintrc.json`, `postcss.config.js`, `tailwind.config.js`
- `src/app/layout.tsx`, `styles/globals.css` (tipografia, tokens, estilos base)
- estructura de carpetas en `src/app`, `src/components`, `src/contexts`, `src/content`, `src/hooks`, `src/utils`
- convenciones de i18n, SEO, rutas, metadata o estrategia de rendering

### 6.2 Criterio de cierre de tarea

No se considera finalizada una tarea hasta cumplir:

1. `AGENTS.md` revisado contra los cambios.
2. `AGENTS.md` actualizado si hubo impacto.
3. Entrada agregada en `Historial de sincronizacion`.

Si no hubo cambios documentales, registrar explicitamente: `AGENTS_CHECK: sin cambios requeridos` en el resumen final de la tarea.

## 7) Registro de errores resueltos (memoria para no repetir)

Cada vez que el agente cometa un error y luego se corrija, documentarlo aqui en el momento del fix.
No borrar incidencias previas; solo marcar estado o agregar resolucion adicional.

### 7.1 Plantilla obligatoria

```md
### ERR-YYYYMMDD-XX - Titulo corto
- Fecha:
- Area/archivo:
- Sintoma:
- Causa raiz:
- Solucion aplicada:
- Regla preventiva (que nunca debe volver a hacerse):
- Verificacion:
- Estado: Resuelto | Mitigado | Seguimiento
```

### 7.2 Incidencias registradas

### ERR-20260212-01 - Desalineacion de fuente display
- Fecha: 2026-02-12
- Area/archivo: `src/app/layout.tsx`, `styles/globals.css`, `tailwind.config.js`
- Sintoma: cambios previos intentaron introducir `Archivo`/`Archivo_Semi_Expanded`, rompiendo la paridad tipografica esperada.
- Causa raiz: no seguir contrato de tipografia ni la fuente de verdad de variables.
- Solucion aplicada: estandarizar display/body en `Onest` y mono en `JetBrains Mono` con variables `--font-onest` y `--font-jetbrains-mono`.
- Regla preventiva (que nunca debe volver a hacerse): no importar ni usar `Archivo` en este repo sin validacion formal.
- Verificacion: lint + typecheck + revision cruzada de los 3 archivos de tipografia.
- Estado: Resuelto

### ERR-20260225-02 - Alcance tipografico aplicado fuera de headlines
- Fecha: 2026-02-25
- Area/archivo: `styles/globals.css`, `src/components/ImageRevealSection.tsx`
- Sintoma: se percibio cambio de fuente en etiquetas auxiliares (ej. badge `Global Lift`) cuando el pedido era aplicar la fuente del Hero solo a headlines.
- Causa raiz: no explicitar en el contrato local que badges/kickers debian mantener fuente base.
- Solucion aplicada: restaurar tipografia original del badge (`JetBrains Mono`) y mantener `Host Grotesk` solo en clases de headlines (`font-hero`, `font-display`).
- Regla preventiva (que nunca debe volver a hacerse): no extender cambios de tipografia display a labels, badges ni texto auxiliar sin confirmacion explicita.
- Verificacion: Playwright (computed font-family en Hero h1, headings de seccion y badge sticky), `npm run lint`, `npm run typecheck`.
- Estado: Resuelto

## 8) Historial de sincronizacion de AGENTS.md

- 2026-02-12: Reestructuracion completa del archivo; se anadieron flujo operativo, protocolo de auto-actualizacion y registro formal de errores resueltos.
- 2026-02-17: Se agrego la convencion visual de boxes Liquid Glass para secciones de contenido institucional y proceso.
- 2026-02-17: Se ajusto el alcance de Liquid Glass: en Valores solo aplica a Vision y Mision; la lista value-thread queda en estilo original.
- 2026-02-17: Se aplico Liquid Glass al selector de idioma en el header (`LanguageToggle`) con estilo consistente al resto de superficies glass.
- 2026-02-19: Se implemento flujo de contacto por email con `resend` via `src/app/api/contact/route.ts`, se anadio `.env.example` y feedback de envio en `src/components/Contact.tsx` con textos ES/EN en `src/content/siteContent.ts`.
- 2026-02-25: Hero actualizado a estilo cinematografico oscuro; header transparente en zona Hero; se agrego `Host Grotesk` para tipografia del Hero via `next/font/local` (`src/app/fonts/host-grotesk-latin.woff2`) y variable `--font-host-grotesk`.
- 2026-02-25: Ajuste de alcance tipografico: se revierte `Host Grotesk` global en base headings y se limita a Hero + headings seleccionados con `font-display` (incluye secciones como Nosotros, Compromiso, Valores y sticky reveal), manteniendo `Onest` como base general.
- 2026-02-25: Correccion de alcance tipografico en elementos auxiliares; badges/kickers mantienen tipografia original (ej. `Global Lift` en sticky reveal en `JetBrains Mono`), con `Host Grotesk` solo en headlines.
- 2026-02-25: Refinamiento de Header/Hero inspirado en Skydda: logo sin fondo adicional, enlaces sin elipse contenedora, CTA del header igual al CTA primario del Hero, estado Hero sin borde inferior visible y Hero con mayor niebla/difuminacion azul para resaltar el titulo.
- 2026-02-26: Paridad de fuente del badge «Global Lift» en Image Reveal con la version de referencia (globallift.vercel.app): se anadio `FontClassProvider` en layout para inyectar la clase de JetBrains Mono (`next/font`) en el badge, regla `#services .badge.badge-contrast` en `globals.css` con `!important`, y fallback inline por variable CSS; en dev la variable puede resolver al fallback de next/font; en produccion la fuente coincide con la referencia.
- 2026-02-26: Ajuste de fusion visual en Hero: `nav-hero-blend` pasa a fondo totalmente transparente (sin gradiente/tinte, sin blur), para que no se perciba franja ni cambio tonal del header sobre la imagen del Hero.
