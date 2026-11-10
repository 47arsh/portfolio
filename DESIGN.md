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
| `--hero-warmth` | `rgba(200,162,77,0.06)` | single radial warmth behind the hero (see exception) |
| `--surface-raised` | `#161618` | browser chrome, media frames |
| `--border-strong` | `#303034` | link underlines, hover hairlines |

### Gold rules
- Allowed: hairlines (1px), link underlines, small icons and arrows, play buttons, one key number or metric, active nav indicator, the waveform line, focus ring, the scroll-progress line.
- Forbidden: gold backgrounds, gold gradients, gold text for body copy or long headings, glows or heavy shadows, gold borders around big cards.
- Max roughly 5 to 8 gold touches visible in any one viewport.

### The one gold exception
A single, almost invisible radial warmth sits behind the hero: `--hero-warmth` at 6% opacity, fading to transparent. It is the only gold wash on the site and must never exceed 6% or appear anywhere else.

## Typography (via `next/font`)
- Headings and name: a refined serif. First choice **Instrument Serif**, fallback **Fraunces**. Large, tight tracking (-0.02em), regular weight.
- Body: **Inter** (or Geist), 16 to 17px, line-height 1.65, colour `--text` at about 90%.
- Labels, dates, tags: **Geist Mono** or JetBrains Mono, 10.5px, uppercase, letter-spacing 0.14em, colour `--muted`.
- Scale: hero name `clamp(4.1rem, 11.4vw, 9.75rem)` at line-height 0.84 and tracking -0.045em; section titles `clamp(2.35rem, 4.6vw, 3.6rem)` at -0.03em; feature names and figures use the serif at display sizes; intro copy `--lead` `clamp(1.0625rem, 0.95rem + 0.6vw, 1.3125rem)`.
- Contrast comes from size and serif/sans/mono pairing, not from extra weights. Only two body sizes are used.

## Layout and spacing
- Max content width 1200px (`--shell`), centred, gutters 20px mobile / 40px tablet / 56px desktop.
- Sticky nav is 72px tall (`--nav-h`); anchor scroll offset is nav + 32px.
- Vertical rhythm: sections 88px mobile / 136px tablet / 152px desktop. Sections that render only a placeholder collapse to the dense rhythm: 48px / 72px.
- Section label column: 148px at md, 168px at lg, sticky under the nav; content sits in a single flexible column to its right. Section number in `--text`, label in `--muted`, both mono, preceded by a 24px gold hairline.
- Thin 1px `--border` dividers separate sections and rows. No boxed cards for lists.
- One consistent corner radius: 4px for media and frames, 999px for pills and buttons.
- Lists beat grids for Work, Shipped, Open source and Sound.
- The featured project is the only large framed surface, presented in a browser frame over `--surface-raised`.

## Components
- **Links**: off-white, 1px underline in `--border`; on hover underline turns `--gold` and text lightens slightly.
- **Buttons**: pill, 1px border `--border`, text `--text`; hover border `--gold`. No filled gold buttons. Optionally one primary pill with `--text` background and `--bg` text (inverted), never gold.
- **Tags** (stack): mono, tiny, `--muted`, 1px border, pill.
- **Rows** (Shipped, Open source, Earlier): grid with number, serif title, one-liner, mono meta; hover moves the title and arrow toward gold by 4px. No background change.
- **Playlist rows** (Sound): index, serif title, note, tiny static waveform glyph; the YouTube thumbnail fades in on hover on desktop and stays inline on mobile. Click loads the nocookie embed inline; never autoplay.
- **Build log**: dates in the mono left column, entries right, joined by a 1px gold/20 vertical line with 5px gold dots.
- **Play button**: 56px circle on the Loom facade, 1px gold border, gold triangle; hover fills `--gold-dim`.
- **Waveform**: thin SVG bars in `--gold` at 40 to 45% opacity, once in the hero. Slow idle drift, faster pulse on hover, static under reduced motion.
- **Activity strip**: four-step gold ramp from `--border` to `--gold`; solved count in gold, rating and PR count in off-white.
- **Empty states**: a quiet mono label, a plain-language note and a 1px top rule. In development only, the rule is dashed gold (`--gold-dim`) and labelled TODO; production keeps the neutral rule.
- **Placeholder (dev only)**: dashed 1px `--gold-dim` outline with a tiny mono "TODO" label.
- **Scroll progress**: a 2px gold line fixed to the very top, scaled by scroll position.

## Motion
- Hero name: each line rises out of a mask once, 600ms, staggered 90ms, ease `cubic-bezier(0.22, 1, 0.36, 1)`.
- Section reveal: fade + 14px upward translate, 500ms, once, on intersection.
- Hover and focus transitions 150 to 250ms. The status dot pulses over 3.2s.
- Ambient loops (waveform drift, status pulse, scroll cue) begin only after the first pointer, wheel or key interaction. Until then the hero is still, so the first paint costs no animation frames.
- No parallax, no cursor effects, no particle backgrounds, no scroll-jacking.
- Respect `prefers-reduced-motion`: mask reveal, drift, pulse and reveals collapse to static.

## Background texture
- Faint film grain at roughly 4.5% intrinsic opacity, painted into the page background and repeated at 200px. It is intentionally not a fixed overlay: a full-viewport fixed layer forced the page to re-raster on every animation frame and cost several seconds of main-thread time.
- No gradients except the single 6% radial hero warmth described above.

## Imagery
- Screenshots sit in a browser frame at 4px radius; 1px `--border`. No zoom effects.
- Missing media renders as a quiet dot-grid frame with a mono note, not a loud 16:9 void.
- Profile photo (if used): grayscale, soft 4/5 frame.
- Track thumbnails come from YouTube at 16:9; they fade in on row hover rather than sitting in cards.

## Accessibility
- Body text contrast above 7:1 on `--bg`. Muted text at least 4.5:1.
- Gold on `--bg` is for decorative or large elements, and underlines. Do not rely on gold alone to convey meaning.
- Focus ring: 2px `--gold`, 3px offset, always visible.

## Don'ts
No emojis in UI. No stock illustrations. No "glassmorphism" cards. No neon. No gradient text. No generic "Hi, I'm ..." hero greeting unless the owner writes it.
