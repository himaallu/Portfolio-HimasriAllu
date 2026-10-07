# TODO: items still to supply

The site builds and looks complete without these. Each one stays hidden (or shows a neutral
name tile) until you add it. Text lives in `src/content/`; `null` there means "not supplied yet".

## Text (edit in `src/content/`)

| Where | What's missing | File |
|---|---|---|
| Education · UOWD | Personal line: one or two sentences on why you chose it or what you are focusing on | `education.ts` → `personal` |
| Education · VIT | Personal line | `education.ts` → `personal` |
| Journey | Review the wording of the six draft phases (keep the structure) | `journey.ts` |
| CardShield | Update the code URL if the repo is renamed from `CardSheild` to `CardShield` | `projects.ts` |

The site shows two selected papers (the IEEE IConSCEPT-2024 paper and the IRJAEH article). Their
one-line summaries were written from the paper title and the IRJAEH abstract; check they read right.
Optional: swap the AWS verify links (aws.amazon.com/verification plus the validation number) for your
Credly badge URLs.

## Files (drop into `public/`, then redeploy; no code changes needed)

| Path | What | Shown as until supplied |
|---|---|---|
| `public/photos/vit/` | More college photos (shown on the VIT education card) | Gallery hidden |
| `public/photos/uowd/` | UOWD photos | Gallery hidden |
| `public/photos/hackathon-n8n/` | n8n Dubai Hackathon photos | Gallery hidden |
| `public/photos/hackathon-vit/` | Yantra Hackathon photos | Gallery hidden |
| `public/photos/community/inauguration/` | Inauguration of the VIT Blockchain Community | Event card shows text only |
| `public/photos/community/designathon/` | *Optional* Designathon photos | Event card shows text only |
| `public/photos/community/innoverse/` | More InnoVerse Hackathon photos (one is in) | One photo shown |
| `public/projects/workflow-ai/cover.jpg` | WorkFlow-AI screenshot (no live demo or repo images to capture) | Name tile |
| `public/projects/foreveryoung/cover.jpg` | ForeverYoung screenshot | Name tile |
| `public/projects/startup-idea-evaluator/cover.jpg` | Startup Idea Evaluator screenshot (the live demo currently crashes with a KeyError) | Name tile |
| `public/projects/<slug>/architecture.png` | Architecture diagrams for Haqqi, Coverage Amplifier, CardShield | Name tile |
| `public/photos/research/` | Best Paper Award photo or certificate | Hidden |
| `public/logos/uowd.(svg\|png)` | UOWD logo (square, on its own background) | "UOWD" in text |
| `public/logos/vit.(svg\|png)` | VIT logo | "VIT" in text |
| `public/logos/aws.(svg\|png)` | AWS logo (not used yet; certification cards use the badges) | none |
| `public/certs/aws-solutions-architect-associate.(png\|svg)` | Credly badge (download the badge image from Credly) | "AWS" tile |
| `public/certs/aws-cloud-practitioner.(png\|svg)` | Credly badge (download the badge image from Credly) | "AWS" tile |
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
