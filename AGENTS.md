# GlobalLift Next.js Agent Notes

## Typography Contract (Do Not Break)

- Primary/body font: `Onest`
- Display/headings font: `Onest` (to match current Vite production rendering exactly)
- Mono font: `JetBrains Mono`

## Source of Truth

- Load fonts only in `src/app/layout.tsx` using `next/font/google`.
- Use CSS variables in all styling layers:
  - `styles/globals.css`
  - `tailwind.config.js`

## Forbidden Patterns

- Do not import `Archivo Semi Expanded` or `Archivo_Semi_Expanded` from `next/font/google`.
- Do not use `Archivo` as display font in this repo unless Vite production is updated and verified first.
- Do not hardcode font names in Tailwind config when variable-based fonts are in use.
- Do not mix Google Fonts `<link>` tags with `next/font` for these project fonts.

## Required Verification After Font Changes

1. Run `npm run lint`
2. Run `npm run typecheck`
3. Confirm `src/app/layout.tsx`, `styles/globals.css`, and `tailwind.config.js` stay aligned on:
   - `--font-onest`
   - `--font-jetbrains-mono`
