# Personal portfolio

A minimal, single-page portfolio for a student developer and music producer.
Built with Next.js (App Router), TypeScript and Tailwind CSS. Dark only, with a
restrained black-and-gold design system.

All personal content lives in one typed file: [`src/content/site.ts`](src/content/site.ts).
Anything not supplied yet is a visible `{{TODO: ...}}` placeholder and is tracked
in [`PLACEHOLDERS.md`](PLACEHOLDERS.md).

## Quick start

Requires Node.js 20.9+ and pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build. Warns about unfilled placeholders, never fails on them |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript without emitting |
| `pnpm placeholders` | Regenerate `PLACEHOLDERS.md` from `src/content/site.ts` |

## Fill in your content

Everything personal is in `src/content/site.ts`, typed by
`src/content/types.ts`. Components read from it and never hardcode personal text,
so this is the only file you need to edit for copy, links and dates.

1. Replace every `{{TODO: ...}}` text value with real content.
2. Replace every `{{TODO_URL: ...}}` value with a real URL or local path.
3. Add files under `public/` and point the matching field at them:
   - `public/resume.pdf` → `profile.resumeUrl`
   - `public/images/photo.jpg` → `profile.photo` (optional)
   - `public/images/anytimedesk-1.png`, `anytimedesk-2.png` → `featured.screenshots`
   - optional hero audio → `heroTrack` (see below)
4. Run `pnpm placeholders` to refresh the checklist.
5. Run `pnpm dev` and check every section at a narrow width.

### Where fields appear

| Content | Fields | Shown in |
| --- | --- | --- |
| Identity | `profile.name`, `tagline`, `status` | Nav, hero, footer, page metadata |
| Bio | `profile.bio[]`, `location`, `photo` | About |
| Contact | `profile.email`, `socials` | Hero, contact, footer |
| Featured project | `featured.*` | Featured card and `/work/anytimedesk` |
| Smaller tools | `shipped[]` | Shipped list |
| Open source PRs | `openSource[]` (`featured`, `learned`) | Open source and activity count |
| Music | `tracks[]` | Sound |
| Dates and notes | `log[]` | Build log (newest first) |
| College projects | `earlier[]` | Earlier work |
| Stats fallback | `stats.leetcode.solved`, `streak` | Activity strip when LeetCode is unreachable |

### Placeholder rules

- In development, unfilled values get a dashed gold outline and the instruction
  stays visible.
- In production, braces are stripped and the text renders muted, so the site
  still reads calmly. `pnpm build` prints a warning listing every open item.
- Links whose URL is still a placeholder render as plain text, never as dead
  links. Screenshots without a file show a quiet frame in development; the photo
  slot is hidden in production.
- Optional sections stay out of the way until they have content. Empty any list
  (`shipped`, `openSource`, `tracks`, `log`, `earlier`) to hide that section.
  Set `featured.metrics` to `[]` to remove the numbers row.
- `heroTrack` is `null` by default. Set it to `{ title, audioUrl }` with a file
  in `public/audio/` to show an opt-in play button. Nothing ever autoplays.
- If LeetCode cannot be reached, the strip uses `stats.leetcode.solved` and
  `streak`; leave both `null` to show an em dash instead.

Do not add invented projects, stats, dates or testimonials. If a number is not
true, remove the row.

## Environment

Copy `.env.example` to `.env.local` for local work. `.env.local` is ignored by
git; never commit real secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin used by metadata, sitemap, robots and OG tags. Falls back to `http://localhost:3000` |
| `GITHUB_TOKEN` | Optional | Read-only token for the contribution graph. Without it, the graph shows a quiet empty state |

LeetCode stats use the public GraphQL endpoint and the username in the content
file. Both integrations fail silently and never block a build or page render.

## Deploy to Vercel

1. Create a GitHub repository and push this project (next section).
2. Go to <https://vercel.com/new> and import the repository.
3. Keep the detected settings: framework **Next.js**, install **pnpm install**,
   build **pnpm build**, output handled by Next.js.
4. Add environment variables for Production (and Preview if you want):
   - `NEXT_PUBLIC_SITE_URL` = your live origin, e.g. `https://example.com`
     (no trailing slash)
   - `GITHUB_TOKEN` = optional token
5. Deploy. Add your custom domain under **Settings → Domains**, then update
   `NEXT_PUBLIC_SITE_URL` if the domain changed and redeploy.

The public URL affects canonical URLs, `sitemap.xml`, `robots.txt` and the
generated OG image, so set it before sharing the link.

## Push to GitHub

This working copy already has a local git history. Check what remote it uses:

```bash
git remote -v
```

- If `origin` already points at your repository, push:

  ```bash
  git branch -M main
  git push -u origin main
  ```

- If `origin` is missing, create an **empty** repository on GitHub (no README,
  no `.gitignore`) and connect it:

  ```bash
  git remote add origin https://github.com/<your-username>/<repo-name>.git
  git branch -M main
  git push -u origin main
  ```

- If `origin` points somewhere else, update it with
  `git remote set-url origin <correct-url>`.

Use the SSH URL instead if you prefer: `git@github.com:<your-username>/<repo-name>.git`.
Nothing is pushed automatically; review `git log --oneline` first if you want to
see the commit history.

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

The production build was checked with Lighthouse (mobile preset): Performance
99, Accessibility 100, Best Practices 100, SEO 100, LCP 0.8 s, CLS 0. Re-run it
after adding real images; image weight is the main remaining variable. The site
uses no autoplaying audio or video, ships `prefers-reduced-motion` fallbacks and
keeps focus states visible.

## Structure

```text
src/
  app/           App Router pages, metadata, OG image, sitemap, robots, 404
  components/    Small hand-built UI components
  content/       Typed site content and types
  lib/           GitHub, LeetCode, formatting, metadata and placeholder helpers
scripts/         Placeholder tracker
public/          Resume, images and optional audio
```

Design and content rules live in `AGENTS.md`, `SPEC.md`, `DESIGN.md` and
`CONTENT.md`. Judgement calls are recorded in `DECISIONS.md`.
