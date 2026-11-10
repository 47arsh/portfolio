import type { SiteContent } from "./types";

// TODO(owner): This is the only file with personal content. Replace every
// {{TODO: ...}} and {{TODO_URL: ...}} value with real information. Run
// `pnpm placeholders` to generate the checklist, and `pnpm dev` to preview.
// Never add invented stats, links or dates.

// TODO(owner): Fill these once; both the links and the stats integrations read
// from them.
const githubUsername = "{{TODO: GitHub username}}";
const leetcodeUsername = "{{TODO: LeetCode username}}";

export const site: SiteContent = {
  profile: {
    name: "{{TODO: full name}}",
    tagline: "{{TODO: one-line pitch, max 12 words}}",
    status: "{{TODO: currently building — one short line}}",
    location: "{{TODO: city, country — optional}}",
    email: "{{TODO: email address}}",
    bio: [
      "{{TODO: bio line 1 — who you are, plainly}}",
      "{{TODO: bio line 2 — what you are studying or building}}",
      "{{TODO: bio line 3 — open source, LeetCode or music}}",
      "{{TODO: bio line 4 — what you want to do next}}",
    ],
    photo: "{{TODO_URL: /images/photo.jpg — optional, add a photo to public/images}}",
    resumeUrl: "{{TODO_URL: /resume.pdf — add your PDF to public}}",
    socials: {
      github: githubUsername,
      x: "{{TODO: X handle, without the @}}",
      linkedin: "{{TODO_URL: full LinkedIn profile URL}}",
      leetcode: leetcodeUsername,
      youtube: "{{TODO_URL: full YouTube channel URL}}",
    },
  },

  featured: {
    name: "AnytimeDesk",
    slug: "anytimedesk",
    url: "https://anytimedesk.in",
    oneLiner: "{{TODO: one-line description of anytimedesk.in}}",
    problem: "{{TODO: 2 to 3 sentences on the problem it solves}}",
    built: "{{TODO: 2 to 3 sentences on what you built}}",
    stack: [
      "{{TODO: stack tag 1, e.g. Next.js}}",
      "{{TODO: stack tag 2}}",
      "{{TODO: stack tag 3}}",
    ],
    metrics: [
      {
        label: "{{TODO: metric label, only if true}}",
        value: "{{TODO: value}}",
      },
    ],
    demoVideoUrl: "{{TODO_URL: Loom share URL for the demo video}}",
    screenshots: [
      "{{TODO_URL: /images/anytimedesk-1.png — add the screenshot to public/images}}",
      "{{TODO_URL: /images/anytimedesk-2.png — add the screenshot to public/images}}",
    ],
    learned: "{{TODO: 1 to 2 sentences on what you would do differently}}",
  },

  // TODO(owner): Replace with your micro-tools, best first. Add or remove rows.
  shipped: [
    {
      title: "{{TODO: project 1 title}}",
      description: "{{TODO: one-line description of project 1}}",
      stack: ["{{TODO: stack for project 1}}"],
      url: "{{TODO_URL: live project or repository link for project 1}}",
      date: "{{TODO: month year for project 1}}",
    },
    {
      title: "{{TODO: project 2 title}}",
      description: "{{TODO: one-line description of project 2}}",
      stack: ["{{TODO: stack for project 2}}"],
      url: "{{TODO_URL: live project or repository link for project 2}}",
      date: "{{TODO: month year for project 2}}",
    },
  ],

  // TODO(owner): Merged PRs only, newest first. Mark the best one or two with
  // featured: true and write the `learned` line. Add or remove entries freely.
  openSource: [
    {
      project: "{{TODO: project 1 name}}",
      projectUrl: "{{TODO_URL: repository URL for project 1}}",
      description: "{{TODO: one sentence on the change in project 1}}",
      prUrl: "{{TODO_URL: PR URL for project 1}}",
      mergedAt: "{{TODO: month year for project 1}}",
      featured: true,
      learned: "{{TODO: what the review of project 1 taught you}}",
    },
    {
      project: "{{TODO: project 2 name}}",
      projectUrl: "{{TODO_URL: repository URL for project 2}}",
      description: "{{TODO: one sentence on the change in project 2}}",
      prUrl: "{{TODO_URL: PR URL for project 2}}",
      mergedAt: "{{TODO: month year for project 2}}",
    },
  ],

  // TODO(owner): Three or four remixes. Add or remove entries freely.
  tracks: [
    {
      title: "{{TODO: remix 1 title}}",
      note: "{{TODO: one-line note about remix 1}}",
      youtubeUrl: "{{TODO_URL: YouTube video URL for remix 1}}",
    },
    {
      title: "{{TODO: remix 2 title}}",
      note: "{{TODO: one-line note about remix 2}}",
      youtubeUrl: "{{TODO_URL: YouTube video URL for remix 2}}",
    },
    {
      title: "{{TODO: remix 3 title}}",
      note: "{{TODO: one-line note about remix 3}}",
      youtubeUrl: "{{TODO_URL: YouTube video URL for remix 3}}",
    },
  ],

  // TODO(owner): Dated entries, newest first. Optional `url` is supported on
  // any entry; remove the field when there is no link.
  log: [
    {
      date: "{{TODO: month year}}",
      text: "{{TODO: one or two lines about what you shipped, learned or fixed}}",
    },
    {
      date: "{{TODO: month year}}",
      text: "{{TODO: one or two lines about what you shipped, learned or fixed}}",
    },
    {
      date: "{{TODO: month year}}",
      text: "{{TODO: one or two lines about what you shipped, learned or fixed}}",
    },
  ],

  // TODO(owner): College projects worth showing. Leave this array empty to hide
  // the section entirely.
  earlier: [
    {
      title: "{{TODO: earlier project 1 title}}",
      description: "{{TODO: one line on what earlier project 1 was}}",
    },
    {
      title: "{{TODO: earlier project 2 title}}",
      description: "{{TODO: one line on what earlier project 2 was}}",
    },
  ],

  // TODO(owner): Optional manual fallbacks used only when the live LeetCode
  // request fails. Set the numbers, or leave null to show a placeholder.
  stats: {
    github: {
      username: githubUsername,
    },
    leetcode: {
      username: leetcodeUsername,
      solved: null,
      streak: null,
    },
  },

  // TODO(owner): Optional. Set to { title, audioUrl } when you have a direct
  // audio file; the hero play button stays hidden while this is null.
  heroTrack: null,
};
