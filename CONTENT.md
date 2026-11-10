# CONTENT.md — Owner fill-in sheet

Fill what you can below, then hand this to the agent. Anything left empty becomes a `{{TODO}}` placeholder in `src/content/site.ts` and is tracked in `PLACEHOLDERS.md`. You can also skip this file and edit `src/content/site.ts` directly later.

Rule for the agent: use ONLY what is written here. Do not invent or embellish. Empty means placeholder.

---

## Profile
- Name:
- Tagline (max 12 words, what you build):
- "Currently building" status line:
- Location (optional):
- Email:
- Bio (3 to 4 lines, plain and honest):
- Photo (path or leave empty):
- Resume PDF (will live at /public/resume.pdf):

## Socials
- GitHub username:
- X handle:
- LinkedIn URL:
- LeetCode username:
- YouTube channel URL:

## Featured: anytimedesk.in
- URL: https://anytimedesk.in
- One-liner:
- The problem it solves (2 to 3 sentences):
- What I built (2 to 3 sentences):
- Stack tags:
- Real numbers (only if true, e.g. users, businesses, messages handled):
- Loom demo URL:
- Screenshots (file paths):
- What I'd do differently (1 to 2 sentences):

## Shipped (micro-tools and smaller projects)
Repeat per item.
- Title:
- One-liner:
- Stack:
- Link:
- Month and year:

## Open source (merged PRs)
Repeat per PR.
- Project name:
- Project URL:
- What the change did (1 sentence):
- PR URL:
- Merge date:
- Feature this one? (yes/no):
- What I learned from review (only if featured):

## Sound (best remixes, 3 to 4)
Repeat per track.
- Title:
- One-line note:
- YouTube URL:
- Pick ONE for the optional hero play button? (yes/no, needs a direct audio file or is skipped):

## Build log (dated entries)
Repeat per entry.
- Date:
- One or two lines:
- Link (optional):

## Earlier work (college projects, only decent ones)
Repeat per item.
- Title:
- One-liner:
- Link:

## Stats fallbacks (used if live fetch fails)
- LeetCode solved:
- LeetCode current streak:

## Environment (do not paste secrets here, use .env)
- Site URL for production (e.g. https://yourname.dev):
- GitHub token: add `GITHUB_TOKEN` to `.env.local` (read-only, no scopes needed for public contributions)
