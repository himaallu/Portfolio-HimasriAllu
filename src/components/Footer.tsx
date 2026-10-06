import { identity } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-content flex flex-col items-start justify-between gap-4 py-8 text-[0.875rem] text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {identity.name} · {identity.location}
        </p>
        <ul className="flex gap-5">
          <li>
            <a className="hover:text-primary" href={`mailto:${identity.email}`}>Email</a>
          </li>
          <li>
            <a className="hover:text-primary" href={identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a className="hover:text-primary" href={identity.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
