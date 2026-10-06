import { Award, BookOpen } from "lucide-react";
import { papers, researchHeadline } from "@/content";
import type { Paper } from "@/content/types";
import { listImages } from "@/lib/assets";
import { Badge } from "../Chip";
import { Gallery } from "../Gallery";
import { GlowCard } from "../GlowCard";
import { ExternalIcon } from "../Icons";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

export function Research() {
  const shown = papers.filter((p) => p.title || p.venue);
  const [lead, ...rest] = shown;
  const [count, ...words] = researchHeadline.split(" ");
  // e.g. "1 IEEE conference · 1 International journal · 2 National journal"
  const kinds = Object.entries(
    papers.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.venueType]: (acc[p.venueType] ?? 0) + 1 }), {}),
  );
  return (
    <section id="research" aria-labelledby="research-title" className="section-gap">
      <div className="container-content">
        <SectionHeader id="research-title" number="05" label="Research" title="Published, and peer-reviewed." line="Four papers, one of them an IEEE Best Paper Award winner." />

        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:row-span-1">
            <GlowCard accent="pink" className="relative flex h-full min-h-[220px] flex-col justify-between gap-6 overflow-hidden p-7">
              <div aria-hidden className="dot-grid absolute inset-0 opacity-70" />
              <BookOpen size={22} aria-hidden className="relative" style={{ color: "var(--accent)" }} />
              <p className="relative">
                <span className="text-gradient block font-display text-[5rem] font-bold leading-none tracking-display">{count}</span>
                <span className="mt-2 block font-display text-xl font-medium tracking-display text-primary">{words.join(" ")}</span>
              </p>
              <ul className="relative mt-5 flex flex-wrap gap-1.5">
                {kinds.map(([k, n]) => (
                  <li key={k} className="chip-accent rounded-chip px-2.5 py-1 font-mono text-[0.75rem]">
                    {n} × {k}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
          {lead && (
            <Reveal delay={0.06} className="lg:col-span-2">
              <PaperCard paper={lead} featured />
            </Reveal>
          )}
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={0.06 * (i + 1)}>
              <PaperCard paper={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaperCard({ paper: p, featured = false }: { paper: Paper; featured?: boolean }) {
  const photos = p.photos ? listImages(p.photos, p.award ?? "Research") : [];
  const heading = p.title;
  return (
    <GlowCard accent="pink" as="article" className="flex h-full flex-col p-6 md:p-7">
      <div className={featured && photos.length > 0 ? "grid h-full gap-6 md:grid-cols-[minmax(0,1fr)_240px]" : "flex h-full flex-col"}>
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label !text-[0.6875rem] text-muted">Paper {String(p.id).padStart(2, "0")}</span>
            {p.year && <span className="font-label !text-[0.6875rem] text-muted">· {p.year}</span>}
            {p.award && (
              <Badge>
                <Award size={12} aria-hidden /> {p.award}
              </Badge>
            )}
          </div>
          {heading && <h3 className="mt-4 font-display text-title font-semibold leading-snug tracking-display">{heading}</h3>}
          {p.venue && (
            <p className={heading ? "mt-2 text-[0.9375rem] text-secondary" : "mt-4 font-display text-title font-semibold leading-snug tracking-display"}>{p.venue}</p>
          )}
          {p.venue && <p className="mt-1 text-[0.875rem] text-muted">{p.venueType}</p>}
          {p.summary && <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary">{p.summary}</p>}
          {p.link && (
            <div className="mt-auto pt-6">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-chip border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-2.5 text-[0.9375rem] font-medium text-primary"
              >
                Read paper <ExternalIcon />
              </a>
            </div>
          )}
        </div>
        {featured && photos.length > 0 && <Gallery images={photos} label="Best Paper Award photos" max={1} rowHeight="auto-rows-[110px]" />}
      </div>
    </GlowCard>
  );
}
