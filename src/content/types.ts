export interface Metric {
  label: string;
  value: string;
}

export interface SocialLinks {
  /** GitHub username, without the domain. */
  github: string;
  /** X handle, without the @. */
  x: string;
  /** Full LinkedIn profile URL. */
  linkedin: string;
  /** LeetCode username. */
  leetcode: string;
  /** Full YouTube channel URL. */
  youtube: string;
}

export interface Profile {
  name: string;
  tagline: string;
  status: string;
  location: string;
  email: string;
  bio: string[];
  photo: string;
  resumeUrl: string;
  socials: SocialLinks;
}

export interface FeaturedProject {
  name: string;
  slug: string;
  url: string;
  /** Role on the project, e.g. Founder. */
  role?: string;
  oneLiner: string;
  problem: string;
  built: string;
  stack: string[];
  metrics: Metric[];
  demoVideoUrl: string;
  screenshots: string[];
  learned: string;
}

export interface ShippedProject {
  title: string;
  description: string;
  stack: string[];
  url: string;
  date: string;
}

export interface OpenSourceContribution {
  project: string;
  projectUrl: string;
  description: string;
  prUrl: string;
  mergedAt: string;
  featured?: boolean;
  /** Only used when `featured` is true. */
  learned?: string;
}

export interface Track {
  title: string;
  note: string;
  youtubeUrl: string;
}

export interface LogEntry {
  date: string;
  text: string;
  url?: string;
}

export interface EarlierProject {
  title: string;
  description: string;
  url?: string;
}

export interface HeroTrack {
  title: string;
  /** Direct audio file URL, e.g. /audio/track.mp3. */
  audioUrl: string;
}

export interface SiteStats {
  github: {
    username: string;
  };
  leetcode: {
    username: string;
    /** Manual fallback, used only when the live fetch fails. */
    solved: number | null;
    streak: number | null;
  };
}

export interface SiteContent {
  profile: Profile;
  featured: FeaturedProject;
  shipped: ShippedProject[];
  openSource: OpenSourceContribution[];
  tracks: Track[];
  /** Ordered newest first. */
  log: LogEntry[];
  earlier: EarlierProject[];
  stats: SiteStats;
  /** Optional direct-audio track for the hero play button. */
  heroTrack: HeroTrack | null;
}
