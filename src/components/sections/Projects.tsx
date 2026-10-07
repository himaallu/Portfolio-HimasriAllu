import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import { featuredProjects, moreProjects } from "@/content";
import type { FeaturedProject, SmallProject } from "@/content/types";
import { findImage } from "@/lib/assets";
import { accentVar } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { BrowserFrame } from "../BrowserFrame";
import { Badge, Chip } from "../Chip";
import { GlowCard } from "../GlowCard";
import { ExternalIcon, GithubIcon } from "../Icons";
import { ProjectCover } from "../ProjectCover";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-gap overflow-x-clip">
      <div className="container-content">
        <SectionHeader
          id="projects-title"
          number="04"
          label="Projects"
          title="Systems that compute, cite and verify."
          line="Three featured builds with their evaluation numbers, then the rest of the workshop."
        />
        <div className="space-y-24 md:space-y-32">
          {featuredProjects.map((p, i) => (
            <Featured key={p.slug} project={p} flip={i % 2 === 1} cover={findImage(`projects/${p.slug}`, "cover")} />
          ))}
        </div>

        <div className="mt-28 md:mt-36">
          <Reveal>
            <h3 className="font-display text-[1.75rem] font-semibold tracking-display md:text-[2.25rem]">More projects</h3>
            <p className="mt-2 text-secondary">Smaller builds exploring agents, RAG, speech and reporting.</p>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
                <SmallCard project={p} cover={findImage(`projects/${p.slug}`, "cover")} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Featured({ project: p, flip, cover }: { project: FeaturedProject; flip: boolean; cover: string | null }) {
  return (
    <article className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16" style={accentVar(p.accent)} aria-labelledby={`p-${p.slug}`}>
      <Reveal className={cn("relative", flip && "lg:order-last")}>
        <div aria-hidden className="absolute -inset-8 -z-10 rounded-[40px] opacity-15 blur-3xl" style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 35%, transparent), transparent)" }} />
        <Link
          href={`/projects/${p.slug}`}
          aria-label={`${p.name} case study`}
          className="block rounded-[16px]"
          style={{ ["--tilt-y" as string]: flip ? "-6deg" : "6deg" }}
        >
          <BrowserFrame
            src={cover}
            alt={`${p.name} screenshot`}
            url={p.live ?? p.code}
            name={p.name}
            className="tilt"
            placeholder={<ProjectCover name={p.name} stack={p.stack} hint="Case study" />}
          />
        </Link>
      </Reveal>

      <Reveal delay={0.1} className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-label" style={{ color: "var(--accent)" }}>
            Featured
          </span>
          {p.badge && (
            <Badge>
              <Award size={12} aria-hidden /> {p.badge}
            </Badge>
          )}
        </div>
        <h3 id={`p-${p.slug}`} className="mt-3 font-display text-[2.25rem] font-semibold leading-none tracking-display md:text-[3rem]">
          {p.name}
        </h3>
        <p className="mt-4 max-w-prose text-lg text-secondary">{p.tagline}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4">
          {p.metrics.map((m) => (
            <div key={m.label + m.value}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-mono text-[1.75rem] font-semibold leading-none tracking-tight text-primary md:text-[2rem]">{m.value}</span>
                <span className="mt-2 block text-[0.8125rem] leading-snug text-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s}>
              <Chip>{s}</Chip>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link
            href={`/projects/${p.slug}`}
            className="group/cta inline-flex items-center gap-2 rounded-chip border px-5 py-3 text-[0.9375rem] font-medium text-primary transition-colors"
            style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, transparent)", background: "color-mix(in srgb, var(--accent) 10%, transparent)" }}
          >
            Read the case study
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-chip px-3 py-3 text-[0.9375rem] text-secondary hover:text-primary">
              Live <ExternalIcon />
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-chip px-3 py-3 text-[0.9375rem] text-secondary hover:text-primary">
              <GithubIcon size={16} /> Code
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}

function SmallCard({ project: p, cover }: { project: SmallProject; cover: string | null }) {
  return (
    <GlowCard accent={p.accent} as="article" className="flex h-full flex-col overflow-hidden">
      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
          <Image src={cover} alt={`${p.name} screenshot`} fill sizes="(max-width: 640px) 100vw, 380px" className="photo object-cover object-top" />
          <div aria-hidden className="photo-overlay absolute inset-0" />
        </div>
      )}
      <div aria-hidden className="h-px w-full" style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)" }} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-display text-[1.25rem] font-semibold tracking-display">{p.name}</h4>
          {p.badge && <Badge>{p.badge}</Badge>}
        </div>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary">{p.line}</p>
        <ul className="mb-5 mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s}>
              <Chip accent>{s}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-4 border-t border-line pt-4">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live demo (opens in a new tab)`} className="inline-flex items-center gap-1 text-[0.875rem] text-primary hover:text-[var(--accent)]">
              Live demo <ExternalIcon size={14} />
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source code (opens in a new tab)`} className="inline-flex items-center gap-1.5 text-[0.875rem] text-secondary hover:text-primary">
              <GithubIcon size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
