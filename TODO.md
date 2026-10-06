# TODO: items still to supply

The site builds and looks complete without these. Each one stays hidden (or shows a neutral
name tile) until you add it. Text lives in `src/content/`; `null` there means "not supplied yet".

## Text (edit in `src/content/`)

| Where | What's missing | File |
|---|---|---|
| Education · UOWD | Personal line: one or two sentences on why you chose it or what you are focusing on | `education.ts` → `personal` |
| Education · VIT | Personal line | `education.ts` → `personal` |
| Research · Paper 1 | Title | `research.ts` |
| Research · Paper 1 | One-line plain-English summary | `research.ts` |
| Research · Paper 2 | Title, venue (international journal), year, summary, link | `research.ts` |
| Research · Paper 3 | Title, venue (national journal), year, summary, link | `research.ts` |
| Research · Paper 4 | Title, venue (national journal), year, summary, link | `research.ts` |
| Certifications · Solutions Architect – Associate | Credly verify link | `highlights.ts` → `verify` |
| Certifications · Cloud Practitioner | Credly verify link | `highlights.ts` → `verify` |
| Journey | Review the wording of the six draft phases (keep the structure) | `journey.ts` |
| About | Review the two-line bio (built only from facts in the brief) | `site.ts` → `about.bio` |
| CardShield | Update the code URL if the repo is renamed from `CardSheild` to `CardShield` | `projects.ts` |

Papers 2–4 get their own cards automatically once a title or venue is filled in. Until then the
research headline tile shows the breakdown (1 × IEEE conference, 1 × international journal, 2 × national journal).

## Files (drop into `public/`, then redeploy; no code changes needed)

| Path | What | Shown as until supplied |
|---|---|---|
| `public/resumes/HimasriAllu_Resume_AI.pdf` | AI Engineer resume | Hidden from the resume menu |
| `public/resumes/HimasriAllu_Resume_AI-ML.pdf` | AI/ML Engineer resume | Hidden |
| `public/resumes/HimasriAllu_Resume_SWE.pdf` | Software Engineer resume | Hidden |
| `public/photos/portrait.jpg` | Hero portrait (4:5 crop works best) | Name tile |
| `public/photos/about.jpg` | *Optional* About photo; falls back to the first UOWD photo, then VIT, then the portrait | Name tile |
| `public/photos/vit/` | College photos | Gallery hidden |
| `public/photos/uowd/` | UOWD photos | Gallery hidden |
| `public/photos/hackathon-n8n/` | n8n Dubai Hackathon photos | Gallery hidden |
| `public/photos/hackathon-vit/` | VIT 72-hour hackathon photos | Gallery hidden |
| `public/photos/community/` | VIT Blockchain Community events | Gallery hidden |
| `public/photos/research/` | Best Paper Award photo or certificate | Hidden |
| `public/logos/ground-truth.(svg\|png)` | Ground Truth logo | Company name in text |
| `public/logos/urbandart.(svg\|png)` | UrbanDart logo | Company name in text |
| `public/logos/petrofac.(svg\|png)` | Petrofac logo | Company name in text |
| `public/logos/cdac.(svg\|png)` | C-DAC logo | Company name in text |
| `public/logos/uowd.(svg\|png)` | UOWD logo | "UOWD" in text |
| `public/logos/vit.(svg\|png)` | VIT logo | "VIT" in text |
| `public/logos/aws.(svg\|png)` | AWS logo (not used yet; certification cards use the badges) | none |
| `public/certs/aws-solutions-architect-associate.(png\|svg)` | Credly badge | "AWS" tile |
| `public/certs/aws-cloud-practitioner.(png\|svg)` | Credly badge | "AWS" tile |
| `public/projects/<slug>/cover.png` | Main screenshot for each project (16:10 works best) | Name tile in the browser frame |
| `public/projects/<slug>/architecture.png` | Architecture diagram (featured projects) | Name tile |
| `public/projects/<slug>/*.png` | Any other images become the Screenshots gallery on the case-study page | Hidden |
| `reference/roadmap-style.jpg` | Style reference only; never published (it is outside `public/`) | none |

Project slugs: `haqqi`, `coverage-amplifier`, `cardshield`, `workflow-ai`, `healthlens`,
`automated-reporting`, `debatebot`, `startup-idea-evaluator`, `foreveryoung`.

Any image format works (`.jpg`, `.png`, `.webp`, `.avif`, `.svg`). Galleries are sorted by file name
(`01-stage.jpg`, `02-team.jpg`, …). To caption photos, add a `captions.json` in the same folder:

```json
{ "01-stage.jpg": "Pitching Haqqi to the judges", "02-team.jpg": "The team after the final round" }
```

Captions are also the alt text, so write them for someone who can't see the photo.

## Deployment

- [ ] Import the repo into Vercel and deploy
- [ ] Add `himasriallu.com` and `www.himasriallu.com` to the Vercel project, then update the `@` A record and `www` CNAME in GoDaddy DNS (see README)
