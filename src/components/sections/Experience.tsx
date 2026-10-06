import Image from "next/image";
import { MapPin } from "lucide-react";
import { experience } from "@/content";
import type { Role } from "@/content/types";
import { findImage } from "@/lib/assets";
import { Chip } from "../Chip";
import { Expandable } from "../Expandable";
import { GlowCard } from "../GlowCard";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-gap">
      <div className="container-content">
        <SectionHeader
          id="experience-title"
          number="03"
          label="Experience"
          title="Shipped inside real teams."
          line="Four roles across New York, Hyderabad and Sharjah, from quantum benchmarking to serverless AI pipelines."
        />
        <ol className="relative grid gap-5">
          {experience.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 0.05}>
              <RoleCard role={r} logo={findImage("logos", r.logo)} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function RoleCard({ role, logo }: { role: Role; logo: string | null }) {
  const [lead, ...more] = role.bullets;
  return (
    <GlowCard accent={role.accent} as="article" id={`exp-${role.id}`} className="scroll-mt-28 p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10">
        <div className="flex items-center gap-4 md:flex-col md:items-start">
          <div className="relative flex h-14 w-[120px] shrink-0 items-center md:h-16 md:w-[160px]">
            {logo ? (
              <Image src={logo} alt={`${role.company} logo`} fill sizes="160px" className="logo-mono object-contain object-left" />
            ) : (
              <span className="font-display text-xl font-semibold tracking-display text-primary">{role.company}</span>
            )}
          </div>
          <div className="md:mt-1">
            <p className="font-label !text-[0.6875rem]" style={{ color: "var(--accent)" }}>
              {role.dates}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[0.875rem] text-muted">
              <MapPin size={13} aria-hidden /> {role.location}
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-title font-semibold leading-tight tracking-display">
            {role.title}
            <span className="text-muted"> · {role.company}</span>
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key metrics">
            {role.metrics.map((m) => (
              <li key={m}>
                <Chip accent>{m}</Chip>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-secondary">{lead}</p>
          {more.length > 0 && (
            <Expandable label={`More about ${role.company}`}>
              <ul className="mt-3 max-w-prose space-y-2.5">
                {more.map((b) => (
                  <li key={b} className="relative pl-4 text-[0.9375rem] leading-relaxed text-secondary before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]">
                    {b}
                  </li>
                ))}
              </ul>
            </Expandable>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
