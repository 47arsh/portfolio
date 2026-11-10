# AGENTS.md — Rules for building this portfolio

You are building a personal portfolio site for a student developer who also produces music. Read this file first and re-read it whenever unsure. Also read `SPEC.md`, `DESIGN.md` and `CONTENT.md` before writing code.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Deploy target: Vercel
- Package manager: pnpm
- No heavy UI kits. Small, hand-built components. Lightweight animation only (CSS transitions, or `motion` sparingly).

## Non-negotiable rules

### 1. Never invent personal content
- Do NOT make up projects, stats, testimonials, user numbers, bios, links, dates or PR details.
- Anything personal that you do not have in `CONTENT.md` must be a visible placeholder (see below).
- No lorem ipsum. Placeholders must say what the user should write.

### 2. Placeholder convention (so the owner always knows where to put their own stuff)
- All personal content lives in ONE place: `src/content/site.ts` (typed). Components read from it and never hardcode personal text.
- Every unfilled value uses this exact format: `"{{TODO: what to write here}}"`.
  Example: `tagline: "{{TODO: one-line pitch, max 12 words}}"`
- Every URL the owner must supply uses: `"{{TODO_URL: what this links to}}"`.
- Above each placeholder-heavy block in code, add a comment: `// TODO(owner): <what and where to get it>`.
- Create and maintain `PLACEHOLDERS.md` at the repo root: a checklist of every placeholder, with file path, field name and what to provide. Regenerate it with the script `pnpm placeholders` (write a small node script that greps for `{{TODO`). Update it in every phase.
- In development only, render unfilled placeholders with a subtle dashed gold outline so they are easy to spot. In production builds, `pnpm build` must print a warning listing unfilled placeholders (do not fail the build).
- Any integration needing secrets (GitHub token etc.) must be documented in `.env.example` with comments. Never commit real secrets.

### 3. Git discipline (many small commits)
- Initialise git at the very start if not already.
- Make small, atomic commits, one logical change each. Target 30 or more commits across the build. Never one giant commit.
- Use Conventional Commits: `feat:`, `fix:`, `style:`, `refactor:`, `chore:`, `docs:`, `perf:`, `a11y:`.
- Commit messages: imperative, specific, under 72 chars for the subject. Add a body when the why isn't obvious.
- Commit after each component, each section, each integration, each meaningful style pass.
- After each phase in `SPEC.md`, make sure the app builds (`pnpm build`) and lints before moving on.
- Do not push, force-push, or rewrite history. Do not add remotes. The owner will connect GitHub.

### 4. Quality bar
- Mobile-first. Must look excellent at 360px width.
- Lighthouse targets: Performance 95+, Accessibility 95+, Best Practices 95+, SEO 100.
- Semantic HTML, visible focus states, `prefers-reduced-motion` respected, sufficient contrast.
- No layout shift. Use `next/font` and `next/image`.
- No autoplaying audio or video, ever.

### 5. Design discipline
- Follow `DESIGN.md` exactly. Gold is an accent, never a fill or gradient. When in doubt, use less gold.

### 6. Communication
- When a phase finishes, summarise in 3 to 5 lines: what was built, what commits were made, what the owner must fill in next.
- If something in the spec is ambiguous, pick the simplest option, note the decision in `DECISIONS.md`, and continue. Don't stop to ask unless blocked.
