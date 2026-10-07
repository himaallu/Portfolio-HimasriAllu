import type { Hero, Identity } from "./types";

export const identity: Identity = {
  name: "Himasri Allu",
  location: "Dubai, UAE",
  visa: "UAE Golden Visa holder",
  email: "alluhimasri@gmail.com",
  linkedin: "https://www.linkedin.com/in/allu-himasri/",
  github: "https://github.com/himaallu",
  site: "https://himasriallu.com",
};

export const seo = {
  title: "Himasri Allu | AI Engineer",
  description:
    "AI engineer who builds production LLM systems: multi-agent pipelines, hybrid retrieval, evaluation harnesses and guardrails, where the model handles language and code computes, cites and verifies. Ships them end to end on FastAPI, Next.js, AWS and Google Cloud.",
};

export const hero: Hero = {
  roles: ["AI Engineer", "AI/ML Engineer", "Full-stack Engineer"],
  summary: seo.description,
  resumes: [{ label: "Resume", file: "/resumes/HimasriAllu_Resume.pdf" }],
};

/**
 * About section. The story paragraphs come from each education entry's `about` text
 * (VIT first, then UOWD), so they are not repeated on the education cards.
 */
export const about = {
  title: "From VIT Vellore to Dubai.",
  /** Alt text for public/photos/about.jpg (optional; without it the section is text only). */
  photoAlt: "Himasri Allu",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "hackathons", label: "Hackathons" },
  { id: "community", label: "Community" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
