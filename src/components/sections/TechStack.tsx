import {
  siCplusplus,
  siCrewai,
  siDocker,
  siFastapi,
  siGithubactions,
  siGooglecloud,
  siGooglegemini,
  siLangchain,
  siMlflow,
  siN8n,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siTensorflow,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { stack } from "@/content";
import { accentVar } from "@/lib/accent";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

const ICONS: Record<string, SimpleIcon> = {
  Python: siPython,
  TypeScript: siTypescript,
  FastAPI: siFastapi,
  "Next.js": siNextdotjs,
  React: siReact,
  PostgreSQL: siPostgresql,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  "Google Cloud Run": siGooglecloud,
  LangChain: siLangchain,
  "scikit-learn": siScikitlearn,
  TensorFlow: siTensorflow,
  MLflow: siMlflow,
  Gemini: siGooglegemini,
  n8n: siN8n,
  "C/C++": siCplusplus,
  CrewAI: siCrewai,
};

export function TechStack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="section-gap">
      <div className="container-content">
        <SectionHeader id="stack-title" number="09" label="Tech stack" title="The toolkit." />
        <div className="grid gap-5 lg:grid-cols-3">
          {stack.map((g, gi) => (
            <Reveal key={g.name} delay={gi * 0.08}>
              <section aria-label={g.name} className="surface h-full p-6" style={accentVar(g.accent)}>
                <h3 className="font-label flex items-center gap-2" style={{ color: "var(--accent)" }}>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {g.name}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((t) => {
                    const icon = ICONS[t];
                    return (
                      <li
                        key={t}
                        className="group inline-flex items-center gap-2 rounded-chip border border-line bg-card/50 px-3 py-2 text-[0.875rem] leading-tight text-secondary transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)] hover:text-primary"
                      >
                        {icon ? (
                          <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden className="shrink-0 fill-current text-muted transition-colors group-hover:text-[var(--accent)]">
                            <path d={icon.path} />
                          </svg>
                        ) : null}
                        {t}
                      </li>
                    );
                  })}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
