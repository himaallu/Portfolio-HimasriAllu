import type { Role } from "./types";

export const experience: Role[] = [
  {
    id: "ground-truth",
    title: "AI Fellow",
    company: "Ground Truth",
    location: "New York (remote)",
    dates: "Jan 2026 – Jul 2026",
    logo: "ground-truth",
    accent: "blue",
    bullets: [
      "Built an internal reporting automation tool for 30 to 40 account managers, turning a client KPI reporting task that took about 2 days by hand into a fully automated run.",
      "Scaled it to 200 to 300 client-ready reports a week: a serverless Python pipeline on AWS Lambda, orchestrated by Step Functions, pulls from internal APIs and databases with scheduling, retries and per-client configuration.",
      "Owned it independently from ambiguous requirements to production in six months, settling cost-versus-scalability architecture trade-offs up front; built with Cursor.",
    ],
    metrics: ["200–300 reports/week", "30–40 account managers", "2 days → automated"],
  },
  {
    id: "urbandart",
    title: "Founder's Office Generalist (AI & Automation)",
    company: "UrbanDart",
    location: "Hyderabad",
    dates: "Oct 2025 – Jan 2026",
    logo: "urbandart",
    accent: "green",
    bullets: [
      "Cut client onboarding from 2 days to 15 minutes with an LLM onboarding interviewer that captures each client's requirements as structured records in an Excel CRM.",
      "Built a Python AI agent: each WhatsApp Business API webhook or LinkedIn message triggers an LLM that classifies it and, via tool calling, updates the CRM.",
      "Automated intake, support and follow-ups for up to 50 clients, with the agent alerting the right team member on WhatsApp for every request.",
    ],
    metrics: ["2 days → 15 min onboarding", "up to 50 clients"],
  },
  {
    id: "petrofac",
    title: "IT Intern (AI & NLP)",
    company: "Petrofac Limited",
    location: "Sharjah",
    dates: "Jan 2025 – Apr 2025",
    logo: "petrofac",
    accent: "amber",
    bullets: [
      "Cut tender analysis time by 40% for a 5 to 10 person IT team that read every tender document by hand before quoting to clients.",
      "Built a Python NLP pipeline: PyPDF2 extracts the tender text, which is split into clauses, and BERT embeddings score each clause against an IT vocabulary.",
      "Highlighted IT keywords in the flagged clauses with KeyBERT and served the results through a FastAPI service, containerised with Docker on the company's own servers.",
    ],
    metrics: ["40% faster tender analysis"],
  },
  {
    id: "cdac",
    title: "Quantum Computing Project Intern",
    company: "C-DAC (MeitY)",
    location: "Hyderabad",
    dates: "Sep 2023 – Dec 2023",
    logo: "cdac",
    accent: "purple",
    bullets: [
      "Surveyed 7 quantum benchmarking methods and simulators, including C-DAC's indigenous QSim simulator, and presented findings on application-oriented benchmarking for quantum computing.",
      "Wrote and tested 12 quantum programs in Qiskit as part of a 6-member team, with in-depth analysis of the Quantum Fourier Transform and Shor's algorithm, the quantum algorithm that threatens RSA encryption.",
    ],
    metrics: ["12 Qiskit programs", "7 benchmarking methods"],
  },
];
