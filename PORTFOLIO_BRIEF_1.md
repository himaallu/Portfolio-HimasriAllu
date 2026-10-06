# Portfolio build brief: himasriallu.com

Build a personal portfolio site for Himasri Allu. Everything you need is in this file. Follow the rules in section 1 strictly.

## 1. Rules

- **Do not invent facts.** Every number, date, title and link on the site must come from section 5. If something is missing, use the placeholder convention below.
- **Placeholders:** anything marked `TODO` in this brief is not yet supplied. Render nothing for it in production (hide the element) and list every unresolved `TODO` in a `TODO.md` at the repo root so Himasri can fill them in.
- **Images:** all photos and logos are supplied by Himasri as files (section 6). Never generate, draw or hotlink a company logo or a photo. If a file is missing, show a neutral tile with the name in text.
- **All content lives in one place:** `src/content/` as typed TypeScript or JSON files, so text and images can be edited without touching components.
- **No phone number on the site.** Contact is email, LinkedIn and GitHub only.

## 2. Stack and deployment

- Next.js (App Router) with TypeScript and Tailwind CSS, statically generated.
- Framer Motion for scroll reveals and hover states. Respect `prefers-reduced-motion`.
- `next/image` for every image; lazy-load below the fold.
- Deploy on Vercel, custom domain `himasriallu.com` (and `www`).
- SEO: title "Himasri Allu | AI Engineer", meta description from the hero summary, Open Graph image, `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema.
- Targets: Lighthouse 90+ on performance and accessibility, fully responsive from 360px wide, keyboard navigable, visible focus states, alt text on every image.

## 3. Design direction

Image-led and visually rich, not a wall of text.

- **Theme:** dark, near-black navy background (around `#0a0f1c`), with thin glowing outlined cards. Reference: the roadmap infographic at `reference/roadmap-style.jpg`.
- **Colour coding:** each major section or roadmap phase gets its own accent (blue, green, amber, purple, pink, royal blue), used for card borders, labels and icons. One accent per card, never mixed.
- **Type:** a bold geometric sans for headings (for example Space Grotesk or Sora), Inter for body text.
- **Photos everywhere they exist:** project screenshots, hackathon photos, college photos, community event photos, certificate images. Use masonry or bento grids with a lightbox on click.
- **Cards over paragraphs:** each item shows an image, a title, one line, and 2 to 4 metric chips. Detail sits behind a click or expand.
- **Motion:** subtle fade-and-rise on scroll, gentle card lift on hover, an animated line drawing down the roadmap spine as you scroll.

### 3.1 Quality bar

The site must look designed by a professional, not generated from a template. The first screen has about three seconds to impress a recruiter. Treat design as the main deliverable: after building each section, screenshot it at 1440px and 390px, critique it against this section, and refine before moving on.

### 3.2 Design tokens

Define these once as CSS variables and Tailwind theme values; never hard-code colours or sizes in components.

| Token | Value |
|---|---|
| Background | `#070B14` base, `#0C1220` raised surface, `#111A2E` card |
| Border | `rgba(255,255,255,0.08)` default, accent at 40% opacity on hover |
| Text | `#F4F6FB` primary, `#A7B0C4` secondary, `#6B7690` muted |
| Accents | blue `#4C8DFF`, green `#3DDC97`, amber `#FFB547`, purple `#A77BFF`, pink `#FF6FA8`, royal `#5B6CFF` |
| Signature gradient | blue → purple → pink, used only on the hero name, primary button and section-number labels |
| Radius | 20px cards, 12px chips and buttons, 999px pills |
| Spacing | 8px grid; sections 120px apart on desktop, 72px on mobile; content max width 1200px |
| Headings | Space Grotesk, weight 600 to 700, tight tracking (-0.02em) |
| Body | Inter, 17px, line height 1.65, max 65 characters per line |
| Labels and metrics | JetBrains Mono, small caps style, wide tracking |

Type scale: hero name `clamp(3rem, 9vw, 7rem)`, section titles `clamp(2rem, 4vw, 3.25rem)`, card titles 1.375rem.

### 3.3 The first screen (hero)

This is the eye-catching moment; spend the most effort here.

- Full viewport height. Name set very large in the signature gradient, with the rotating role line beneath it.
- Portrait on the right in a soft-edged frame with a faint glowing ring in the accent gradient. On mobile it sits above the name.
- Background: a slow, subtle animated layer behind the content, either a drifting gradient mesh (two or three blurred colour blobs) or a faint node-and-edge network suggesting a neural net. It must stay quiet enough that text contrast is never affected, and pause under `prefers-reduced-motion`.
- A fine dot or grid texture over the background at very low opacity for depth.
- The three proof chips in a row under the summary, each with a small icon and a count-up animation on the number.
- On load, elements enter in sequence over about 1.2 seconds: name, role, summary, chips, buttons, portrait.
- A scroll cue at the bottom.

### 3.4 Component styling

- **Cards:** raised surface, 1px border, soft inner highlight on the top edge. On hover: lift 4px, border takes the card's accent, and a soft glow in that accent follows the cursor.
- **Featured projects:** each one fills most of the viewport width, alternating image left and right. The screenshot sits in a browser-window frame, slightly tilted, and straightens on hover. Metrics appear as large mono numerals with small labels.
- **Experience:** logos in monochrome white at rest, full colour on hover, all normalised to the same visual height.
- **Photos:** consistent treatment across the site: rounded corners, a slight desaturation and dark gradient overlay at rest, full colour on hover. Galleries use a bento layout with mixed tile sizes, never a uniform grid.
- **Section headers:** a small mono label with a number ("03 / Journey"), then the large title, then one supporting line.
- **Nav:** floating pill, blurred glass background, highlights the current section as you scroll, with a thin scroll-progress line.
- **Buttons:** primary uses the signature gradient with a soft glow; secondary is outlined.

### 3.5 What to avoid

- Stock template looks: centred text over a plain gradient, three identical feature boxes, default Tailwind colours, emoji as icons.
- Too many colours at once. The background stays dark and neutral; accents are used sparingly so they stand out.
- Heavy effects: no custom cursors, no scroll hijacking, no particle storms, no autoplay sound, nothing that makes scrolling feel slow.
- Long paragraphs. If a block of text exceeds three lines on desktop, cut it or move it behind an expand.
- Layout shift, low-contrast grey text on dark, and any text set over a busy part of a photo.

## 4. Site structure

A single scrolling home page with a sticky nav, plus detail pages for the three featured projects.

Nav: About · Journey · Experience · Projects · Research · Hackathons · Community · Certifications · Contact

1. **Hero:** portrait photo, name, rotating role line ("AI Engineer", "AI/ML Engineer", "Full-stack Engineer"), the summary, three proof chips, and buttons: View projects, Download resume (dropdown with the three PDFs), GitHub, LinkedIn.
2. **About:** short bio plus a photo, and the Education cards (section 5.3) with college photos.
3. **Journey (roadmap):** a vertical timeline in the style of the reference image: a spine with circular icons on the left, and one colour-coded card per phase on the right. Each card has columns for "What I learned", "Tools" and "What I built" (linking to the project or role). Content in section 5.9.
4. **Experience:** timeline of four roles, each with the company logo, role, dates, location and bullets.
5. **Projects:** three large featured cards first, then a smaller grid titled "More projects".
6. **Research:** a card per publication with venue, year, award badge and a "Read paper" link.
7. **Hackathons:** a card per hackathon with a photo gallery, result badge and link to the project.
8. **Community:** VIT Blockchain Community, with stats and an event photo gallery.
9. **Certifications:** badge images with issuer, date and a verify link.
10. **Tech stack:** grouped icon grid (use the `simple-icons` package for technology icons).
11. **Contact:** email, LinkedIn, GitHub, resume downloads.

Featured project detail pages (`/projects/haqqi`, `/projects/coverage-amplifier`, `/projects/cardshield`): problem, what was built, architecture diagram image, metrics, screenshots, stack, links.

## 5. Content

### 5.1 Identity

- Name: Himasri Allu
- Location: Dubai, UAE (UAE Golden Visa holder)
- Email: alluhimasri@gmail.com
- LinkedIn: https://www.linkedin.com/in/allu-himasri/
- GitHub: https://github.com/himaallu
- Site: https://himasriallu.com

### 5.2 Hero

Summary:

> AI engineer who builds production LLM systems: multi-agent pipelines, hybrid retrieval, evaluation harnesses and guardrails, where the model handles language and code computes, cites and verifies. Ships them end to end on FastAPI, Next.js, AWS and Google Cloud.

Proof chips:

- Top 4 of 400+ at the n8n Dubai Hackathon
- 4× published researcher, IEEE Best Paper Award
- 2× AWS certified

Resume downloads (files in `public/resumes/`):

- AI Engineer: `HimasriAllu_Resume_AI.pdf`
- AI/ML Engineer: `HimasriAllu_Resume_AI-ML.pdf`
- Software Engineer: `HimasriAllu_Resume_SWE.pdf`

### 5.3 Education

**University of Wollongong in Dubai**: Master of Applied Artificial Intelligence, Sep 2026 to present.
About text: "I'm studying for a Master of Applied Artificial Intelligence at the University of Wollongong in Dubai, the Dubai campus of Australia's University of Wollongong." Personal line: `TODO` (one or two sentences from Himasri on why she chose it or what she is focusing on).

**Vellore Institute of Technology, India**: B.Tech Computer Science and Engineering, CGPA 8.31/10, Aug 2021 to Sep 2025.
About text: "I spent four years at VIT Vellore, where I did most of my growing up as an engineer: I founded the VIT Blockchain Community and grew it past 1,000 members, published four research papers, and won a 72-hour hackathon with ForeverYoung." Personal line: `TODO`.

Each card has a photo gallery (section 6).

### 5.4 Experience

**AI Fellow · Ground Truth** · New York (remote) · Jan 2026 to Jul 2026

- Built an internal reporting automation tool for 30 to 40 account managers, turning a client KPI reporting task that took about 2 days by hand into a fully automated run.
- Scaled it to 200 to 300 client-ready reports a week: a serverless Python pipeline on AWS Lambda, orchestrated by Step Functions, pulls from internal APIs and databases with scheduling, retries and per-client configuration.
- Owned it independently from ambiguous requirements to production in six months, settling cost-versus-scalability architecture trade-offs up front; built with Cursor.

Metric chips: 200–300 reports/week · 30–40 account managers · 2 days → automated

**Founder's Office Generalist (AI & Automation) · UrbanDart** · Hyderabad · Oct 2025 to Jan 2026

- Cut client onboarding from 2 days to 15 minutes with an LLM onboarding interviewer that captures each client's requirements as structured records in an Excel CRM.
- Built a Python AI agent: each WhatsApp Business API webhook or LinkedIn message triggers an LLM that classifies it and, via tool calling, updates the CRM.
- Automated intake, support and follow-ups for up to 50 clients, with the agent alerting the right team member on WhatsApp for every request.

Metric chips: 2 days → 15 min onboarding · up to 50 clients

**IT Intern (AI & NLP) · Petrofac Limited** · Sharjah · Jan 2025 to Apr 2025

- Cut tender analysis time by 40% for a 5 to 10 person IT team that read every tender document by hand before quoting to clients.
- Built a Python NLP pipeline: PyPDF2 extracts the tender text, which is split into clauses, and BERT embeddings score each clause against an IT vocabulary.
- Highlighted IT keywords in the flagged clauses with KeyBERT and served the results through a FastAPI service, containerised with Docker on the company's own servers.

Metric chips: 40% faster tender analysis

**Quantum Computing Project Intern · C-DAC (MeitY)** · Hyderabad · Sep 2023 to Dec 2023

- Surveyed 7 quantum benchmarking methods and simulators, including C-DAC's indigenous QSim simulator, and presented findings on application-oriented benchmarking for quantum computing.
- Wrote and tested 12 quantum programs in Qiskit as part of a 6-member team, with in-depth analysis of the Quantum Fourier Transform and Shor's algorithm, the quantum algorithm that threatens RSA encryption.

Metric chips: 12 Qiskit programs · 7 benchmarking methods

### 5.5 Featured projects

**Haqqi** · AI legal-aid assistant for UAE migrant workers with limited Arabic or legal knowledge

- Stack: Next.js, FastAPI, Supabase pgvector, Gemini / K2 Horizon, Whisper, Langfuse
- Built a voice-first assistant in 8 languages turning a worker's story into cited violations, an itemised claim and an Arabic complaint PDF.
- Designed 4 LLM agents over hybrid retrieval on UAE labour law, with a deterministic claim calculator and code-checked citations.
- Achieved 92% retrieval hit@5, 97% citation support and 100% calculator accuracy on a 50-case evaluation.
- Badge: Top 4 of 400+, n8n Dubai Hackathon
- Metric chips: 8 languages · 92% hit@5 · 97% citation support · 100% calculator accuracy
- Live: https://haqqi-ai.vercel.app · Code: https://github.com/himaallu/Haqqi-AI

**Coverage Amplifier** · turns press coverage into 5 ready-to-post marketing assets, every claim backed by the article

- Stack: Next.js, FastAPI on Google Cloud Run, Supabase Postgres, Alembic, Gemini
- Built a three-stage extract → generate → verify pipeline that writes only from the article's sentences, so every claim is traceable.
- Caught 3/3 seeded hallucination types with a CI eval harness; ran async FastAPI jobs on Cloud Run at about 22 s and $0.003 per kit.
- Metric chips: 3/3 hallucination types caught · ~22 s per kit · $0.003 per kit
- Live: https://coverage-amplifier-opal.vercel.app · Code: https://github.com/himaallu/coverage-amplifier

**CardShield** · real-time fraud detection service that scores every card transaction

- Stack: LightGBM, MLflow, FastAPI, Evidently, Docker, GitHub Actions
- Cut total fraud cost by 65% vs the best amount rule (recall 0.80) by setting the decision threshold by business cost.
- Served LightGBM via FastAPI at 13 ms p95 with per-decision SHAP reasons, after comparing 4 models on a time-based split.
- Tracked models in MLflow and added drift monitoring that caught all 3 injected shifts with no false alarms; Docker, 50 tests and CI.
- Metric chips: 65% lower fraud cost · 13 ms p95 · recall 0.80 · 50 tests
- Code: https://github.com/himaallu/CardSheild (update this URL if the repo is renamed to CardShield)

### 5.6 More projects

Smaller cards: image, one line, stack chips, links.

| Project | One line | Stack | Links |
|---|---|---|---|
| WorkFlow-AI | Procurement assistant that parses requests with an LLM and enforces budgets, policy and approvals in deterministic Python | Next.js, FastAPI, Gemini, Pydantic | https://github.com/himaallu/WorkFlow-AI |
| HealthLens | Turns patient voice recordings into structured SOAP clinical notes | Streamlit, AssemblyAI, Gemini | https://healthlens-yrlua25pdjp7xcibu4fcxv.streamlit.app/ · https://github.com/himaallu/HealthLens |
| Automated Reporting | Converts a raw CSV into an executive PDF report with charts and an AI-written narrative | Python, Pandas, Gemini, Matplotlib | https://github.com/himaallu/Automated-Reporting |
| DebateBot | Generates grounded pro and con debates from uploaded policy PDFs using RAG | Streamlit, LangChain, FAISS, Gemini | https://debatebothimasriallu.streamlit.app · https://github.com/himaallu/DebateBot |
| Startup Idea Evaluator | Three AI agents assess a startup idea: market research, competitors and pitch summary | CrewAI, Streamlit, Hugging Face | https://startupideaevaluator-sujg5kvghqk7fzkdec7ugu.streamlit.app/ · https://github.com/himaallu/StartUpIdeaEvaluator |
| ForeverYoung | Full-stack app helping elderly people transition into retirement; hackathon winner | Next.js, FastAPI, TypeScript, Vercel | https://github.com/himaallu/ForeverYoung |

### 5.7 Research

Headline: 4× published researcher.

| # | Title | Venue | Year | Link |
|---|---|---|---|---|
| 1 | `TODO` | IEEE IConSCEPT-2024, NIT Puducherry (Best Paper Award) | 2024 | https://ieeexplore.ieee.org/document/10627838 |
| 2 | `TODO` | `TODO` (international journal) | `TODO` | `TODO` |
| 3 | `TODO` | `TODO` (national journal) | `TODO` | `TODO` |
| 4 | `TODO` | `TODO` (national journal) | `TODO` | `TODO` |

Each card: title, venue, year, a one-line plain-English summary (`TODO`), "Read paper" button. Paper 1 gets a "Best Paper Award" badge and the award photo.

### 5.8 Hackathons, community, certifications

**Hackathons**

- **Top 4 of 400+, n8n Dubai Hackathon "Automate with K2 Horizon"** (Sep 2026), with Haqqi. Link to the Haqqi project page. Photo gallery.
- **Winner, Best Idea in Health and Wellness, 72-hour VIT hackathon** (Jun 2023), with ForeverYoung. Photo gallery.

**Community: VIT Blockchain Community** (Founder, 2023 to 2024)

- Founded the community and grew it to 1,000+ members.
- Ran workshops with Solana and Avalanche.
- Stat tiles: 1,000+ members · workshops with Solana and Avalanche. Event photo gallery.

**Certifications**

| Certification | Issuer | Date | Verify link |
|---|---|---|---|
| AWS Certified Solutions Architect – Associate | Amazon Web Services | Feb 2024 | `TODO` |
| AWS Certified Cloud Practitioner | Amazon Web Services | Jun 2024 | `TODO` |

### 5.9 Journey (roadmap)

Draft phases, built from the resume. Himasri should review the wording; keep the structure.

| Phase | Accent | What I learned | Tools | What I built |
|---|---|---|---|---|
| 1. Foundations (2021 onwards, VIT) | Blue | Programming, data structures, SQL, computer science fundamentals | Python, Java, C/C++, SQL | B.Tech coursework |
| 2. Core ML | Green | Supervised learning, model comparison, time-based validation, cost-based thresholds | scikit-learn, LightGBM, XGBoost | CardShield |
| 3. Deep learning and NLP | Amber | Embeddings, transformers, text extraction | TensorFlow, BERT, KeyBERT | Petrofac tender analysis pipeline |
| 4. Generative AI | Purple | RAG, hybrid retrieval, multi-agent pipelines, LLM evaluation, guardrails | Gemini, OpenAI API, LangChain, CrewAI, pgvector, Whisper, n8n | Haqqi, Coverage Amplifier |
| 5. MLOps and deployment | Pink | Experiment tracking, drift monitoring, containers, CI/CD, serverless | MLflow, Evidently, Docker, GitHub Actions, FastAPI, AWS, Google Cloud Run | CardShield serving and monitoring, Coverage Amplifier on Cloud Run |
| 6. Real-world experience | Royal blue | Owning systems from ambiguous requirements to production | AWS Lambda, Step Functions, WhatsApp Business API | Ground Truth reporting platform, UrbanDart AI agent |
| Now | White | Master of Applied Artificial Intelligence, University of Wollongong in Dubai | | |

### 5.10 Tech stack

- **GenAI:** RAG, hybrid retrieval, pgvector, multi-agent pipelines, LLM evaluation, guardrails, BERT, LangChain, CrewAI, n8n, Gemini, OpenAI API, Whisper
- **ML / MLOps:** scikit-learn, LightGBM, XGBoost, TensorFlow, MLflow, Evidently, model monitoring
- **Engineering:** Python, TypeScript, SQL, Java, C/C++, FastAPI, Next.js, React, PostgreSQL, Docker, GitHub Actions, AWS, Google Cloud Run

## 6. Assets Himasri will supply

Put files at these paths. The site must build and look complete even while some are missing.

| Path | What |
|---|---|
| `public/resumes/` | The three resume PDFs named in 5.2 |
| `public/photos/portrait.jpg` | Hero portrait |
| `public/photos/vit/` | College photos (campus, friends, events) |
| `public/photos/uowd/` | University of Wollongong in Dubai photos |
| `public/photos/hackathon-n8n/` | n8n Dubai Hackathon photos |
| `public/photos/hackathon-vit/` | VIT 72-hour hackathon photos |
| `public/photos/community/` | VIT Blockchain Community events |
| `public/photos/research/` | Best Paper Award photo or certificate |
| `public/logos/` | `ground-truth`, `urbandart`, `petrofac`, `cdac`, `uowd`, `vit`, `aws` as SVG or PNG, downloaded from each organisation's official site or press kit |
| `public/certs/` | The two AWS certification badges (download from the AWS Credly account) |
| `public/projects/<slug>/` | Screenshots and an architecture diagram per project (`cover.png` plus extras) |
| `reference/roadmap-style.jpg` | The roadmap infographic, as a style reference only; do not publish it |

Galleries should read every image in a folder automatically, so adding a photo needs no code change. Captions come from an optional `captions.json` in the same folder.

## 7. Build order

1. Scaffold, theme tokens, content files, nav and footer.
2. Hero, Experience, featured Projects, Contact. Deploy this to Vercel first.
3. Journey roadmap, More projects, Tech stack.
4. Research, Hackathons, Community, Certifications, Education galleries.
5. Project detail pages, SEO, Lighthouse pass, connect the domain.
6. Write `TODO.md` listing every unresolved item.
