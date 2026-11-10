# Decisions

Judgement calls made while the spec was ambiguous. Each entry records what was
chosen and why, so the owner can revisit it.

## Stack and scaffold

- **Manual scaffold instead of `create-next-app`.** The folder already contains
  the project briefs and a git history; a generator would overwrite them. The
  resulting setup is a plain Next.js 16 (App Router) + React 19 + TypeScript +
  Tailwind CSS 4 project managed with pnpm.
- **Tailwind CSS v4 with `@theme inline`.** The design tokens stay as CSS
  variables (as `DESIGN.md` requires) and are exposed to Tailwind utilities
  (`bg-bg`, `text-ink`, `border-line`, `text-gold`).
- **TypeScript pinned to 5.9.** TypeScript 7 is available but the Next.js
  toolchain and ESLint plugins are validated against 5.x; the type-checking
  benefit of 7 is not worth the build risk for this site.

## Content

- **Featured project name is `AnytimeDesk`.** `CONTENT.md` provides only the
  domain `anytimedesk.in`. The display name is a casing of that domain, not new
  information. The route stays `/work/anytimedesk`.
- **All unsupplied values are placeholders, including optional ones.** Social
  links, photo, resume and screenshots use `{{TODO...}}` strings rather than
  `null` so `pnpm placeholders` can list every open item. Rendering helpers
  detect placeholders and avoid emitting dead links or broken images.
- **One source of truth for handles.** GitHub and LeetCode usernames are
  declared once as top-level constants and referenced from both `profile` and
  `stats`, so the owner only fills each username once.
- **Placeholder entries exist in list sections.** One or two placeholder rows
  per list keep the layout honest and show where content goes. They are clearly
  marked and tracked; the merged-PR count is computed from whatever rows exist.
- **Open source rows are labelled pull requests, not merged PRs.** The supplied
  facts confirm that the two YUI PRs were submitted, not that they were merged.
  The data field `mergedAt` remains for the date, but no UI copy claims a merge
  until the owner confirms the status.
- **Optional hero audio is `null`.** No direct audio file was supplied, so the
  hero play button is implemented but not rendered. Set `heroTrack` in
  `src/content/site.ts` to enable it. Nothing ever autoplays.

## Behaviour

- **Build log "view all" expands inline.** The spec asks for a "view all" when
  there are more than five entries but defines no extra page. Expanding in place
  keeps the single-page structure and adds no route.
- **Placeholder values render as muted TODO text in production.** Development
  shows the raw value with a dashed gold outline as required. Production strips
  the braces so the page still reads as intentional, and the build warns.
- **No film-grain overlay.** `DESIGN.md` makes it optional and warns about
  performance. Skipping a fixed full-viewport texture protects Lighthouse scores.
- **GitHub/LeetCode failures are silent.** Failures are caught, logged only in
  development, and replaced with neutral states. The build never depends on
  either network call.
- **Images stay local or YouTube-only.** Next/Image remote patterns are limited
  to `i.ytimg.com` for video thumbnails. Screenshots and the optional photo are
  local files under `public/`.

## Design audit before the redesign

Screenshots were taken at 1440 and 390 with the real content in place. The
problems, worst first:

1. **The hero has no composition.** Everything sits in one left column; the
   right 60% of the first screen is empty. The name is big, but nothing anchors
   the other side, so the page looks unfinished.
2. **Every section header is the same.** A tiny mono label, a 2rem serif title
   and a muted intro, all full width. There is no label column and no hierarchy
   between a major section and a project.
3. **Nothing uses the grid.** The shell is 1080px wide, but every section is a
   centered single column. That is what makes it read like a template.
4. **Type contrast is weak below the hero.** 11px labels and 14px body text sit
   too close together; section titles are barely larger than project titles.
5. **Gold is wallpaper.** The same dot and 24px hairline appear in every section,
   so the accent never actually highlights anything.
6. **Placeholder media is the loudest thing on the page.** A full 16:9 Loom frame
   and three YouTube frames are the biggest shapes on screen and contain nothing.
7. **Placeholder-only lists look broken.** Shipped, Sound and Build log render
   fake rows and TODO text, so those sections read as unfinished instead of
   intentionally quiet.
8. **The featured project buries its facts.** Role and stack are small tags, the
   spec is scattered, and the case study link disappears at the card footer.
9. **Open source and earlier work read like admin tables.** No PR numbers, no
   scan anchors, almost no hover feedback; the eye has nothing to land on.
10. **There is no closing or texture.** About and Contact reuse the header-plus-
    paragraph pattern; the page ends without a statement, and there is no scroll
    cue, local detail or surface variation anywhere.

## SEO and polish

- **One metadata module builds every canonical, OG and Twitter value.** It reads
  `NEXT_PUBLIC_SITE_URL` and falls back to `http://localhost:3000` in local
  development. Placeholder names and taglines never leak into metadata: they
  become `Portfolio` and `A personal portfolio.` until filled. The case study
  page sets an absolute title so the root title template does not stack.
- **The OG image uses the runtime's default sans, not a downloaded serif.** The
  spec only asks for black, a gold hairline, name and tagline. Fetching the
  Instrument Serif file inside the image route would add a network dependency to
  a page that must never fail; the system-font version renders reliably.
- **The 404 page is a real route with `noindex`.** It shares the site shell so a
  mistyped URL still feels like the same site, and it points back to the work.
- **Nav anchors are route-aware.** On `/` the nav uses `#section` links; on the
  case study page it uses `/#section`, so links work from both pages. Active
  tracking only runs on the home page, where those sections exist.
- **`content-visibility` was rejected after testing.** It raised a synthetic
  Lighthouse mobile run to 99, but offscreen `contain-intrinsic-size`
  estimates made anchor jumps land above the target and made the active-nav
  calculation wrong. Native scroll accuracy matters more than the score.
- **Lighthouse, production build, mobile preset:** the final run scored
  Performance 99, Accessibility 100, Best Practices 100, SEO 100, with LCP
  0.8 s and CLS 0. Total blocking time (Next/React hydration) is the only
  variable metric and earlier runs ranged 90 to 99. Re-run after real images
  and content are added; image weight is the main thing the owner controls.

