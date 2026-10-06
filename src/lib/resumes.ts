import "server-only";
import { hero } from "@/content";
import { publicFileExists } from "./assets";

/** Only resumes whose PDF is actually in public/resumes/. */
export function availableResumes() {
  return hero.resumes.filter((r) => publicFileExists(r.file));
}
