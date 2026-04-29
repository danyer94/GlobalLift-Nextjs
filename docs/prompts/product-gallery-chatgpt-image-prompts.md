# GPT-Image-2 Prompts (Galería de Productos)

Usá estos prompts para generar imágenes nuevas del carrusel de productos en Global Lift SRL.
La dirección visual es **fotografía comercial hyper-realistic**, sobria y premium: producto protagonista, contexto exportador real, iluminación controlada, cero estética de stock barato. Acá no estamos haciendo “frutitas lindas”; estamos vendiendo confianza B2B. Es así de fácil.

- Modelo recomendado: `gpt-image-2`
- Tamaño recomendado y fijo: `1536x1024`
- Calidad recomendada: `high`
- Formato final recomendado: `webp` con fallback `png` si el componente lo requiere.
- Estilo recomendado: fotografía comercial premium, hyper-realistic, lente profesional, iluminación natural controlada, color grading editorial B2B, composición limpia para landing page.
- Restricciones globales: sin texto, sin logos, sin marcas de agua, sin branding visible, sin etiquetas legibles, sin manos deformes, sin productos plásticos/artificiales, sin exceso de saturación.
- Criterio de consistencia: todas las imágenes deben sentirse parte de la misma campaña visual: exportación, trazabilidad, control de calidad, puerto/almacén moderno, paleta cálida-neutral con acentos verdes y negros profundos.

## 1) Carbón vegetal premium
Image size: 1536x1024. Hyper-realistic premium commercial product photography for a B2B export landing page: selected natural hardwood charcoal pieces arranged beside clean unbranded matte charcoal sacks on a dark walnut pallet, modern export warehouse in soft background blur, subtle container silhouettes, visible porous charcoal texture, fine dust details, controlled side light with elegant highlights, deep blacks, warm neutral shadows, editorial luxury trade aesthetic, 35mm full-frame lens look, shallow depth of field, professional color grading. No text, no logos, no watermark, no readable labels, no people, no plastic-looking material, no oversaturated colors.

## 2) Carbón para volumen comercial
Image size: 1536x1024. Hyper-realistic professional B2B export scene showing bulk charcoal supply ready for container loading: uniform unbranded industrial charcoal bags stacked with precise geometry on wooden pallets, a small sample of real charcoal visible in the foreground, clean loading bay and port logistics atmosphere in the background, realistic bag fabric, pallet wear, forklift marks on concrete, premium corporate composition, crisp foreground with cinematic depth, controlled daylight from warehouse doors, restrained contrast, trustworthy large-volume sourcing mood. No text, no logos, no watermark, no readable labels, no workers, no brand marks, no messy clutter.

## 3) Variedad de frutas tropicales
Image size: 1536x1024. Hyper-realistic premium export produce photography: mangoes, avocados, pineapples, papayas and bananas arranged in clean unbranded export-grade crates on a stainless quality-control table, modern packing facility background softly blurred, subtle condensation and natural skin imperfections, calibrated color without oversaturation, warm daylight mixed with soft studio fill, editorial B2B landing page aesthetic, fresh but professional, elegant negative space, 50mm lens realism. No text, no logos, no watermark, no stickers, no readable labels, no hands, no cartoon colors, no fake glossy fruit.

## 4) Variedad de verduras frescas
Image size: 1536x1024. Hyper-realistic commercial export photo of fresh vegetables in premium logistics context: bell peppers, tomatoes, cucumbers, lettuce and carrots organized in clean unbranded crates, stainless inspection table, subtle cold-chain warehouse background with soft blur, natural moisture, realistic leaf texture, matte vegetable skins, balanced green-red-orange palette, professional editorial lighting, credible B2B sourcing and quality-control mood, crisp product detail and clean composition for a landing page carousel. No text, no logos, no watermark, no stickers, no people, no oversaturated supermarket look, no messy background.

## 5) Aguacate para exportación
Image size: 1536x1024. Hyper-realistic high-end export photography of fresh avocados sorted by caliber on a brushed steel packing table, a few avocados cut only if natural and clean but no messy pulp, realistic pebbled skin texture and subtle color variation, unbranded crates in the background, modern quality-control environment, soft side light, shallow depth of field, premium Latin American export mood, refined commercial composition with trustworthy professional finish. No text, no logos, no watermark, no stickers, no hands, no artificial shine, no damaged rotten fruit.

## 6) Mango para exportación
Image size: 1536x1024. Hyper-realistic cinematic product photography of export-grade mangoes arranged in clean unbranded trays, warm Dominican-Caribbean trade atmosphere without tourist clichés, packing facility and logistics crates softly blurred behind, realistic waxy skin, natural red-yellow-green gradients, tiny surface imperfections, soft golden daylight plus controlled fill, premium B2B landing page look, elegant composition, crisp product foreground, subtle depth and professional color grading. No text, no logos, no watermark, no stickers, no people, no oversaturated neon fruit, no fantasy background.

## 7) Pimientos y tomates de calidad
Image size: 1536x1024. Hyper-realistic editorial produce export scene featuring red bell peppers and ripe tomatoes in color-calibrated unbranded crates on a clean inspection table, modern packing warehouse context, realistic matte skins, natural highlights, subtle condensation, premium quality-control aesthetic, balanced composition with deep foreground detail and soft background blur, professional B2B sourcing mood, high-end commercial photography suitable for a landing page carousel. No text, no logos, no watermark, no stickers, no hands, no wet plastic look, no oversaturated colors.

## 8) Catálogo abierto bajo solicitud
Image size: 1536x1024. Hyper-realistic premium sourcing concept photo for a B2B export company: a curated mixed-product display with charcoal sample, tropical fruits, vegetables, sealed unbranded crates and export-ready pallets arranged in a modern logistics warehouse, subtle port/container cues in the background, clean visual hierarchy, no single product dominating, professional trade-show-meets-warehouse aesthetic, controlled natural light, realistic textures, restrained luxury corporate color grade, broad supply capability without looking generic. No text, no logos, no watermark, no readable labels, no people, no clutter, no cheap stock-photo feel.

## Nombres sugeridos de salida (WEBP)

- `products-charcoal-premium.webp`
- `products-charcoal-bulk.webp`
- `products-fruits-variety.webp`
- `products-vegetables-variety.webp`
- `products-avocado-export.webp`
- `products-mango-export.webp`
- `products-peppers-tomatoes.webp`
- `products-mixed-catalog.webp`

## Fallbacks sugeridos (PNG)

El componente `ProductGallery` usa `.webp` y fallback `.png`, así que si generás WEBP directamente conviene exportar copias PNG con los mismos nombres base:

- `products-charcoal-premium.png`
- `products-charcoal-bulk.png`
- `products-fruits-variety.png`
- `products-vegetables-variety.png`
- `products-avocado-export.png`
- `products-mango-export.png`
- `products-peppers-tomatoes.png`
- `products-mixed-catalog.png`

Guardalas en: `public/images/generated/products/`
