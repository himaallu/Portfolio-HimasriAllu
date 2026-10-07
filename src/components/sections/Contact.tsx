import { ArrowUpRight, Mail } from "lucide-react";
import { identity } from "@/content";
import type { Resume } from "@/content/types";
import { GlowCard } from "../GlowCard";
import { GithubIcon } from "../Icons";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

export function Contact({ resumes }: { resumes: Resume[] }) {
  const links = [
    { label: "Email", value: identity.email, href: `mailto:${identity.email}`, icon: <Mail size={20} aria-hidden />, accent: "blue" as const },
    { label: "LinkedIn", value: "in/allu-himasri", href: identity.linkedin, icon: <ArrowUpRight size={20} aria-hidden />, accent: "royal" as const },
    { label: "GitHub", value: "@himaallu", href: identity.github, icon: <GithubIcon size={20} />, accent: "purple" as const },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-gap pb-[var(--section-gap)]">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-raised px-6 py-14 md:px-14 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="blob blob-a -right-[10%] -top-[40%] h-[420px] w-[420px] bg-blue opacity-[0.07]" />
            <div className="blob blob-b -bottom-[50%] left-[10%] h-[380px] w-[380px] bg-purple opacity-[0.05]" />
            <div className="dot-grid absolute inset-0" />
          </div>
          <div className="relative">
            <SectionHeader id="contact-title" number="10" label="Contact" title="Let's build something that holds up in production." line={`Based in ${identity.location}. The fastest way to reach me is email.`} />
            <ul className="grid gap-4 md:grid-cols-3">
              {links.map((l, i) => (
                <Reveal as="li" key={l.label} delay={i * 0.06}>
                  <GlowCard accent={l.accent} className="h-full !bg-base/60 backdrop-blur">
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex h-full items-center justify-between gap-4 rounded-card p-5"
                    >
                      <span className="min-w-0">
                        <span className="font-label block !text-[0.625rem] text-muted">{l.label}</span>
                        <span className="mt-1 block truncate text-[1rem] text-primary">{l.value}</span>
                      </span>
                      <span className="shrink-0 text-secondary transition-colors group-hover:text-[var(--accent)]">{l.icon}</span>
                    </a>
                  </GlowCard>
                </Reveal>
              ))}
            </ul>
            {resumes.length > 0 && (
              <Reveal delay={0.15} className="mt-8">
                <p className="font-label mb-3 !text-[0.625rem] text-muted">{resumes.length > 1 ? "Resume downloads" : "Resume"}</p>
                <ul className="flex flex-wrap gap-2">
                  {resumes.map((r) => (
                    <li key={r.file}>
                      <a href={r.file} download className="inline-flex items-center gap-2 rounded-pill border border-line-strong bg-base/50 px-4 py-2 text-[0.875rem] text-secondary transition-colors hover:border-white/30 hover:text-primary">
                        {resumes.length > 1 ? r.label : "Download resume"} <span className="font-mono text-[0.6875rem] text-muted">PDF</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
