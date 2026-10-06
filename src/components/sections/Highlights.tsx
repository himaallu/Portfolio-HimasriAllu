import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CalendarDays, Trophy, Users } from "lucide-react";
import { certifications, community, hackathons } from "@/content";
import { findImage, listImages } from "@/lib/assets";
import { isExternal } from "@/lib/cn";
import { Badge } from "../Chip";
import { Gallery } from "../Gallery";
import { GlowCard } from "../GlowCard";
import { ExternalIcon } from "../Icons";
import { NameTile } from "../NameTile";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

export function Hackathons() {
  return (
    <section id="hackathons" aria-labelledby="hackathons-title" className="section-gap">
      <div className="container-content">
        <SectionHeader id="hackathons-title" number="06" label="Hackathons" title="Built under the clock." />
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
                  <h3 className="mt-5 font-display text-title font-semibold leading-snug tracking-display">{h.event}</h3>
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
    </section>
  );
}

export function Community() {
  const photos = listImages(community.photos, community.name);
  return (
    <section id="community" aria-labelledby="community-title" className="section-gap">
      <div className="container-content">
        <SectionHeader id="community-title" number="07" label="Community" title={community.name} line={`${community.role}, ${community.dates}.`} />
        <Reveal>
          <GlowCard accent="green" lift={false} className="overflow-hidden p-6 md:p-8">
            <div className={photos.length > 0 ? "grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : ""}>
              <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-3">
                  {community.stats.map((s) => (
                    <div key={s.label} className="rounded-[16px] border border-line bg-card/60 p-5">
                      <p className="font-label !text-[0.625rem] text-muted">{s.label}</p>
                      <p className="mt-2 font-mono text-[1.375rem] font-semibold leading-tight text-primary sm:text-[1.75rem]">{s.value}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-6 space-y-2.5">
                  {community.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-secondary">
                      <Users size={16} aria-hidden className="mt-1 shrink-0" style={{ color: "var(--accent)" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              {photos.length > 0 && <Gallery images={photos} label={`${community.name} event photos`} rowHeight="auto-rows-[100px] sm:auto-rows-[130px]" />}
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section-gap">
      <div className="container-content">
        <SectionHeader id="certifications-title" number="08" label="Certifications" title="Certified on AWS." />
        <ul className="grid gap-5 sm:grid-cols-2">
          {certifications.map((c, i) => {
            const badge = findImage("certs", c.badge);
            return (
              <Reveal as="li" key={c.name} delay={i * 0.08}>
                <GlowCard accent="amber" as="article" className="flex h-full items-center gap-5 p-5 md:p-6">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[16px] border border-line bg-card md:h-28 md:w-28">
                    {badge ? (
                      <Image src={badge} alt={`${c.name} badge`} fill sizes="112px" className="object-contain p-2" loading="lazy" />
                    ) : (
                      <NameTile name="AWS" size="sm" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-label !text-[0.6875rem]" style={{ color: "var(--accent)" }}>
                      {c.issuer}
                    </p>
                    <h3 className="mt-1.5 font-display text-[1.1875rem] font-semibold leading-snug tracking-display">{c.name}</h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-muted">
                      <BadgeCheck size={14} aria-hidden /> {c.date}
                    </p>
                    {c.credentialId && (
                      <p className="mt-2 break-all font-mono text-[0.6875rem] leading-snug text-muted">
                        <span className="sr-only">Validation number: </span>
                        {c.credentialId}
                      </p>
                    )}
                    {c.verify && (
                      <a
                        href={c.verify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify ${c.name} on aws.amazon.com (opens in a new tab)`}
                        className="mt-3 inline-flex items-center gap-1 text-[0.875rem] text-primary hover:text-[var(--accent)]"
                      >
                        Verify <ExternalIcon size={14} />
                      </a>
                    )}
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
