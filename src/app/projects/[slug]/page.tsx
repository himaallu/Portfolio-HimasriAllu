import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Button } from "@/components/Button";
import { Badge, Chip } from "@/components/Chip";
import { Gallery } from "@/components/Gallery";
import { ExternalIcon, GithubIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { featuredProjects, identity } from "@/content";
import { findImage, listImages } from "@/lib/assets";
import { accentVar } from "@/lib/accent";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = featuredProjects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name}: ${p.tagline}.`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} | ${identity.name}`, description: p.tagline, url: `${identity.site}/projects/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = featuredProjects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = featuredProjects[index];
  const next = featuredProjects[(index + 1) % featuredProjects.length];

  const dir = `projects/${p.slug}`;
  const cover = findImage(dir, "cover");
  const diagram = findImage(dir, "architecture");
  const screenshots = listImages(dir, `${p.name} screenshot`, ["cover", "architecture"]);

  return (
    <article style={accentVar(p.accent)} className="pb-[var(--section-gap)]">
      <header className="relative overflow-hidden pt-32 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob blob-a left-[-10%] top-[-20%] h-[50vmax] w-[50vmax] opacity-[0.05]" style={{ background: "var(--accent)" }} />
          <div className="dot-grid absolute inset-0" />
        </div>
        <div className="container-content">
          <Link href="/#projects" className="font-label inline-flex items-center gap-2 text-secondary hover:text-primary">
            <ArrowLeft size={14} aria-hidden /> All projects
          </Link>
          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-label" style={{ color: "var(--accent)" }}>Case study</span>
              {p.badge && (
                <Badge>
                  <Award size={12} aria-hidden /> {p.badge}
                </Badge>
              )}
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">{p.name}</h1>
            <p className="mt-5 max-w-[48ch] text-xl text-secondary">{p.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.live && (
                <Button href={p.live}>
                  Open live app <ExternalIcon />
                </Button>
              )}
              {p.code && (
                <Button href={p.code} variant="secondary">
                  <GithubIcon size={17} /> View code
                </Button>
              )}
            </div>
          </Reveal>
          {cover && (
            <Reveal delay={0.1} className="mt-14">
              <BrowserFrame src={cover} alt={`${p.name} screenshot`} url={p.live ?? p.code} name={p.name} priority sizes="(max-width: 1200px) 100vw, 1136px" />
            </Reveal>
          )}
        </div>
      </header>

      {!cover && (
        <div className="container-content mt-16">
          <div aria-hidden className="border-t border-line" />
        </div>
      )}
      <div className={`container-content grid gap-16 lg:grid-cols-[minmax(0,1fr)_320px] ${cover ? "mt-20" : "mt-16"}`}>
        <div className="min-w-0 space-y-16">
          <Block n="01" title="The problem">
            <p className="max-w-prose text-lg text-secondary">{p.tagline}.</p>
          </Block>

          <Block n="02" title="What I built">
            <ul className="max-w-prose space-y-4">
              {p.bullets.map((b) => (
                <li key={b} className="relative pl-5 text-secondary before:absolute before:left-0 before:top-[0.75em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)]">
                  {b}
                </li>
              ))}
            </ul>
          </Block>

          {diagram && (
            <Block n="03" title="Architecture">
              <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-line bg-raised">
                <Image src={diagram} alt={`${p.name} architecture diagram`} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-contain p-4" loading="lazy" />
              </div>
            </Block>
          )}

          {screenshots.length > 0 && (
            <Block n={diagram ? "04" : "03"} title="Screenshots">
              <Gallery images={screenshots} label={`${p.name} screenshots`} rowHeight="auto-rows-[110px] sm:auto-rows-[150px]" />
            </Block>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="surface p-6">
            <h2 className="font-label !text-[0.6875rem] text-muted">Metrics</h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
              {p.metrics.map((m) => (
                <div key={m.label + m.value}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block font-mono text-[1.75rem] font-semibold leading-none" style={{ color: "var(--accent)" }}>{m.value}</span>
                    <span className="mt-2 block text-[0.8125rem] leading-snug text-muted">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="surface p-6">
            <h2 className="font-label !text-[0.6875rem] text-muted">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s}><Chip accent>{s}</Chip></li>
              ))}
            </ul>
          </div>
          <div className="surface p-6">
            <h2 className="font-label !text-[0.6875rem] text-muted">Links</h2>
            <ul className="mt-4 space-y-2.5">
              {p.live && (
                <li><a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:text-[var(--accent)]">Live app <ExternalIcon /></a></li>
              )}
              {p.code && (
                <li><a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:text-[var(--accent)]"><GithubIcon size={15} /> Source code</a></li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      <div className="container-content mt-24">
        <Link
          href={`/projects/${next.slug}`}
          className="surface glow-card lift group flex items-center justify-between gap-6 p-6 md:p-8"
          style={accentVar(next.accent)}
        >
          <span>
            <span className="font-label block !text-[0.6875rem] text-muted">Next case study</span>
            <span className="mt-2 block font-display text-[1.75rem] font-semibold tracking-display md:text-[2.25rem]">{next.name}</span>
          </span>
          <ArrowRight size={28} aria-hidden className="shrink-0 text-secondary transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
        </Link>
      </div>
    </article>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="mb-6 flex items-baseline gap-3 font-display text-[1.75rem] font-semibold tracking-display">
          <span className="font-mono text-[0.875rem] font-medium" style={{ color: "var(--accent)" }}>{n}</span>
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}
