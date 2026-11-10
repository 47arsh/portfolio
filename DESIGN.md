# DESIGN.md — Black and gold, restrained

## Principle
Quiet luxury, not casino. The page is mostly near-black and off-white. Gold appears only as small, deliberate accents. If a screen looks "gold-heavy", remove gold until it feels calm.

## Colour tokens (define as CSS variables, map in Tailwind)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0A0B` | page background (warm near-black, never pure #000) |
| `--surface` | `#111113` | cards, raised areas |
| `--border` | `#242427` | hairlines, dividers |
| `--text` | `#EDEBE6` | primary text (warm off-white) |
| `--muted` | `#8F8D87` | secondary text, dates, labels |
| `--gold` | `#C8A24D` | accent: links, play button, key numbers, active nav |
| `--gold-soft` | `#E2C57E` | hover state of gold |
| `--gold-dim` | `rgba(200,162,77,0.15)` | very subtle tints, focus rings, placeholder outline |

### Gold rules
- Allowed: hairlines (1px), link underlines, small icons and arrows, play buttons, one key number or metric, active nav indicator, the waveform line, focus ring.
- Forbidden: gold backgrounds, gold gradients, gold text for body copy or long headings, glows or heavy shadows, gold borders around big cards.
- Max roughly 5 to 8 gold touches visible in any one viewport.

## Typography (via `next/font`)
- Headings and name: a refined serif. First choice **Instrument Serif**, fallback **Fraunces**. Large, tight tracking (-0.02em), regular weight.
- Body: **Inter** (or Geist), 16 to 17px, line-height 1.65, colour `--text` at about 90%.
- Labels, dates, tags: **Geist Mono** or JetBrains Mono, 11 to 12px, uppercase, letter-spacing 0.08em, colour `--muted`.
- Scale: hero name `clamp(3rem, 9vw, 7rem)`; section titles `clamp(1.75rem, 4vw, 2.5rem)`; keep sizes few.

## Layout and spacing
- Max content width 1080px, centred, 24px side gutter on mobile, 48px on desktop.
- Vertical rhythm: sections separated by 120px (desktop) / 80px (mobile). Section label (mono, uppercase, muted) above each section title with a short 1px gold hairline (24px wide) before it.
- One consistent corner radius: 10px for cards, 999px for pills and buttons.
- Prefer thin dividers over boxed cards. Lists beat grids for Shipped and Open source.
- Featured project card is the only large raised surface (`--surface`, 1px `--border`).

## Components
- **Links**: off-white, 1px underline in `--border`; on hover underline turns `--gold` and text lightens slightly.
- **Buttons**: pill, 1px border `--border`, text `--text`; hover border `--gold`. No filled gold buttons. Optionally one primary pill with `--text` background and `--bg` text (inverted), never gold.
- **Tags** (stack): mono, tiny, `--muted`, 1px border, pill.
- **Rows** (Shipped, Open source): grid with title, description, meta; hover shifts a gold arrow in from the left by 4px. No background change.
- **Play button**: 44px circle, 1px gold border, gold triangle; hover fills `--gold-dim`.
- **Waveform**: thin SVG polyline or bars (1.5px stroke) in `--gold` at 40% opacity, used once in the hero and as an occasional section divider. Subtle, static by default; gentle animation only on hover and reduced-motion safe.
- **Activity strip**: contribution cells in a gold ramp from `--border` to `--gold` (4 levels). Small, rounded 2px cells.
- **Placeholder (dev only)**: dashed 1px `--gold-dim` outline with a tiny mono "TODO" label.

## Motion
- Section reveal: fade + 12px upward translate, 400ms, ease-out, once.
- Hover transitions 150 to 200ms.
- No parallax, no cursor effects, no particle backgrounds, no scroll-jacking.
- Respect `prefers-reduced-motion`: disable all of the above.

## Background texture
- Optional: a very faint film-grain or noise overlay at 2 to 3% opacity, fixed, pointer-events none. Skip if it hurts performance.
- No gradients except an almost invisible top vignette (`--surface` to transparent) behind the hero.

## Imagery
- Screenshots: 1px `--border`, 10px radius, slight dark overlay on hover removed (no zoom effects).
- Profile photo (if used): grayscale, circular or soft-rounded square, small.
- Thumbnails for tracks: from YouTube, with a dark overlay at 30% and the gold play icon.

## Accessibility
- Body text contrast above 7:1 on `--bg`. Muted text at least 4.5:1.
- Gold on `--bg` is for decorative or large elements, and underlines. Do not rely on gold alone to convey meaning.
- Focus ring: 2px `--gold`, 3px offset, always visible.

## Don'ts
No emojis in UI. No stock illustrations. No "glassmorphism" cards. No neon. No gradient text. No generic "Hi, I'm ..." hero greeting unless the owner writes it.
