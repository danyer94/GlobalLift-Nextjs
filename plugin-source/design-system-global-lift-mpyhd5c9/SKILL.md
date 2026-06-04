---
name: Global Lift
description: Premium B2B trade and logistics website for Dominican import, export, and sourcing operations.
colors:
  atlantic-navy: "#0f172a"
  signal-cyan: "#06b6d4"
  operational-teal: "#0598b6"
  violet-depth: "#7c3aed"
  porcelain-bg: "#f8fafc"
  graphite-text: "#475569"
  steel-line: "#d2e0ec"
typography:
  display:
    fontFamily: "var(--font-host-grotesk), var(--font-onest), system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "var(--font-host-grotesk), var(--font-onest), system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  body:
    fontFamily: "var(--font-onest), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.24em"
rounded:
  control: "0.12rem"
  surface: "1.125rem"
  panel: "1.5rem"
  feature: "1.75rem"
spacing:
  section: "clamp(5rem, 10vw, 8rem)"
  container-x: "clamp(1.5rem, 4vw, 3rem)"
  stack-sm: "0.75rem"
  stack-md: "1.5rem"
  stack-lg: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.operational-teal}"
    textColor: "{colors.porcelain-bg}"
    rounded: "{rounded.control}"
    padding: "0.95rem 1.4rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.porcelain-bg}"
    rounded: "{rounded.control}"
    padding: "0.95rem 1.4rem"
  card-institutional:
    backgroundColor: "{colors.porcelain-bg}"
    textColor: "{colors.atlantic-navy}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.5rem, 3vw, 2.5rem)"
---

# Design System: Global Lift

## 1. Overview

**Creative North Star: "The Trade Control Room"**

Global Lift should feel like a polished commercial operations room: precise, international, and quietly high stakes. The interface can be cinematic, but it must always return to business confidence. The dominant mood is deep Atlantic structure with controlled signal color, not decorative tech glow.

The system is brand-led because the website has to win trust before the first conversation. Every section should answer a business concern: what Global Lift does, how it coordinates work, why it can be trusted, what categories it can move, and how to start an operation.

It explicitly rejects generic logistics gradients, decorative glass everywhere, stock corporate filler, and identical card grids. Premium here means evidence, restraint, rhythm, and intentional materials.

**Key Characteristics:**

- Cinematic first impression with operational follow-through.
- Deep navy, cool steel, restrained cyan signal, and rare violet depth.
- Large display typography for authority, body copy with strong readability.
- Fewer but stronger surfaces. Glass is a signature material, not the default skin.
- Motion is smooth, composited, and useful for orientation.

## 2. Colors

The palette is an Atlantic trade palette: dark commercial authority, cool steel neutrals, and cyan used as an operational signal.

### Primary

- **Atlantic Navy**: The authority color for hero overlays, dark scenes, footer atmosphere, and high-contrast brand moments.
- **Signal Cyan**: The signal color for active states, highlights, routes, focus, and small moments of attention. It must not flood entire sections by default.

### Secondary

- **Operational Teal**: The primary action color for business CTAs and conversion moments.

### Tertiary

- **Violet Depth**: Atmospheric depth only. Use it in glows, background gradients, and cinematic accents, never as a main CTA color.

### Neutral

- **Porcelain Background**: The light page base and institutional surface.
- **Graphite Text**: Secondary copy and support text.
- **Steel Line**: Borders, dividers, and low-contrast structure.

### Named Rules

**The Signal Discipline Rule.** Cyan is a signal, not wallpaper. If every section glows, nothing feels important.

**The No Raw White Rule.** Do not add new raw white or pure black values. Tint neutrals through the existing porcelain, navy, and steel vocabulary.

## 3. Typography

**Display Font:** Host Grotesk with Plus Jakarta Sans fallback.
**Body Font:** Plus Jakarta Sans with system fallback.
**Label/Mono Font:** JetBrains Mono for short technical labels and compact metadata.

**Character:** The pairing is corporate, precise, and contemporary. Host Grotesk gives the hero and major section titles a sharper executive voice, while Plus Jakarta Sans keeps long copy calm and readable.

### Hierarchy

- **Display**: Large, tight, and cinematic. Use for Hero only or one-off dominant moments.
- **Headline**: Strong section titles such as Nosotros, Productos, Proceso, and Por qué elegirnos.
- **Title**: Component headings and form panel titles.
- **Body**: Paragraphs and business explanations. Keep readable line length between 65 and 75 characters.
- **Label**: Short metadata, eyebrows, and operational chips. Use sparingly. Repeating the same uppercase label pattern in every section weakens the brand.

### Named Rules

**The Badge Restraint Rule.** Mono labels are operational signals. Do not use them as decorative scaffolding above every block.

**The Display Scope Rule.** Host Grotesk is for hero and selected headlines. It must not take over body copy, badges, or utility text.

## 4. Elevation

The elevation system is a hybrid of tonal layering, tinted shadows, and selective glass. Depth should feel atmospheric, not plastic. Shadows are tinted toward navy or cyan. Heavy generic black shadows are forbidden.

### Shadow Vocabulary

- **Soft Lift**: Low ambient depth for calm institutional surfaces.
- **Signal Shadow**: Cyan-tinted emphasis for active controls or important visual nodes.
- **Premium Shadow**: Broad, soft, color-tinted depth for elevated panels and overlays.
- **Glass Shadow**: Used only with translucent control surfaces, drawers, and selective premium panels.

### Named Rules

**The Two-Material Rule.** A page region should use no more than two surface materials at once: solid institutional surface plus one glass or cinematic treatment.

**The Glass Earns Its Place Rule.** Glass is allowed for navigation, mobile drawer, controls, and selected hero or gallery moments. It is not the default answer for every box.

## 5. Components

### Buttons

- **Shape:** Sharp executive control with a slight radius.
- **Primary:** Operational teal background, porcelain text, compact but confident padding.
- **Hover / Focus:** Move with transform and color or shadow changes only. Always provide visible focus.
- **Secondary:** Transparent or dark-surface outline treatment. It must support the primary CTA, not compete with it.

### Chips

- **Style:** Small operational metadata with mono typography.
- **State:** Use for trust cues, product categories, route notes, and status. Avoid turning every paragraph into chips.

### Cards / Containers

- **Corner Style:** Large, calm radius for panels and feature containers.
- **Background:** Prefer solid porcelain or deep navy. Use glass only when it helps layer content over imagery or cinematic backgrounds.
- **Shadow Strategy:** Tinted and soft. Avoid hard drop shadows.
- **Border:** Fine steel lines or translucent light borders, never colored side stripes.
- **Internal Padding:** Generous for institutional panels, tighter for operational metadata.

### Inputs / Fields

- **Style:** Structured, businesslike, and readable. Inputs should look like part of an operation intake, not a generic contact widget.
- **Focus:** Cyan or teal focus ring with clear contrast.
- **Error / Disabled:** Error messages must include a next step. Disabled states should remain readable.

### Navigation

- **Style:** Logo first, clean links, executive CTA, and no pill-shell around the whole navigation. Mobile uses a controlled premium drawer with blur, focus management, and no horizontal overflow.

### Product Gallery

- **Style:** Cinematic 3D showcase, but imagery carries the section. No text overlay on cards.
- **Performance:** Reduce heavy effects on mobile and respect reduced motion. Avoid `transition-all`.

### Contact Intake

- **Style:** The closing section should feel like a commercial briefing. Ask for product, service type, volume, destination, and constraints when possible.

## 6. Do's and Don'ts

### Do:

- **Do** make every premium effect justify itself with clarity, trust, or memorability.
- **Do** expose trust proof early: compliance, transparency, structured process, and open catalog capability.
- **Do** keep cyan rare and purposeful.
- **Do** treat the contact form as an operation intake.
- **Do** preserve the typography contract: Plus Jakarta Sans body, Host Grotesk for hero and selected headlines, JetBrains Mono for compact labels.
- **Do** use imagery and map-like global cues to make trade feel real.

### Don't:

- **Don't** create generic AI logistics pages with blue gradients, glow everywhere, and interchangeable card grids.
- **Don't** use glassmorphism as the default material for every surface.
- **Don't** use gradient text.
- **Don't** use colored side-stripe borders on cards, lists, callouts, or alerts.
- **Don't** repeat uppercase mono labels above every section unless the repetition is part of a deliberate system.
- **Don't** use the hero metric template.
- **Don't** add raw `#000` or `#fff` values in new UI work.
- **Don't** animate layout properties or use `transition-all` in new interactive UI.

## Provenance

Formalized by Open Design from candidate ce23a95e-6668-4a19-a33a-31e60c1752af.
