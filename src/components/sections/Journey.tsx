import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journey } from "@/content";
import type { JourneyPhase } from "@/content/types";
import { accentVar } from "@/lib/accent";
import { GlowCard } from "../GlowCard";
import { phaseIcons } from "../Icons";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

export function Journey() {
  const phases = journey.filter((p) => p.step !== "Now");
  const now = journey.find((p) => p.step === "Now");
  return (
    <section id="journey" aria-labelledby="journey-title" className="section-gap">
      <div className="container-content">
        <SectionHeader
          id="journey-title"
          number="02"
          label="Journey"
          title="From fundamentals to production AI."
          line="Six phases, each with what I learned, the tools I picked up and what I built with them."
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {phases.map((p, i) => (
            <Reveal as="li" key={p.step} delay={(i % 3) * 0.06}>
              <Phase phase={p} />
            </Reveal>
          ))}
        </ol>
        {now && <Now phase={now} />}
      </div>
    </section>
  );
}

function Phase({ phase }: { phase: JourneyPhase }) {
  const Icon = phaseIcons[phase.icon];
  return (
    <GlowCard accent={phase.accent} as="article" className="flex h-full flex-col p-6">
      <header className="flex items-center gap-3.5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
          style={{ borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}
        >
          <Icon size={17} aria-hidden style={{ color: "var(--accent)" }} />
        </span>
        <div className="min-w-0">
          <p className="font-label !text-[0.625rem]" style={{ color: "var(--accent)" }}>
            Phase {phase.step}
            {phase.when && <span className="text-muted"> · {phase.when}</span>}
          </p>
          <h3 className="mt-0.5 font-display text-[1.1875rem] font-semibold leading-snug tracking-display">{phase.title}</h3>
        </div>
      </header>

      <p className="mt-5 text-[0.9375rem] leading-relaxed text-secondary">{phase.learned}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
        {phase.tools.map((t) => (
          <li key={t} className="chip-accent rounded-chip px-2 py-0.5 font-mono text-[0.75rem]">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <div className="border-t border-line pt-4">
          <h4 className="font-label mb-2 !text-[0.625rem] text-muted">What I built</h4>
          <ul className="space-y-1">
            {phase.built.map((b) => (
              <li key={b.label}>
                <Link
                  href={b.href}
                  className="group/link inline-flex items-start gap-1 text-[0.9375rem] text-primary transition-colors hover:text-[var(--accent)]"
                >
                  {b.label}
                  <ArrowUpRight size={14} aria-hidden className="mt-1 shrink-0 text-muted transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlowCard>
  );
}

function Now({ phase }: { phase: JourneyPhase }) {
  const Icon = phaseIcons[phase.icon];
  return (
    <Reveal className="mt-5">
      <div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-card border border-dashed border-line-strong px-6 py-5"
        style={accentVar(phase.accent)}
      >
        <Icon size={18} aria-hidden style={{ color: "var(--accent)" }} />
        <span className="font-label !text-[0.6875rem] text-primary">Now</span>
        <span className="font-display text-[1.125rem] font-semibold tracking-display">{phase.title}</span>
        {phase.when && <span className="text-[0.9375rem] text-muted">{phase.when}</span>}
      </div>
    </Reveal>
  );
}
