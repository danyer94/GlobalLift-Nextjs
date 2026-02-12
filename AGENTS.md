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
- Scripts disponibles:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
  - `npm run typecheck`

## 3) Mapa rapido del repo

- `src/app/*`: App Router (layout, page, errores globales).
- `src/components/*`: componentes de UI y secciones.
- `src/content/siteContent.ts`: contenido principal del sitio.
- `styles/globals.css`: tokens visuales, reglas base y utilidades globales.
- `tailwind.config.js`: extensiones de tema (colores, fuentes, sombras, radios).
- `pages/_app.tsx` y `pages/_document.tsx`: compatibilidad heredada de Pages Router.

## 4) Contrato de tipografia (NO romper)

- Primary/body font: `Onest`
- Display/headings font: `Onest` (para mantener paridad visual con la version Vite validada)
- Mono font: `JetBrains Mono`

### Source of truth de fuentes

- Cargar fuentes solo en `src/app/layout.tsx` usando `next/font/google`.
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

## 5) Flujo minimo de trabajo del agente

1. Leer este archivo antes de editar codigo.
2. Hacer cambios minimos y enfocados al objetivo.
3. Ejecutar validaciones segun impacto:
   - Cambios TS/React/CSS/config: `npm run lint` y `npm run typecheck`.
   - Cambios de build/dependencias/ruteo mayor: sumar `npm run build`.
4. Reportar que se cambio, que se verifico y cualquier riesgo residual.

## 6) Protocolo de auto-actualizacion de AGENTS.md (OBLIGATORIO)

Regla dura: si una tarea cambia algo del proyecto que afecte reglas, estructura, comandos o decisiones documentadas aqui, el agente DEBE actualizar `AGENTS.md` en la misma tarea.

### 6.1 Archivos gatillo de actualizacion documental

Si se modifica cualquiera de estos archivos o areas, revisar y actualizar `AGENTS.md` automaticamente:

- `package.json` (scripts, dependencias, tooling)
- `next.config.mjs`, `tsconfig.json`, `.eslintrc.json`, `postcss.config.js`, `tailwind.config.js`
- `src/app/layout.tsx`, `styles/globals.css` (tipografia, tokens, estilos base)
- estructura de carpetas en `src/app`, `src/components`, `src/content`, `src/hooks`, `src/utils`
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

## 8) Historial de sincronizacion de AGENTS.md

- 2026-02-12: Reestructuracion completa del archivo; se anadieron flujo operativo, protocolo de auto-actualizacion y registro formal de errores resueltos.
