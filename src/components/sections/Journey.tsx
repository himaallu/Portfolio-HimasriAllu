import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journey } from "@/content";
import type { JourneyPhase } from "@/content/types";
import { accentVar } from "@/lib/accent";
import { cn, isExternal } from "@/lib/cn";
import { GlowCard } from "../GlowCard";
import { phaseIcons } from "../Icons";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { Spine } from "../Spine";

export function Journey() {
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
        <Spine>
          <ol className="space-y-6 md:space-y-8">
            {journey.map((p, i) => (
              <Phase key={p.step} phase={p} index={i} />
            ))}
          </ol>
        </Spine>
      </div>
    </section>
  );
}

function Phase({ phase, index }: { phase: JourneyPhase; index: number }) {
  const Icon = phaseIcons[phase.icon];
  const isNow = phase.step === "Now";
  return (
    <li className="relative pl-14 md:pl-24" style={accentVar(phase.accent)}>
      {/* Node on the spine */}
      <Reveal className="absolute left-0 top-5 md:left-[14px]" y={0} delay={0.05}>
        <span
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full border bg-base md:h-12 md:w-12",
            isNow ? "border-white/40" : "border-[color-mix(in_srgb,var(--accent)_55%,transparent)]",
          )}
          style={{ boxShadow: "0 0 0 6px var(--color-base), 0 0 24px -4px color-mix(in srgb, var(--accent) 60%, transparent)" }}
        >
          <Icon size={18} aria-hidden style={{ color: "var(--accent)" }} />
        </span>
      </Reveal>

      <Reveal delay={0.05 + (index % 2) * 0.05}>
        <GlowCard accent={phase.accent} as="article" className={cn("p-6 md:p-7", isNow && "border-dashed")}>
          <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-label" style={{ color: "var(--accent)" }}>
              {isNow ? "Now" : `Phase ${phase.step}`}
            </span>
            <h3 className="font-display text-title font-semibold tracking-display">{phase.title}</h3>
            {phase.when && <span className="text-[0.875rem] text-muted">{phase.when}</span>}
          </header>

          {!isNow && (
            <div className="mt-5 grid gap-5 border-t border-line pt-5 md:grid-cols-[1.2fr_1fr_1fr] md:gap-6">
              <div>
                <h4 className="font-label mb-2 !text-[0.625rem] text-muted">What I learned</h4>
                <p className="text-[0.9375rem] leading-relaxed text-secondary">{phase.learned}</p>
              </div>
              <div>
                <h4 className="font-label mb-2 !text-[0.625rem] text-muted">Tools</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {phase.tools.map((t) => (
                    <li key={t} className="chip-accent rounded-chip px-2 py-0.5 font-mono text-[0.75rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-label mb-2 !text-[0.625rem] text-muted">What I built</h4>
                <ul className="space-y-1.5">
                  {phase.built.map((b) => (
                    <li key={b.label}>
                      <Link
                        href={b.href}
                        {...(isExternal(b.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group/link inline-flex items-start gap-1 text-[0.9375rem] text-primary underline decoration-[color-mix(in_srgb,var(--accent)_40%,transparent)] decoration-1 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                      >
                        {b.label}
                        <ArrowUpRight size={14} aria-hidden className="mt-1 shrink-0 text-muted transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </GlowCard>
      </Reveal>
    </li>
  );
}
