# SPEC.md — Portfolio site

## Goal
A minimal, beautiful, single-page portfolio for a student developer who ships products, solves problems on LeetCode, contributes to open source, and produces music. It should make a small body of work feel curated and real, and load instantly on a phone.

## Page structure (single scrolling page, anchored sections)

1. **Nav** — name/logo mark left, anchor links right (Work, Open source, Sound, Log, Contact). On mobile, a simple compact menu. Sticky with subtle blur on scroll.
2. **Hero** — large name in serif, one-line pitch, a small "currently building" status line (from content), two links (Email, GitHub). Optional tiny opt-in play button that plays one chosen track (no autoplay). Subtle thin waveform line as an accent.
3. **Featured project: anytimedesk.in** — a case-study card, bigger than the others. Fields: name, URL, one-line description, problem, what I built, stack tags, key numbers (users/messages/etc., only if provided), a demo video embed (Loom, click-to-load facade), 1 to 2 screenshots, "what I'd do differently". Link to a full case study page `/work/anytimedesk` (build this page as well, same design).
4. **Shipped** — list of micro-tools / smaller projects. Each row: title, one-line description, stack, link, month/year. Rendered as a clean list with thin dividers, not heavy cards. Hover reveals a gold arrow.
5. **Open source** — merged PRs. Each row: project name, one-sentence description of the change, PR link, merge date. Best 1 or 2 can be flagged `featured: true` and get a larger treatment with a "what I learned" line. Show a count summary (e.g. "N merged PRs across M projects") computed from the data.
6. **Activity strip** — one slim strip combining: GitHub contribution graph (last ~6 months, compact), LeetCode solved count + streak, merged PR count. Small and quiet, not a full section.
7. **Sound** — 3 to 4 remixes. Each: title, one-line note, YouTube link. Use a click-to-load YouTube facade (thumbnail + gold play button; only loads the iframe on click). Include a link to the full channel.
8. **Build log** — short dated feed (date, one or two lines, optional link). Reads from content, newest first. Show latest 5, with a "view all" if more.
9. **Earlier work** — a tiny, understated list of college projects (title + one line + link). Hidden automatically if the list is empty.
10. **About + Contact** — short bio (3 to 4 lines), photo optional (placeholder, circular crop or none), email, X, GitHub, LinkedIn, LeetCode. A "Download resume" link (PDF placeholder at `/public/resume.pdf`, hidden if missing).
11. **Footer** — name, year, small "built with" line, back to top.

## Extra pages
- `/work/anytimedesk` — case study page.
- `not-found` page, styled to match.
- `robots.txt`, `sitemap.xml`, OG image (generate with `next/og`, black background, gold hairline, name and tagline).

## Data model
All content in `src/content/site.ts`, typed in `src/content/types.ts`:

- `profile`: name, tagline, status, bio[], email, location, photo, resumeUrl, socials{github, x, linkedin, leetcode, youtube}
- `featured`: name, url, oneLiner, problem, built, stack[], metrics[{label,value}], demoVideoUrl, screenshots[], learned
- `shipped[]`: title, description, stack[], url, date
- `openSource[]`: project, projectUrl, description, prUrl, mergedAt, featured?, learned?
- `tracks[]`: title, note, youtubeUrl
- `log[]`: date, text, url?
- `earlier[]`: title, description, url?
- `stats`: manual fallbacks `leetcode{solved, streak}`, `github{username}`

## Integrations (all must fail gracefully)
- **GitHub contributions**: fetch server-side using GitHub GraphQL with `GITHUB_TOKEN` (optional, in `.env`). Cache with `revalidate` of 6 hours. If no token or request fails, render a clean empty/neutral state or hide the graph (never an error).
- **LeetCode**: fetch public stats server-side from LeetCode's public GraphQL endpoint using the username from content, cache 6 hours. On failure, fall back to manual numbers in `stats`. If neither exists, show placeholders.
- **YouTube**: no API. Derive thumbnail from video ID. Click-to-load iframe via `youtube-nocookie.com`.
- **Loom**: click-to-load facade as well.

## Behaviour details
- Smooth scroll, with scroll offset for the sticky nav.
- Fade-up on scroll for sections, via IntersectionObserver or CSS only, 400ms max, disabled under `prefers-reduced-motion`.
- Active section highlight in nav (gold underline).
- Keyboard accessible everywhere. Skip-to-content link.
- Metadata: title, description, OG, Twitter card, canonical (placeholder domain via env `NEXT_PUBLIC_SITE_URL`).

## Folder structure
```
src/
  app/ (layout, page, work/anytimedesk/page, not-found, sitemap, robots, opengraph-image)
  components/ (Nav, Hero, FeaturedProject, ShippedList, OpenSource, ActivityStrip, Sound, TrackCard, YouTubeFacade, LoomFacade, BuildLog, Earlier, About, Contact, Footer, Waveform, Reveal, Placeholder)
  content/ (site.ts, types.ts)
  lib/ (github.ts, leetcode.ts, placeholders.ts, format.ts)
scripts/ (placeholders.mjs)
public/ (resume.pdf placeholder note, images)
```

## Build phases (commit as you go, see AGENTS.md)

**Phase 0: Setup** (about 4 commits)
Init repo, scaffold Next.js + TS + Tailwind + pnpm, add fonts and design tokens, add `.env.example`, `.gitignore`, base README.

**Phase 1: Content layer** (about 4 commits)
Types, `site.ts` full of placeholders, `Placeholder` helper (dev outline), `scripts/placeholders.mjs`, first `PLACEHOLDERS.md`.

**Phase 2: Layout and static sections** (about 10 commits)
Layout, Nav, Hero, Featured, Shipped, Open source, Earlier, About, Contact, Footer. One commit per section.

**Phase 3: Media** (about 5 commits)
YouTube facade, Loom facade, Sound section, Waveform accent, optional hero play button.

**Phase 4: Integrations** (about 4 commits)
GitHub contributions, LeetCode, Activity strip, graceful fallbacks.

**Phase 5: Build log and case study page** (about 3 commits)

**Phase 6: Polish** (about 6 commits)
Motion, responsive pass at 360/390/768/1280, a11y pass, SEO and OG, 404, performance pass, Lighthouse notes in `DECISIONS.md`.

**Phase 7: Handoff** (about 2 commits)
Final `PLACEHOLDERS.md`, README with: how to fill content, env setup, how to deploy to Vercel, how to connect the GitHub remote.

## Definition of done
- `pnpm build` and `pnpm lint` pass.
- Site renders fully with placeholders and looks intentional, not broken.
- `PLACEHOLDERS.md` is complete and accurate.
- 30 or more clean, atomic commits with conventional messages.
