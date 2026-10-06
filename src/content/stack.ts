import type { StackGroup } from "./types";

export const stack: StackGroup[] = [
  {
    name: "GenAI",
    accent: "purple",
    items: [
      "RAG", "Hybrid retrieval", "pgvector", "Multi-agent pipelines", "LLM evaluation", "Guardrails",
      "BERT", "LangChain", "CrewAI", "n8n", "Gemini", "OpenAI API", "Whisper",
    ],
  },
  {
    name: "ML / MLOps",
    accent: "green",
    items: ["scikit-learn", "LightGBM", "XGBoost", "TensorFlow", "MLflow", "Evidently", "Model monitoring"],
  },
  {
    name: "Engineering",
    accent: "blue",
    items: [
      "Python", "TypeScript", "SQL", "Java", "C/C++", "FastAPI", "Next.js", "React",
      "PostgreSQL", "Docker", "GitHub Actions", "AWS", "Google Cloud Run",
    ],
  },
];
