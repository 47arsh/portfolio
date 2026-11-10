import type { SiteContent } from "./types";

// TODO(owner): This is the only file with personal content. Fields that are
// still placeholders are listed in PLACEHOLDERS.md. Run `pnpm placeholders`
// after editing, and `pnpm dev` to preview. Never add invented stats or links.

const githubUsername = "47arsh";
const leetcodeUsername = "arxhx7";

export const site: SiteContent = {
  profile: {
    name: "Arshdeep Singh",
    // DRAFTED: owner to review. Tagline options:
    // 1. "Student developer working on backends, open source and music."
    // 2. "I build backends and figure out why they break."
    // 3. "Backend-focused student who learns by building."
    // Chosen: option 1, the plainest.
    tagline: "Student developer working on backends, open source and music.",
    status: "Building AnytimeDesk as founder.",
    location: "Jalandhar, Punjab, India",
    email: "arxhx7@gmail.com",
    // DRAFTED: owner to review.
    bio: [
      "I'm a B.Tech IT student at NIT Jalandhar, graduating in May 2027 with a CGPA of 8.27.",
      "I'm most interested in backend work: APIs, databases, auth and system design. I'm also learning about RAG and agentic AI.",
      "I learn by building. I start with an idea, get stuck, work out why it doesn't work, then make it work. I'm still figuring out what to specialise in.",
      "Outside code I make music. I used to run a YouTube channel of song remixes.",
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
    role: "Founder",
    // DRAFTED: owner to review.
    oneLiner:
      "A WhatsApp front desk for businesses. It handles incoming customer messages so people don't wait for someone to be free.",
    problem: "{{TODO: 2 to 3 sentences on the problem it solves}}",
    built: "{{TODO: 2 to 3 sentences on what you built}}",
    stack: ["TypeScript", "Node", "pnpm monorepo", "Postgres", "Redis", "WhatsApp"],
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

  // TODO(owner): Pull requests I submitted, newest first. Confirm merge status
  // and add the repository and PR URLs. Mark the best one with featured: true.
  openSource: [
    {
      project: "YUI",
      projectUrl: "{{TODO_URL: repository URL for YUI}}",
      // DRAFTED: owner to review.
      description:
        "Fixed the backend turn lifecycle so the thinking filler no longer starts when the chat backend is unconfigured. The config guard now runs before the filler, with Vitest regression tests that mock TurnOutput; checked against 375 backend tests and Biome CI.",
      prUrl: "{{TODO_URL: PR URL for YUI #1237}}",
      mergedAt: "{{TODO: month year for YUI #1237}}",
      featured: true,
      // DRAFTED: owner to review.
      learned:
        "Fail fast before any background work starts. The regression test keeps that order in place.",
    },
    {
      project: "YUI",
      projectUrl: "{{TODO_URL: repository URL for YUI}}",
      // DRAFTED: owner to review.
      description:
        "Fixed a streaming cue duplication bug where a silent turn could forward the same voice cue through both the express event and the completed-turn fallback. Added regression tests and passed 71/71 targeted tests, typecheck, Biome and 8/8 CI checks.",
      prUrl: "{{TODO_URL: PR URL for YUI #1251}}",
      mergedAt: "{{TODO: month year for YUI #1251}}",
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
  // DRAFTED: owner to review both descriptions.
  earlier: [
    {
      title: "CampusGigs",
      description:
        "A campus errands marketplace. React, Node, Express, MongoDB and JWT, with real-time Socket.IO notifications and an atomic accept step so two people can't take the same task. The RAG assistant used FastAPI, LangChain, ChromaDB and Gemini, with document ingestion, chunking, retrieval and source attribution.",
      url: "https://github.com/47arsh/CampusGigs",
    },
    {
      title: "CodeCollab",
      description:
        "A real-time collaborative code editor. React, Node, Express, Socket.IO, Yjs and CodeMirror. Isolated rooms, sandboxed JavaScript with timeouts, tested with six clients on desktop and mobile.",
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
