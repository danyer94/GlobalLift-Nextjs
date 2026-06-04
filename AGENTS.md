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
- Iconos: `@phosphor-icons/react` en componentes activos; `lucide-react` permanece solo por componentes heredados/no activos hasta migracion completa.
- Animaciones: `framer-motion` `11.x`.
- Email transaccional de contacto: `resend` (API route en App Router).
- Scripts disponibles:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
  - `npm run typecheck`

## 3) Mapa rapido del repo

- `src/app/*`: App Router (layout, page, errores globales).
- `src/app/en/page.tsx`: variante inglesa indexable de la landing (`/en`).
- `src/app/sitemap.ts`: sitemap dinamico de App Router servido como `/sitemap.xml`.
- `src/app/fonts/*`: fuentes locales self-hosted usadas por `next/font/local` para las tipografias core del proyecto.
- `src/app/api/contact/route.ts`: endpoint POST para envio de formulario de contacto por email.
- `middleware.ts`: redireccion SEO de `?lang=en` a `/en` y header interno para renderizar `html lang` correcto.
- `src/components/*`: componentes de UI y secciones.
- `src/components/JsonLd.tsx`: inyeccion server-side de datos estructurados JSON-LD.
- `src/components/ui/AnimatedList.tsx`: wrappers de animaciones stagger con Framer Motion (`AnimatedList`/`MotionItem` para contenedores genericos y `AnimatedOl`/`MotionLi` para listas semanticas).
- `src/contexts/*`: contextos de React (ej. `FontClassContext` para exponer la clase de fuente mono del layout al badge de Image Reveal).
- `src/content/siteContent.ts`: contenido principal del sitio.
- `src/lib/seo.ts`: helpers de metadata, canonical, hreflang, rutas por idioma y JSON-LD.
- `PRODUCT.md`: contexto estrategico de producto/marca para agentes de diseno; declara register `brand`, usuarios, posicionamiento, anti-referencias y objetivos de conversion.
- `DESIGN.md`: sistema visual canonico para agentes de UI; tokens, tipografia, elevacion, componentes y reglas Do/Don't en formato DESIGN.md.
- `.impeccable/design.json`: sidecar generado para Impeccable con metadatos visuales, componentes renderizables y narrativa del sistema.
- `styles/globals.css`: tokens visuales, reglas base y utilidades globales.
- `src/utils/motion.ts`: variantes de animacion (stagger, fadeIn, scale) para Framer Motion.
- `tailwind.config.js`: extensiones de tema (colores, fuentes, sombras, radios).
- `public/images/og/og-image.jpg`: imagen Open Graph canonica, 1200x630.
- `public/images/generated/products/*`: assets PNG/WebP del carrusel 3D de productos (`ProductGallery`).
- `.atl/skill-registry.md`, `.pi/`, `.pi-lens/`, `.codex/`: artefactos locales generados por Pi/SDD/lens/Codex para skills, settings, entornos o caches; deben quedar ignorados por git.
- `pages/_app.tsx` y `pages/_document.tsx`: compatibilidad heredada de Pages Router.

### 3.1 Variables de entorno para contacto por email

- `RESEND_API_KEY`: API key de Resend para envio transaccional.
- `CONTACT_FROM_EMAIL`: remitente validado (formato sugerido: `Nombre <correo@dominio>`).
- `CONTACT_TO_EMAIL`: destino interno donde llegan los leads.
- Mantener plantilla de variables en `.env.example` y secretos reales solo en `.env.local` o entorno de despliegue.

## 4) Contrato de tipografia (NO romper)

- Primary/body font: `Plus Jakarta Sans` (self-hosted via `next/font/local`)
- Display/headings font: `Host Grotesk` (self-hosted via `next/font/local`) solo para headings destacados con `font-display` y para el Hero.
- Mono font: `JetBrains Mono` (self-hosted via `next/font/local`)
- Alcance vigente: `Host Grotesk` se aplica al Hero (`font-hero`) y headings seleccionados por clase (`font-display`), sin reemplazar la tipografia base de todos los `h1-h4` ni la tipografia de cuerpo (`Plus Jakarta Sans`).
- Jerarquia vigente: el H1 del Hero debe mantenerse como el mayor momento tipografico del sitio. Los titulos de seccion pueden usar escala cinematografica, pero no deben superar visualmente al Hero salvo decision explicita.
- Labels, badges, kickers y texto auxiliar deben conservar su tipografia original de componente (no usar `Host Grotesk` por defecto). Ejemplo actual: badge `Global Lift` en sticky reveal usa `JetBrains Mono`.

### Source of truth de fuentes

- Cargar fuentes solo en `src/app/layout.tsx` usando `next/font/local`.
- No depender de `next/font/google` para las tipografias core del proyecto: en este entorno puede degradar a fuentes fallback y retrasar la compilacion inicial.
- Mantener estos assets locales:
  - `src/app/fonts/plus-jakarta-sans-latin.woff2`
  - `src/app/fonts/jetbrains-mono-latin.woff2`
  - `src/app/fonts/host-grotesk-latin.woff2`
- Exponer las fuentes via variables CSS.
- Consumir fuentes por variables CSS en todas las capas de estilos:
  - `styles/globals.css`
  - `tailwind.config.js`

### Patrones prohibidos

- No importar `Archivo Semi Expanded` ni `Archivo_Semi_Expanded` desde `next/font/google`.
- No usar `Archivo` como display font en este repo hasta validar cambio de referencia visual en produccion.
- No importar `Plus_Jakarta_Sans` ni `JetBrains_Mono` desde `next/font/google`; deben cargarse desde assets locales.
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
- `Nosotros` debe mantenerse como una seccion ejecutiva escaneable: eyebrow `QUIENES SOMOS`, headline con propuesta de valor, un parrafo principal, CTAs hacia Proceso/Contacto, un panel de Compromiso y 3 proof cards operativas. No duplicar parrafos entre columna principal y panel lateral.
- Mantener los principios/valores agrupados en 3 `value-thread` operativos, sin liquid glass; evitar volver a una grilla larga de 7 valores iguales salvo decision explicita.
- Mantener estos boxes sin degradados de fondo: usar superficie translucida, borde suave y blur (backdrop-filter) para consistencia visual.
- Evitar crear estilos inline duplicados cuando exista una utilidad global o clase reutilizable para liquid glass.
- Aplicar el mismo lenguaje liquid glass al selector de idioma (`LanguageToggle`) para mantener consistencia en componentes de control visibles en el header.
- El menu hamburguesa movil (`Navigation`) debe mantener el lenguaje premium/liquid glass: drawer lateral con overlay blur, foco accesible, cierre por Escape/click externo, bloqueo de scroll y retorno de foco al trigger.
- En listas animadas con contenido localizado, no usar el texto traducido como `key`; usar claves estables independientes del idioma (`legal-compliance`, `sourcing-supply`, etc.) para evitar que Framer Motion remonte items ya revelados y los deje invisibles al cambiar ES/EN.
- En el footer, no usar un mini-mapa literal/ambiguo debajo del logo. La columna de marca debe comunicar posicionamiento internacional con una visual premium de mapa global usando `public/images/generated/contact-global-map-lights.webp`, overlay oscuro/glass, copy i18n desde `siteContent` y contenedor accesible por `aria-label`.
- Reservar `priority`/preload de `next/image` para imagenes above-the-fold que participen del LCP (Hero, logo visible). No marcar como `priority` imagenes below-the-fold como `ProductGallery`, porque compiten con fuentes/CSS/hero en la carga inicial.
- `ProductGallery` debe mantener un carrusel 3D tipo coverflow premium: imagen activa frontal, todas las tarjetas disponibles renderizadas como laterales/fondo en perspectiva 3D con profundidad, blur/brightness por distancia, controles glass accesibles, dots de progreso, visor modal y pausa de autoplay en hover/touch. El carrusel no debe mostrar texto overlay sobre las cards; la escena debe sostenerse con imagenes, bordes glass, suelo/reflejo marcado tipo render 3D y controles inferiores. No volver al carrusel plano con miniaturas lineales salvo decision explicita.
- En `ProductGallery`, el control de dots no debe renderizar los 18 indicadores completos en mobile ni permitir overflow horizontal. Usar una ventana compacta de indicadores visibles y CSS defensivo (`max-width`, `min-width: 0`, `overflow: hidden`, dots compactos en mobile) para mantener el control dentro del viewport.
- `Por que elegirnos` debe mantenerse como una escena cinematografica oscura, pero desde 2026-05-31 su estructura canonica es un panel ejecutivo de 3 pilares (`why.pillars` en `siteContent`) orientado a confianza empresarial: cumplimiento/documentacion, coordinacion operativa y abastecimiento flexible. Debe evitar el patron de 7 tarjetas iguales con numero/icono/texto y mantener responsive sin overflow lateral en tablet/mobile. La seccion usa titulo display, eyebrow mono, lead i18n desde `siteContent` e iconos Phosphor.
- `Services` debe seguir una linea de tarjetas premium tipo fintech/product cards cuando se busque mayor impacto: cards grandes y parejas (`services-matrix-*`), tres tonos controlados (porcelain/signal/navy), copy superior claro y visual abstracta inferior inspirada en logistica/comercio, evitando mosaicos desiguales y gradiente excesivo.
- Para máxima fidelidad visual en `Services`, preferir renders raster transparentes dedicados bajo `public/images/generated/services/` superpuestos en la zona inferior de cada tarjeta antes que recrear ilustraciones complejas solo con spans CSS o SVG.
- En `Services`, el hover debe escalar la tarjeta completa (`services-matrix-inner`) desde cualquier punto de la card; las imagenes internas no deben tener crecimiento independiente. La linea divisoria va debajo del titulo, antes del texto descriptivo.
- En `Services`, el bloque de texto (`services-matrix-number` y `services-matrix-copy`) debe mantenerse por encima del bloque visual con z-index superior. Las cards usan un ancho controlado menor que el contenedor completo para evitar que se vean sobredimensionadas en desktop.
- `Process` puede usar narrativa sticky/stacked para reforzar lectura operacional, evitando introducir GSAP si el proyecto ya resuelve motion con Framer Motion y CSS performante.

### 5.2 Convencion SEO e i18n indexable

- La landing en espanol vive en `/` y la variante inglesa indexable vive en `/en`.
- No usar `?lang=en` como canonical ni como URL principal indexable; `middleware.ts` debe redirigir `/?lang=en` hacia `/en` para compatibilidad con enlaces viejos.
- `src/lib/seo.ts` es la fuente de verdad para `metadataBase`, canonical, hreflang, Open Graph/Twitter y JSON-LD.
- `src/app/layout.tsx` debe renderizar `html lang` desde el header interno `x-globallift-lang` seteado por middleware; no dejar `/en` con `lang="es"` en server HTML.
- Mantener `public/images/og/og-image.jpg` en 1200x630 y alineada visualmente con importacion/exportacion/logistica; no usar imagenes de rubros ajenos al negocio.
- `public/robots.txt` debe bloquear `/api/` para todos los crawlers salvo decision explicita contraria.
- `src/app/sitemap.ts` debe listar solo URLs canonicas indexables (`/`, `/en`) y no variantes con query params.

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
- 2026-02-26: Paridad de fuente del badge Â«Global LiftÂ» en Image Reveal con la version de referencia (globallift.vercel.app): se anadio `FontClassProvider` en layout para inyectar la clase de JetBrains Mono (`next/font`) en el badge, regla `#services .badge.badge-contrast` en `globals.css` con `!important`, y fallback inline por variable CSS; en dev la variable puede resolver al fallback de next/font; en produccion la fuente coincide con la referencia.
- 2026-02-26: Ajuste fino Hero/Header con referencia Skydda: enlaces y controles del header en `Host Grotesk` (`14px/400` para links), Hero con imagen de fondo mas nitida (sin blur directo en `.hero-bg-image`) y recalibracion de overlays para mantener niebla sin perder lectura del barco; bloque de titulo/CTAs del Hero se desplazo hacia arriba para igualar separacion visual respecto al header (verificado con Playwright).
- 2026-02-26: Ajuste de fusion visual en Hero: `nav-hero-blend` pasa a fondo totalmente transparente (sin gradiente/tinte, sin blur), para que no se perciba franja ni cambio tonal del header sobre la imagen del Hero.
- 2026-02-26: Correccion responsive de solapamiento Hero/Header en laptops: se elimina el offset fijo negativo en `Hero.tsx` y se reemplaza por `hero-copy-shell--offset` con media queries por altura/anchura en `globals.css`, evitando superposicion en viewports bajos (ej. 1280x720) y manteniendo composicion en monitores grandes (verificado en 1024x768, 1280x640, 1280x720, 1366x768, 1440x900, 1536x864, 1600x900, 1920x1080).
- 2026-02-26: Refinamiento del espaciado Hero/Header para pantallas grandes: se redujo el gap vertical de forma continua por altura de viewport con `clamp(...)` en `hero-copy-shell--offset` y un ajuste adicional para pantallas muy grandes (`min-width:1700` + `min-height:980`), manteniendo cero solapamientos en laptops y acercando la composicion al layout de referencia Skydda.
- 2026-04-29: Refinamiento visual del selector de idioma: se reemplazaron los SVGs detallados/pesados de banderas por iconos vectoriales circulares simplificados y se ajustaron las medidas del toggle a valores pixel-aligned para evitar bordes borrosos, manteniendo el estilo glass actual.
- 2026-04-30: Implementacion completa del plan UI premium: (1) sombras premium con tinte de color en `--shadow-soft/lift/premium/card/glass`, (2) scrollbar personalizado, (3) variables dark mode listas (toggle no implementado), (4) upgrade tipografico de Onest a Plus Jakarta Sans, (5) grain opacity aumentado a 0.1 en modo immersive + mesh gradient en Contact, (6) sistema de animaciones escalonadas con `AnimatedList` + `MotionItem` + `src/utils/motion.ts`, (7) migracion de componentes activos a @phosphor-icons/react, manteniendo `lucide-react` para componentes heredados/no activos, (8) ProductGallery con hover metadata overlay por slide, (9) Footer rebuild con glassmorphism, grid de 4 columnas, mini-mapa SVG de Republica Dominicana y links sociales. Verificados con `npm run lint` y `npm run typecheck` sin errores.
- 2026-04-30: Correcciones pre-commit del plan UI premium: se ignora `*.tsbuildinfo`, se retira `tsconfig.tsbuildinfo` del commit, se agregan wrappers semanticos `AnimatedOl`/`MotionLi` para listas animadas, y Footer/ProductGallery pasan su copy nuevo por `siteContent` para preservar i18n ES/EN.
- 2026-04-30: Correccion de bug i18n + animaciones: las listas animadas de Valores, Servicios, Proceso y Por que elegirnos dejaron de usar copy traducido como `key`; ahora usan claves estables independientes del idioma para evitar que Framer Motion remonte items ya revelados con `opacity: 0` al cambiar ES/EN.
- 2026-05-01: Reemplazo del mini-mapa del footer por una visual premium de mapa global basada en `public/images/generated/contact-global-map-lights.webp`, con overlay oscuro/glass, labels localizados (`globalMapLabel`, `globalMapEyebrow`, `globalMapCaption`) en `siteContent` y verificacion visual en navegador.
- 2026-05-10: Inicializacion SDD en modo Engram: se genero `.atl/skill-registry.md` como registry local de skills, se agrego `.atl/` a `.gitignore` y se documento la infraestructura local en el mapa del repo.
- 2026-05-16: Refinamiento premium del Hero inspirado en Skydda: se cambia la imagen de fondo a `hero-cinematic-port.webp`, se ajustan overlays cinematograficos, legibilidad del bloque de copy y CTAs sin alterar copy ni fuentes, preservando responsive en viewports bajos como 1280x720.
- 2026-05-16: Se amplio `.gitignore` para excluir artefactos locales de Pi (`.pi/`, `.pi-lens/`) y Codex (`.codex/`) junto con `.atl/`, y se documento que estos directorios no deben entrar en git.
- 2026-05-16: Mejora del menu hamburguesa movil en `Navigation`: drawer premium/liquid glass con overlay blur, links escalonados, CTA destacado, cierre accesible por Escape/click externo y retorno de foco; estilos centralizados en `styles/globals.css`.
- 2026-05-17: Correccion del refactor SEO: se restaura `Plus Jakarta Sans` como fuente base, se reemplaza la variante inglesa query-param por ruta canonica `/en`, se agregan canonical/hreflang/JSON-LD centralizados en `src/lib/seo.ts`, sitemap dinamico en `src/app/sitemap.ts`, middleware para `html lang` server-side y redireccion `/?lang=en -> /en`, robots bloqueando `/api/` globalmente y Open Graph 1200x630 alineado al negocio.
- 2026-05-17: Correccion de carga de fuentes y performance inicial: `Plus Jakarta Sans` y `JetBrains Mono` pasan a assets locales en `src/app/fonts/*` cargados con `next/font/local` para evitar fallback de `next/font/google`; `ProductGallery` deja de usar `priority` para no precargar imagenes below-the-fold.
- 2026-05-20: `ProductGallery` se reconstruyo/refino como carrusel 3D premium inspirado en el mockup generado: stage oscuro cinematografico, card activa frontal, todas las cards disponibles visibles como laterales/fondo en perspectiva, sin texto overlay sobre las cards, suelo/reflejo marcado tipo render 3D, controles glass inferiores, dots y visor modal conservado. Verificado con `npm run lint`, `npm run typecheck`, React Doctor y QA visual Playwright desktop/mobile; no se ejecuto build por regla del repo.
- 2026-05-20: Ajuste de opacidad y reflejo en `ProductGallery`. Se configuro opacidad 1 en las tarjetas inactivas/laterales para eliminar la transparencia (evitando que se transparente el fondo) y se redujo la altura del reflejo en el suelo a 33% (1/3 de la imagen), aplicando un degradado de mascara (-webkit-mask-image/mask-image) con linear-gradient para difuminarlo suavemente y atenuando su opacidad maxima a 0.32 en JS.
- 2026-05-20: RediseÃ±o completo del modal visualizador de imÃ¡genes (Image Viewer) de `ProductGallery` en `ProductGallery.tsx`. Se eliminÃ³ el fondo cian brillante (`bg-primary/55`) y se reemplazÃ³ por un fondo oscuro cinematogrÃ¡fico con desenfoque de fondo (`bg-black/90` + `backdrop-blur-xl`). Se agregaron controles de vidrio soplado circular (`glassmorphic`) con iconos en blanco puro posicionados fuera del marco de la imagen y flotando sutilmente a los lados del viewport en pantallas medianas/grandes. Se implementÃ³ un resplandor de fondo ("backlight glow") cian/azul detrÃ¡s de la imagen para integrarla con la atmÃ³sfera visual del carrusel, y se moviÃ³ el tÃ­tulo e Ã­ndice a un panel inferior flotante de vidrio soplado.
- 2026-05-20: AdaptaciÃ³n de la imagen del visor a pantalla completa real (`100vw`/`100vh` con `object-contain`), removiendo todo margen de contenedor y eliminando por completo el `border-radius` (corner radius) para que se visualice con esquinas rectas/cuadradas Ãºnicamente dentro del modal de visualizaciÃ³n completa.
- 2026-05-20: Se agregaron 10 imagenes generadas nuevas al carrusel de productos (pina, cacao, cafe, bananos, cocos, limones, aceite de coco, oregano, yuca y miel) en PNG/WebP bajo `public/images/generated/products/`, se amplio `PRODUCT_IMAGES` de 8 a 18 slides y se sincronizaron titulos/metadatos ES/EN en `siteContent`.
- 2026-05-20: Se redisenio `Por que elegirnos` como deck cinematografico de tarjetas verticales glass superpuestas con inclinacion alternada, encabezado/lead i18n y preservacion del ambiente oscuro premium de la web. Verificado con `npm run lint`, `npm run typecheck`, React Doctor y QA visual en Browser/Playwright; no se ejecuto build por regla del repo.
- 2026-05-20: Se corrigio la vista mobile de `Por que elegirnos`: se reemplazo el carrusel/deck horizontal por una pila vertical compacta de tarjetas glass con inclinacion alternada sutil, ancho contenido dentro del viewport y sin overflow lateral; el breakpoint mobile queda alineado al header `md:hidden` (hasta 767px) para evitar que vistas moviles anchas sigan viendo el deck desktop.
- 2026-05-21: Se corrigio el overflow mobile de los dots de `ProductGallery`: el componente usa una ventana compacta de indicadores visibles y el control glass agrega limites de ancho, overflow hidden y dots compactos para impedir que los puntos salgan del contenedor o del viewport.
- 2026-05-21: Se ajusto `Por que elegirnos` para laptop/tablet angosto (768-1180px) y laptops de hasta `900px` de alto: el deck ahora se comprime segun ancho y alto disponibles, elimina el scroll horizontal en ese rango y reduce alto/tipografia/espaciados en viewports bajos para que las tarjetas entren dentro de pantalla.
- 2026-05-31: Se documentaron `PRODUCT.md`, `DESIGN.md` y `.impeccable/design.json` como contexto canonico para redisenos premium empresariales con Impeccable; se establecio el north star `The Trade Control Room`, register `brand`, reglas anti glass-spam, disciplina de color cyan y enfoque de contacto como intake operativo.
- 2026-05-31: Se aplico el primer pase premium empresarial post-DESIGN.md: Contact pasa a intake operativo con destino/origen, volumen y timing; `Por que elegirnos` cambia de 7 tarjetas a 3 pilares ejecutivos; se reduce glass decorativo en Contact; `ProductGallery` reemplaza `transition-all` del visor por clases explicitas y respeta reduced motion.
- 2026-06-01: Fix de performance de scroll en `ProductGallery` (`styles/globals.css` + `src/components/ProductGallery.tsx`): (1) `content-visibility: auto` + `contain-intrinsic-size: auto 720px` en `.product-3d-shell` para skippear el render fuera del viewport, (2) `transform-style: preserve-3d` removido del stage y `mix-blend-mode: soft-light` + noise SVG removidos del `::before` del stage, (3) `will-change: filter` selectivo: solo la card activa, las depth lejanas (`|offset| > 2`) pierden el filter compuesto (`product-3d-card--depth-far`), (4) `backdrop-filter: blur()` removido de `.product-3d-control-deck`, `.product-3d-meta` y `.product-viewer-meta` (solo quedan en expand y viewer modal donde el contexto cambia dinamicamente), fondos opacificados a `rgb(4 13 31 / 0.78-0.82)` para mantener lectura, (5) blurs decorativos reducidos: orbes 44px->28px, rail 18px->14px, floor::after 12px->8px, floor-light 34px->22px, backlight del visor 48px->28px. Verificado con `npm run lint` y `npm run typecheck` sin errores. AGENTS_CHECK: actualizacion documental por impacto en `styles/globals.css` y `ProductGallery.tsx`.
- 2026-06-01: Correccion del pase premium: se retiro `OperationalProof` para preservar el Hero cinematografico sin franja inferior, se elimino el panel/cartel blanco previo a `ProductGallery` y se preservo el CTA original, se retiraron los textos superiores del formulario de Contact, se removio `overflow-x-hidden` del `main` porque rompia el sticky scroll reveal post-Nosotros, y `Services` paso a una matriz de tarjetas parejas (`services-matrix-*`) con menos gradiente.
- 2026-06-01: `Services` se redisenio siguiendo referencia visual tipo fintech/product cards: 3 tarjetas grandes agrupadas, radio amplio, tonos porcelain/signal/navy y visuales CSS abstractas de logistica en la zona inferior, manteniendo estructura i18n y sin tocar Hero/ProductGallery/Contact.
- 2026-06-01: Se reemplazaron las visuales abstractas de spans/SVG en `Services` por renders raster transparentes PNG/WebP (`public/images/generated/services/*-render.*`) superpuestos dentro de cada tarjeta, restaurando además el número de tarjeta y la línea divisoria debajo del copy para mayor fidelidad con la referencia.
- 2026-06-01: Ajuste fino de `Services`: el hover ya no escala las imagenes de cada tarjeta; escala la tarjeta completa sin importar el punto de hover, y la linea divisoria se movio debajo del titulo antes del texto secundario.
- 2026-06-01: Ajuste de proporcion y capas en `Services`: las tarjetas se redujeron aproximadamente 10% (`services-matrix-grid` al 90% y min-height escalado) y el texto queda siempre por encima de las imagenes con z-index superior.
- 2026-06-03: `Nosotros` se reestructuro para mejorar escaneo y reducir texto: headline con propuesta de valor, un unico parrafo principal, CTAs a Proceso/Contacto, panel de Compromiso sin parrafo duplicado, 3 proof cards operativas y valores compactados en 3 principios agrupados. Se actualizaron `About.tsx`, `siteContent.ts` y estilos `about-*` en `styles/globals.css`.
- 2026-06-04: Se corrigio la jerarquia tipografica global sin agrandar el Hero: el H1 conserva su escala original y se reducen `about-title`, `about-values-title`, `section-title`, `services-matrix-header .section-title` y `why-deck-title` para no competir con el H1. AGENTS_CHECK: actualizado por cambios en `styles/globals.css`.
