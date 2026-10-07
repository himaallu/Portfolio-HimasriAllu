import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Briefcase,
  Code2,
  GraduationCap,
  Server,
  Sparkles,
  type LucideProps,
} from "lucide-react";
import { siGithub } from "simple-icons";

export const phaseIcons = {
  code: Code2,
  chart: BarChart3,
  brain: Brain,
  sparkles: Sparkles,
  server: Server,
  briefcase: Briefcase,
  graduation: GraduationCap,
};

export function GithubIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg role="img" aria-hidden viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={siGithub.path} />
    </svg>
  );
}

export function ExternalIcon(props: LucideProps) {
  return <ArrowUpRight aria-hidden size={16} {...props} />;
}
