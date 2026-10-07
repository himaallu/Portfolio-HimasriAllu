import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CalendarDays, Trophy, Users } from "lucide-react";
import type React from "react";
import { certifications, community, hackathons } from "@/content";
import { findImage, listImages } from "@/lib/assets";
import { isExternal } from "@/lib/cn";
import { Badge } from "../Chip";
import { Gallery } from "../Gallery";
import { GlowCard } from "../GlowCard";
import { ExternalIcon } from "../Icons";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

/** Hackathons, community and certifications, grouped under one section. */
export function Highlights() {
  return (
    <section id="highlights" aria-labelledby="highlights-title" className="section-gap">
      <div className="container-content">
        <SectionHeader
          id="highlights-title"
          number="06"
          label="Highlights"
          title="Built under the clock, and beyond."
          line="Hackathons, the community I founded at VIT, and my AWS certifications."
        />
        <Hackathons />
        <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <Community />
          <Certifications />
        </div>
      </div>
    </section>
  );
}

function SubHeading({ id, icon: Icon, children }: { id: string; icon: typeof Trophy; children: React.ReactNode }) {
  return (
    <h3 id={id} className="font-label mb-5 flex scroll-mt-28 items-center gap-2 text-secondary">
      <Icon size={15} aria-hidden /> {children}
    </h3>
  );
}

function Hackathons() {
  return (
    <div>
      <SubHeading id="hackathons" icon={Trophy}>Hackathons</SubHeading>
      <div className="grid gap-5 lg:grid-cols-2">
          {hackathons.map((h, i) => {
            const photos = listImages(h.photos, h.event);
            const ext = isExternal(h.projectHref);
            return (
              <Reveal key={h.id} delay={i * 0.08}>
                <GlowCard accent={h.accent} as="article" className="flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>
                      <Trophy size={12} aria-hidden /> {h.result}
                    </Badge>
                    <span className="flex items-center gap-1.5 font-mono text-[0.75rem] text-muted">
                      <CalendarDays size={13} aria-hidden /> {h.date}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-title font-semibold leading-snug tracking-display">{h.event}</h4>
                  <p className="mt-2 text-[0.9375rem] text-secondary">
                    Built{" "}
                    {ext ? (
                      <a href={h.projectHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary underline decoration-[color-mix(in_srgb,var(--accent)_50%,transparent)] underline-offset-4 hover:decoration-[var(--accent)]">
                        {h.project}
                        <ExternalIcon size={14} />
                      </a>
                    ) : (
                      <Link href={h.projectHref} className="inline-flex items-center gap-0.5 text-primary underline decoration-[color-mix(in_srgb,var(--accent)_50%,transparent)] underline-offset-4 hover:decoration-[var(--accent)]">
                        {h.project}
                        <ArrowUpRight size={14} aria-hidden />
                      </Link>
                    )}
                  </p>
                  {photos.length > 0 && <Gallery images={photos} label={`${h.event} photos`} className="mt-6" />}
                </GlowCard>
              </Reveal>
            );
          })}
      </div>
    </div>
  );
}

function Community() {
  const photos = listImages(community.photos, community.name);
  return (
    <div>
      <SubHeading id="community" icon={Users}>Community</SubHeading>
      <Reveal className="h-full">
        <GlowCard accent="green" lift={false} className="overflow-hidden p-6 md:p-7">
          <p className="font-label !text-[0.6875rem]" style={{ color: "var(--accent)" }}>{community.role} · {community.dates}</p>
          <h4 className="mt-2 font-display text-title font-semibold tracking-display">{community.name}</h4>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {community.stats.map((s) => (
              <div key={s.label} className="rounded-[14px] border border-line bg-card/60 px-4 py-3.5">
                <p className="font-label !text-[0.625rem] text-muted">{s.label}</p>
                <p className="mt-1.5 font-mono text-[1rem] font-semibold leading-tight text-primary sm:text-[1.0625rem]">{s.value}</p>
              </div>
            ))}
          </div>
          <ul className="mt-5 space-y-2">
            {community.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[0.9375rem] text-secondary">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                {b}
              </li>
            ))}
          </ul>
          {photos.length > 0 && <Gallery images={photos} label={`${community.name} event photos`} className="mt-6" rowHeight="auto-rows-[90px] sm:auto-rows-[110px]" />}
        </GlowCard>
      </Reveal>
    </div>
  );
}

function Certifications() {
  return (
    <div>
      <SubHeading id="certifications" icon={BadgeCheck}>Certifications</SubHeading>
      <ul className="grid gap-4">
        {certifications.map((c, i) => {
          const badge = findImage("certs", c.badge);
          return (
            <Reveal as="li" key={c.name} delay={i * 0.08}>
              <GlowCard accent="amber" as="article" className="flex items-center gap-5 p-5 md:p-6">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border md:h-[72px] md:w-[72px]"
                  style={{ borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)", background: "color-mix(in srgb, var(--accent) 7%, transparent)" }}
                >
                  {badge ? (
                    <Image src={badge} alt={`${c.name} badge`} fill sizes="72px" className="object-contain p-1.5" loading="lazy" />
                  ) : (
                    <span aria-hidden className="font-mono text-[0.75rem] font-semibold tracking-wide" style={{ color: "var(--accent)" }}>AWS</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-display md:text-[1.125rem]">{c.name}</h4>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-muted">
                    <span>{c.issuer}</span>
                    <span aria-hidden>·</span>
                    <span>{c.date}</span>
                    {c.verify && (
                      <a
                        href={c.verify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify ${c.name} on aws.amazon.com (opens in a new tab)`}
                        className="inline-flex items-center gap-1 text-primary hover:text-[var(--accent)]"
                      >
                        Verify <ExternalIcon size={14} />
                      </a>
                    )}
                  </p>
                  {c.credentialId && (
                    <p className="mt-1.5 truncate font-mono text-[0.6875rem] text-muted" title={c.credentialId}>
                      <span className="sr-only">Validation number: </span>
                      {c.credentialId}
                    </p>
                  )}
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
