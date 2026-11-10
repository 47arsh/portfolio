# Public assets

Drop owner-supplied files here, then point `src/content/site.ts` at them.

| File | Used by | Content path |
| --- | --- | --- |
| `resume.pdf` | About / Contact download link | `profile.resumeUrl` |
| `images/photo.jpg` | About portrait (optional) | `profile.photo` |
| `images/anytimedesk-1.png` | Featured project screenshot | `featured.screenshots[0]` |
| `images/anytimedesk-2.png` | Featured project screenshot | `featured.screenshots[1]` |

The site detects `{{TODO_URL: ...}}` values, so nothing breaks while these files
are missing. Placeholder screenshots render a quiet frame in development, the
photo slot is hidden in production, and the resume link only appears once a real
path is set.
