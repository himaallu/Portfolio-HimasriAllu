import type { FeaturedProject, SmallProject } from "./types";

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "haqqi",
    name: "Haqqi",
    tagline: "AI legal-aid assistant for UAE migrant workers with limited Arabic or legal knowledge",
    // Draft from the repo README; Himasri to approve.
    problem:
      "MOHRE settles 98.6% of the labour disputes that reach it, but many low-wage migrant workers never get that far. The law and the complaint are in Arabic or English, many workers don't know which rights apply or what they are owed, and a vague or wrong claim is easy to dismiss.",
    stack: ["Next.js", "FastAPI", "Supabase pgvector", "Gemini / K2 Horizon", "Whisper", "Langfuse"],
    bullets: [
      "Built a voice-first assistant in 8 languages turning a worker's story into cited violations, an itemised claim and an Arabic complaint PDF.",
      "Designed 4 LLM agents over hybrid retrieval on UAE labour law, with a deterministic claim calculator and code-checked citations.",
      "Achieved 92% retrieval hit@5, 97% citation support and 100% calculator accuracy on a 50-case evaluation.",
    ],
    badge: "Top 4 of 400+, n8n Dubai Hackathon",
    metrics: [
      { value: "8", label: "languages" },
      { value: "92%", label: "hit@5" },
      { value: "97%", label: "citation support" },
      { value: "100%", label: "calculator accuracy" },
    ],
    live: "https://haqqi-ai.vercel.app",
    code: "https://github.com/himaallu/Haqqi-AI",
    accent: "blue",
  },
  {
    slug: "coverage-amplifier",
    name: "Coverage Amplifier",
    tagline: "Turns press coverage into 5 ready-to-post marketing assets, every claim backed by the article",
    // Draft from the repo README; Himasri to approve.
    problem:
      "For pay-on-results PR agencies, a media placement only pays off once it is turned into social posts, sales copy and website badges. That activation was written by hand for every client, and one invented or misattributed quote is a client-trust disaster.",
    stack: ["Next.js", "FastAPI on Google Cloud Run", "Supabase Postgres", "Alembic", "Gemini"],
    bullets: [
      "Built a three-stage extract → generate → verify pipeline that writes only from the article's sentences, so every claim is traceable.",
      "Caught 3/3 seeded hallucination types with a CI eval harness; ran async FastAPI jobs on Cloud Run at about 22 s and $0.003 per kit.",
    ],
    badge: null,
    metrics: [
      { value: "3/3", label: "hallucination types caught" },
      { value: "~22 s", label: "per kit" },
      { value: "$0.003", label: "per kit" },
    ],
    live: "https://coverage-amplifier-opal.vercel.app",
    code: "https://github.com/himaallu/coverage-amplifier",
    accent: "purple",
  },
  {
    slug: "cardshield",
    name: "CardShield",
    tagline: "Real-time fraud detection service that scores every card transaction",
    // Draft from the repo README; Himasri to approve.
    problem:
      "A payment processor has a few milliseconds to decide whether a card payment is fraud, and a wrong call costs money either way: missed fraud loses the amount, a false alarm blocks a genuine customer. Fixed amount rules are blunt, models decay silently as fraudsters adapt, and analysts need to know why a payment was flagged.",
    stack: ["LightGBM", "MLflow", "FastAPI", "Evidently", "Docker", "GitHub Actions"],
    bullets: [
      "Cut total fraud cost by 65% vs the best amount rule (recall 0.80) by setting the decision threshold by business cost.",
      "Served LightGBM via FastAPI at 13 ms p95 with per-decision SHAP reasons, after comparing 4 models on a time-based split.",
      "Tracked models in MLflow and added drift monitoring that caught all 3 injected shifts with no false alarms; Docker, 50 tests and CI.",
    ],
    badge: null,
    metrics: [
      { value: "65%", label: "lower fraud cost" },
      { value: "13 ms", label: "p95 latency" },
      { value: "0.80", label: "recall" },
      { value: "50", label: "tests" },
    ],
    live: null,
    // Update this URL if the repo is renamed to CardShield.
    code: "https://github.com/himaallu/CardSheild",
    accent: "green",
  },
];

export const moreProjects: SmallProject[] = [
  {
    slug: "workflow-ai",
    name: "WorkFlow-AI",
    line: "Procurement assistant that parses requests with an LLM and enforces budgets, policy and approvals in deterministic Python",
    stack: ["Next.js", "FastAPI", "Gemini", "Pydantic"],
    live: null,
    code: "https://github.com/himaallu/WorkFlow-AI",
    badge: null,
    accent: "blue",
  },
  {
    slug: "healthlens",
    name: "HealthLens",
    line: "Turns patient voice recordings into structured SOAP clinical notes",
    stack: ["Streamlit", "AssemblyAI", "Gemini"],
    live: "https://healthlens-yrlua25pdjp7xcibu4fcxv.streamlit.app/",
    code: "https://github.com/himaallu/HealthLens",
    badge: null,
    accent: "green",
  },
  {
    slug: "automated-reporting",
    name: "Automated Reporting",
    line: "Converts a raw CSV into an executive PDF report with charts and an AI-written narrative",
    stack: ["Python", "Pandas", "Gemini", "Matplotlib"],
    live: null,
    code: "https://github.com/himaallu/Automated-Reporting",
    badge: null,
    accent: "amber",
  },
  {
    slug: "debatebot",
    name: "DebateBot",
    line: "Generates grounded pro and con debates from uploaded policy PDFs using RAG",
    stack: ["Streamlit", "LangChain", "FAISS", "Gemini"],
    live: "https://debatebothimasriallu.streamlit.app",
    code: "https://github.com/himaallu/DebateBot",
    badge: null,
    accent: "purple",
  },
  {
    slug: "startup-idea-evaluator",
    name: "Startup Idea Evaluator",
    line: "Three AI agents assess a startup idea: market research, competitors and pitch summary",
    stack: ["CrewAI", "Streamlit", "Hugging Face"],
    // Live demo hidden while it crashes with a KeyError; restore once fixed:
    // https://startupideaevaluator-sujg5kvghqk7fzkdec7ugu.streamlit.app/
    live: null,
    code: "https://github.com/himaallu/StartUpIdeaEvaluator",
    badge: null,
    accent: "pink",
  },
  {
    slug: "foreveryoung",
    name: "ForeverYoung",
    line: "Full-stack app helping elderly people transition into retirement",
    stack: ["Next.js", "FastAPI", "TypeScript", "Vercel"],
    live: null,
    code: "https://github.com/himaallu/ForeverYoung",
    badge: "Hackathon winner",
    accent: "royal",
  },
];
