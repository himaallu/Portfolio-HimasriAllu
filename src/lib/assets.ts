import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Build-time asset helpers. Pages are statically generated, so these run once
 * at build: drop a file into `public/` and redeploy, no code change needed.
 */

const PUBLIC = path.join(process.cwd(), "public");
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"];

export type GalleryImage = { src: string; alt: string };

function readCaptions(dir: string): Record<string, string> {
  const file = path.join(PUBLIC, dir, "captions.json");
  if (!fs.existsSync(file)) return {};
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function humanise(file: string): string {
  return path
    .parse(file)
    .name.replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every image in `public/<dir>`, sorted by file name. Captions from `captions.json` ({ "file.jpg": "Caption" }). */
export function listImages(dir: string, fallbackAlt: string, exclude: string[] = []): GalleryImage[] {
  const abs = path.join(PUBLIC, dir);
  if (!fs.existsSync(abs)) return [];
  const captions = readCaptions(dir);
  return fs
    .readdirSync(abs)
    .filter((f) => IMAGE_EXT.includes(path.extname(f).toLowerCase()))
    .filter((f) => !exclude.includes(path.parse(f).name.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => ({
      src: `/${dir}/${encodeURIComponent(f)}`,
      alt: captions[f] ?? `${fallbackAlt}: ${humanise(f)}`,
    }));
}

/** Resolve `public/<dir>/<base>.<any image ext>`; null if missing. */
export function findImage(dir: string, base: string): string | null {
  for (const ext of IMAGE_EXT) {
    const rel = `${dir}/${base}${ext}`;
    if (fs.existsSync(path.join(PUBLIC, rel))) return `/${rel}`;
  }
  return null;
}

/** True if a file under public/ exists (path given as a site URL, e.g. "/resumes/x.pdf"). */
export function publicFileExists(url: string): boolean {
  return fs.existsSync(path.join(PUBLIC, decodeURIComponent(url)));
}
