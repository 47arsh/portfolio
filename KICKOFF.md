# KICKOFF.md — Paste this into your AI agent

Put `AGENTS.md`, `SPEC.md`, `DESIGN.md`, `CONTENT.md` in an empty project folder first. If your agent supports it, rename or copy `AGENTS.md` to the filename it auto-reads (e.g. `CLAUDE.md`).

---

**Prompt to paste:**

You are building my personal portfolio site. Before writing any code, read these four files in this folder in full and follow them exactly: `AGENTS.md` (rules), `SPEC.md` (what to build and in what phases), `DESIGN.md` (black and gold design system), `CONTENT.md` (my content, with blanks).

Key points you must not forget:
1. Work through the phases in `SPEC.md` in order. Make small, atomic Conventional Commits throughout, at least 30 in total. Never batch the work into a few big commits. Do not push or add a remote.
2. Never invent my personal content. Anything I haven't provided in `CONTENT.md` must be a `{{TODO: ...}}` placeholder in `src/content/site.ts`, with a `// TODO(owner)` comment where relevant. Keep `PLACEHOLDERS.md` updated via a `pnpm placeholders` script so I always know exactly where to add my own GitHub links, text, URLs and media.
3. Gold is an accent only. Follow `DESIGN.md` strictly. Minimal, calm, premium. Dark-only.
4. Everything that depends on a network call or secret (GitHub contributions, LeetCode stats) must fail gracefully and be documented in `.env.example`.
5. No autoplaying audio or video.
6. After each phase, run `pnpm build` and `pnpm lint`, fix issues, then give me a 3 to 5 line summary: what was built, which commits were made, and what I need to fill in next.

Start with Phase 0 now. Don't ask me questions unless you are truly blocked. Record any judgement calls in `DECISIONS.md`.

---

**After the build finishes, you do this:**
1. Open `PLACEHOLDERS.md` and fill in each item (or fill `src/content/site.ts` directly).
2. Add `GITHUB_TOKEN` to `.env.local` for the contribution graph.
3. Drop screenshots and your resume PDF into `/public`.
4. Create the GitHub repo, then add the remote and push yourself.
5. Deploy to Vercel and set `NEXT_PUBLIC_SITE_URL`.
