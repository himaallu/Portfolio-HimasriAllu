export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
