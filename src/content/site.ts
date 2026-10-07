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
  resumes: [
    { label: "AI Engineer", file: "/resumes/HimasriAllu_Resume_AI.pdf" },
    { label: "AI/ML Engineer", file: "/resumes/HimasriAllu_Resume_AI-ML.pdf" },
    { label: "Software Engineer", file: "/resumes/HimasriAllu_Resume_SWE.pdf" },
  ],
};

/** Short bio for the About section. Built only from facts in the brief; edit freely. */
export const about = {
  bio: [
    "I'm an AI engineer based in Dubai, UAE, and a UAE Golden Visa holder.",
    "I build production LLM systems where the model handles language and code computes, cites and verifies, and I ship them end to end on FastAPI, Next.js, AWS and Google Cloud.",
  ],
  /** Photo for the About section. Falls back to the portrait, then to a neutral tile. */
  photo: "/photos/about.jpg",
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
