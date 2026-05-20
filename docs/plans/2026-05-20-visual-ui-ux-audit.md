# Auditoría visual UI/UX — GlobalLift

Fecha: 2026-05-20  
Alcance: inspección visual manual con Browser en `http://localhost:3001`, desktop 1280x720 y mobile 390x844.  
Objetivo: detectar mejoras de legibilidad, navegación, UX e impacto visual antes de decidir implementación.

## Resumen ejecutivo

La web ya tiene una base visual fuerte: Hero cinematográfico, lenguaje glass consistente, carrusel de productos con impacto premium y una navegación mobile bastante cuidada. No estamos hablando de “arreglar algo roto”; estamos hablando de subir el estándar de percepción, legibilidad y conversión.

El mayor problema visual detectado no es una sección puntual: es la tensión entre estética premium muy clara/suave y legibilidad operativa. En varias secciones claras, el fondo texturizado/glass aporta atmósfera, pero también baja contraste percibido y genera zonas con demasiado aire. Eso hace que la interfaz se vea elegante, sí, pero por momentos menos contundente de lo que debería para una empresa B2B de comercio/logística.

Prioridad recomendada: mejorar contraste funcional, jerarquía de secciones, feedback de navegación y claridad del formulario antes de agregar nuevos efectos.

## Hallazgos positivos

- Hero desktop/mobile con alto impacto visual y buen foco en el mensaje principal.
- CTAs del Hero claros: `Contacto` y `Servicios` funcionan bien como acciones principales.
- Menú mobile visualmente premium, con targets grandes, buen espaciado y CTA fijo inferior.
- Carrusel de productos 3D genera recordación visual; comunica catálogo amplio mejor que una grilla plana.
- Contacto tiene buena estructura de información + formulario, especialmente en mobile.
- La estética liquid glass ya se siente como sistema visual y no como efecto aislado.

## Problemas / oportunidades detectadas

### 1. Header sticky sobre fondo claro: falta más separación funcional

En desktop y mobile, al salir del Hero el header pasa a una superficie clara translúcida. Visualmente está correcto, pero los links quedan algo livianos contra el fondo claro/texturizado. En desktop, los links de navegación se leen, pero no tienen mucho peso ni estado activo visible.

**Riesgo:** el usuario puede perder orientación al navegar por una landing larga.

**Sugerencia:** agregar un estado activo por sección o una micro-línea/progress indicator en el header.

Tradeoff:
- Pro: mejora orientación y sensación de producto pulido.
- Contra: suma lógica de scroll spy y hay que cuidarlo para no ensuciar el header.

### 2. Exceso de aire vertical en algunas transiciones

En desktop, al saltar a secciones como Productos/Servicios, se perciben zonas superiores muy amplias antes del contenido central. En mobile también hay tramos donde la textura ocupa mucho espacio antes del próximo bloque.

**Riesgo:** baja la densidad informativa y puede sentirse “lento” al explorar.

**Sugerencia:** revisar `padding-top`, `scroll-margin-top` y alturas mínimas por sección. Mantener respiración premium, pero reducir aire muerto en breakpoints medianos.

Tradeoff:
- Pro: navegación más eficiente y mejor ritmo visual.
- Contra: si se compacta demasiado, pierde sensación premium.

### 3. Fondos claros texturizados: elegantes, pero a veces compiten con texto secundario

Los textos principales tienen contraste aceptable, pero los secundarios en gris sobre fondos con imagen/ruido suave pierden fuerza perceptiva, especialmente en mobile y secciones como valores/contacto.

**Sugerencia:** subir apenas el contraste de `text-muted` en superficies claras o añadir una capa blanca translúcida más consistente detrás de bloques de texto largos.

Tradeoff:
- Pro: mejora legibilidad sin cambiar layout.
- Contra: puede reducir la atmósfera etérea si se exagera.

### 4. ProductGallery: alto impacto, pero falta contexto persistente mínimo

El carrusel 3D se ve potente. La decisión de no usar overlays de texto sobre cards es buena para mantener pureza visual. Pero al usuario nuevo le puede faltar una pista rápida de qué producto está viendo si no abre el modal o si no reconoce visualmente la imagen.

**Sugerencia:** agregar metadata mínima fuera de la imagen, debajo del carrusel o integrada en la barra de controles: `03 / 18 · Aguacate · Exportación`. No overlay sobre la card.

Tradeoff:
- Pro: mejora comprensión sin romper la regla visual actual.
- Contra: suma texto a una escena que hoy es más cinematográfica.

### 5. Formulario: visualmente premium, pero labels demasiado “decorativos”

Los labels del formulario usan uppercase + tracking amplio. Se ven finos, pero en mobile y en campos críticos podrían sentirse pequeños o muy decorativos.

**Sugerencia:** mantener uppercase, pero subir ligeramente tamaño/peso o reforzar contraste. También agregar copy corto arriba del formulario tipo: “Respondemos con una ruta clara de abastecimiento/logística”.

Tradeoff:
- Pro: mejora claridad y confianza.
- Contra: más texto puede hacer la sección menos limpia.

### 6. Menú mobile: gran presencia, pero CTA podría comunicar mejor valor

El menú mobile está muy bien resuelto visualmente. El CTA inferior dice “Contacto”, correcto pero genérico.

**Sugerencia:** probar CTA más orientado a conversión: `Solicitar propuesta` o `Cotizar operación`.

Tradeoff:
- Pro: más intención comercial.
- Contra: “Contacto” es más neutral y menos comprometedor.

### 7. Falta una sección corta de confianza operativa / proof points

La web comunica servicios y productos, pero podría reforzar confianza B2B con una banda compacta de proof points: cumplimiento legal, trazabilidad, abastecimiento flexible, coordinación logística, República Dominicana ↔ mercados internacionales.

**Sugerencia:** insertar una franja breve después del Hero o antes de Productos con 3-4 métricas/claims verificables, sin inventar números.

Ejemplo sin números inventados:
- Cumplimiento legal
- Coordinación logística
- Abastecimiento multisectorial
- Operación B2B internacional

Tradeoff:
- Pro: aumenta confianza temprana.
- Contra: si se redacta genérico, se vuelve relleno corporativo.

## Recomendaciones priorizadas

### Prioridad Alta

1. Ajustar contraste de textos secundarios en fondos claros.
2. Reducir aire vertical muerto en transiciones/anchors de secciones.
3. Agregar estado activo o indicador de progreso en navegación sticky.
4. Mejorar labels/copy contextual del formulario.

### Prioridad Media

5. Agregar metadata externa mínima al ProductGallery.
6. Cambiar CTA mobile de `Contacto` a una acción más comercial.
7. Añadir franja de confianza/proof points sin métricas inventadas.

### Prioridad Baja / exploratoria

8. Microinteracciones de hover/focus más evidentes en cards y links.
9. Modo “reduced motion” más explícito para usuarios sensibles al movimiento.
10. Separadores visuales sutiles entre bloques largos para mejorar ritmo.

## Propuesta de implementación por fases

### Fase 1 — Legibilidad y navegación

- Ajustar tokens de texto secundario en superficies claras.
- Revisar spacing de secciones y `scroll-margin-top`.
- Agregar estado activo del header mediante scroll spy liviano.
- Revisar foco/hover visible en links y botones.

### Fase 2 — Conversión

- Refinar copy del formulario.
- Cambiar CTA mobile si se valida tono comercial.
- Añadir proof points compactos.

### Fase 3 — Producto visual

- Agregar metadata externa al carrusel.
- Evaluar microinteracciones sin saturar la escena.

## Decisiones pendientes

1. ¿Queremos priorizar una web más cinematográfica o más densa/comercial?
2. ¿El CTA principal debería ser `Contacto`, `Solicitar propuesta` o `Cotizar operación`?
3. ¿Aceptamos agregar metadata visible al ProductGallery fuera de las cards?
4. ¿Queremos scroll spy/estado activo en navegación o preferimos header minimalista?

## Nota técnica

No se ejecutó build, respetando la regla del repositorio. Esta auditoría no modifica código de producción.

## Estado de implementación — 2026-05-20

Implementado en tres fases:

- **Fase 1 — Legibilidad y navegación:** se reforzó el contraste de texto en superficies cinematográficas claras, se redujo el ritmo vertical de secciones, se agregó progreso de scroll en el header y estado activo por sección.
- **Fase 2 — Conversión:** se refinó el copy contextual del formulario y el CTA del menú mobile pasó a una acción más comercial. La franja de proof points post-Hero fue retirada porque rompía el ambiente minimalista/cinematográfico del Hero.
- **Fase 3 — Producto visual:** `ProductGallery` ahora muestra metadata externa mínima fuera de las cards (`índice`, título, categoría, origen y badge cuando existe), preservando la regla de no poner texto overlay sobre las imágenes.

Validación realizada:

- `npm run lint`
- `npm run typecheck`
- `npx -y react-doctor@latest . --verbose --diff`
- QA visual con Browser en desktop y mobile.

No se ejecutó `npm run build`.

## Correcci?n posterior ? 2026-05-20

Se retiró la franja de proof points post-Hero del código y se eliminaron sus tipos, copy y estilos asociados. La información de confianza operativa permanece distribuida en Hero, Nosotros, Servicios, Productos, Proceso y Por qué elegirnos; no se mantiene una franja post-Hero para preservar el Hero cinematográfico.
