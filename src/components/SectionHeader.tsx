import { Reveal } from "./Reveal";

type Props = { number: string; label: string; title: string; line?: string; id?: string };

/** "03 / Journey" mono label, large title, one supporting line. */
export function SectionHeader({ number, label, title, line, id }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="font-label mb-4 flex items-center gap-3 text-secondary">
        <span className="text-gradient font-semibold">{number}</span>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="font-display text-section font-semibold leading-[1.05] tracking-display text-primary">
        {title}
      </h2>
      {line && <p className="mt-4 max-w-prose text-lg text-secondary">{line}</p>}
    </Reveal>
  );
}
