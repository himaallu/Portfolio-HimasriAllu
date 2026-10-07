/**
 * Content types. Every piece of text on the site lives in `src/content/`.
 *
 * Convention: a value of `null` means "not supplied yet" (a TODO in the brief).
 * Components render nothing for `null` values. Every `null` is listed in TODO.md.
 */

export type Accent = "blue" | "green" | "amber" | "purple" | "pink" | "royal" | "white";

export type Link = { label: string; href: string };

export type Identity = {
  name: string;
  location: string;
  visa: string;
  email: string;
  linkedin: string;
  github: string;
  site: string;
};

export type Resume = { label: string; file: string };

export type Hero = {
  roles: string[];
  summary: string;
  resumes: Resume[];
};

export type Education = {
  id: string;
  school: string;
  short: string;
  degree: string;
  detail: string | null;
  dates: string;
  about: string;
  personal: string | null;
  logo: string;
  photos: string;
  accent: Accent;
};

export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  logo: string;
  accent: Accent;
  bullets: string[];
  metrics: string[];
};

export type Metric = { value: string; label: string };

export type FeaturedProject = {
  slug: string;
  name: string;
  tagline: string;
  /** Two or three sentences for the case-study "The problem" block. Falls back to the tagline. */
  problem: string | null;
  stack: string[];
  bullets: string[];
  badge: string | null;
  metrics: Metric[];
  live: string | null;
  code: string | null;
  accent: Accent;
};

export type SmallProject = {
  slug: string;
  name: string;
  line: string;
  stack: string[];
  live: string | null;
  code: string | null;
  badge: string | null;
  accent: Accent;
};

export type Paper = {
  id: number;
  title: string | null;
  venue: string | null;
  /** Shown when the full venue is not known yet, e.g. "International journal". */
  venueType: string;
  year: string | null;
  summary: string | null;
  link: string | null;
  award: string | null;
  photos: string | null;
};

export type Hackathon = {
  id: string;
  result: string;
  event: string;
  date: string;
  project: string;
  projectHref: string;
  photos: string;
  accent: Accent;
};

export type CommunityEvent = {
  name: string;
  description: string | null;
  /** Folder under public/ whose images become this event's gallery. */
  photos: string;
};

export type Community = {
  name: string;
  role: string;
  dates: string;
  bullets: string[];
  stats: Metric[];
  events: CommunityEvent[];
};

export type Certification = {
  name: string;
  short: string;
  issuer: string;
  date: string;
  verify: string | null;
  /** AWS validation number, shown so a reader can check it at the verify link. */
  credentialId: string | null;
  badge: string;
};

export type JourneyPhase = {
  step: string;
  title: string;
  when: string | null;
  accent: Accent;
  icon: "code" | "chart" | "brain" | "sparkles" | "server" | "briefcase" | "graduation";
  learned: string;
  tools: string[];
  built: Link[];
};

export type StackGroup = {
  name: string;
  accent: Accent;
  items: string[];
};
