"""Architecture diagrams for the case-study pages, drawn from each repo's README flowchart."""
# Regenerate: python3 scripts/architecture_diagrams.py /tmp/out && copy each <name>.svg to public/projects/<name>/architecture.svg
import sys
from xml.sax.saxutils import escape

W_BOX, H_BOX = 330, 118
COLS = [40, 430, 820, 1210]
FONT = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
MONO = "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace"

STYLE = {
    "code": dict(fill="#111A2E", stroke="rgba(255,255,255,0.18)", tag=None),
    "llm": dict(fill="#2A2618", stroke="#CFB37F", tag="LLM"),
    "store": dict(fill="#0F1A1F", stroke="#8CBFA8", tag="DATA"),
    "io": dict(fill="#151B2E", stroke="#8EA8D8", tag=None),
}

class D:
    def __init__(self, w, h):
        self.w, self.h, self.boxes, self.parts = w, h, {}, []

    def box(self, key, col, y, title, sub="", kind="code", w=W_BOX, h=H_BOX, x=None, dashed=False):
        x = COLS[col] if x is None else x
        self.boxes[key] = (x, y, w, h)
        st = STYLE[kind]
        dash = ' stroke-dasharray="6 6"' if dashed else ""
        p = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{st["fill"]}" stroke="{st["stroke"]}" stroke-width="1.5"{dash}/>']
        ty = y + 40
        if st["tag"]:
            color = st["stroke"]
            p.append(f'<text x="{x + w - 18}" y="{y + 28}" text-anchor="end" font-family="{MONO}" font-size="13" letter-spacing="1.5" fill="{color}">{st["tag"]}</text>')
        p.append(f'<text x="{x + 20}" y="{ty}" font-family="{FONT}" font-size="21" font-weight="600" fill="#F4F6FB">{escape(title)}</text>')
        for i, line in enumerate(sub.split("\n") if sub else []):
            p.append(f'<text x="{x + 20}" y="{ty + 28 + i * 23}" font-family="{FONT}" font-size="16" fill="#A7B0C4">{escape(line)}</text>')
        self.parts.append("\n".join(p))

    def _pt(self, key, side):
        x, y, w, h = self.boxes[key]
        side, _, off = side.partition("+")
        dx = float(off or 0)
        return {"l": (x, y + h / 2), "r": (x + w, y + h / 2), "t": (x + w / 2 + dx, y), "b": (x + w / 2 + dx, y + h)}[side]

    def arrow(self, a, sa, b, sb, via=None, dashed=False, label=None, label_at=None):
        x1, y1 = self._pt(a, sa)
        x2, y2 = self._pt(b, sb)
        sa, sb = sa[0], sb[0]
        pts = [(x1, y1)] + (via or []) + [(x2, y2)]
        if not via and x1 != x2 and y1 != y2:
            # elbow: vertical exit then horizontal then vertical entry
            if sa in "tb":
                my = (y1 + y2) / 2
                pts = [(x1, y1), (x1, my), (x2, my), (x2, y2)]
            else:
                mx = (x1 + x2) / 2
                pts = [(x1, y1), (mx, y1), (mx, y2), (x2, y2)]
        d = "M " + " L ".join(f"{px:.0f} {py:.0f}" for px, py in pts)
        dash = ' stroke-dasharray="6 6"' if dashed else ""
        self.parts.append(f'<path d="{d}" fill="none" stroke="#7A859F" stroke-width="2"{dash} marker-end="url(#arrow)"/>')
        if label:
            lx, ly = label_at
            self.parts.append(f'<text x="{lx}" y="{ly}" font-family="{MONO}" font-size="14" fill="#7A859F">{escape(label)}</text>')

    def text(self, x, y, s, size=14, color="#7A859F", mono=True, anchor="start"):
        f = MONO if mono else FONT
        self.parts.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{f}" font-size="{size}" letter-spacing="{1.5 if mono else 0}" fill="{color}">{escape(s)}</text>')

    def legend(self, x, y):
        items = [("llm", "LLM step"), ("code", "Plain code"), ("store", "Data store")]
        for i, (k, label) in enumerate(items):
            st = STYLE[k]
            cx = x + i * 170
            self.parts.append(f'<rect x="{cx}" y="{y - 14}" width="18" height="18" rx="5" fill="{st["fill"]}" stroke="{st["stroke"]}" stroke-width="1.5"/>')
            self.text(cx + 28, y, label, size=15, color="#A7B0C4", mono=False)

    def svg(self, title):
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" role="img" aria-label="{escape(title)}">
<title>{escape(title)}</title>
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7A859F"/></marker></defs>
<rect width="100%" height="100%" fill="#0C1220"/>
{chr(10).join(self.parts)}
</svg>
'''

def haqqi():
    d = D(1600, 1060)
    R = [70, 330, 590, 850]
    d.box("w", 0, R[0], "Worker on a phone", "voice or text, 8 languages", "io")
    d.box("stt", 1, R[0], "Whisper speech-to-text", "Cloudflare Workers AI")
    d.box("ui", 2, R[0], "Next.js web app", "Vercel")
    d.box("api", 3, R[0], "FastAPI service", "REST + live progress, Render")
    d.box("in", 3, R[1], "Intake agent", "facts from the story", "llm")
    d.box("rt", 2, R[1], "Routing", "out of scope → referral, MOHRE 80084\nmissing facts → ask the worker", h=H_BOX)
    d.box("cf", 1, R[1], "Worker confirms facts", "emirate, dates, wages, leave")
    d.box("db", 0, R[1], "Supabase Postgres", "pgvector law index, cases\n7-day purge", "store")
    d.box("ret", 0, R[2], "Hybrid law search", "BGE-M3 vectors + full text, RRF")
    d.box("calc", 1, R[2], "Claim calculator", "deterministic Python")
    d.box("an", 2, R[2], "Analyst agent", "findings with clause ids", "llm")
    d.box("chk", 3, R[2], "Citation check", "drops any clause not retrieved")
    d.box("cr", 3, R[3], "Critic agent", "one revision, then re-check", "llm")
    d.box("wr", 2, R[3], "Writer agent", "plain explanation + letter facts", "llm")
    d.box("pdf", 1, R[3], "Arabic complaint PDF", "WeasyPrint, amounts filled by code", "io")
    d.arrow("w", "r", "stt", "l"); d.arrow("stt", "r", "ui", "l"); d.arrow("ui", "r", "api", "l")
    d.arrow("api", "b", "in", "t"); d.arrow("in", "l", "rt", "r"); d.arrow("rt", "l", "cf", "r")
    d.arrow("db", "b+-80", "ret", "t+-80", dashed=True)
    d.arrow("cf", "b", "ret", "t+80", via=[(595, 520), (285, 520)])
    d.arrow("cf", "b", "calc", "t")
    d.arrow("ret", "b", "an", "b", via=[(205, 750), (985, 750)])
    d.arrow("calc", "r", "an", "l"); d.arrow("an", "r", "chk", "l")
    d.arrow("chk", "b", "cr", "t"); d.arrow("cr", "l", "wr", "r"); d.arrow("wr", "l", "pdf", "r")
    d.legend(40, 1010)
    return d.svg("Haqqi architecture: from a worker's story to a cited verdict, an itemised claim and an Arabic complaint PDF")

def coverage():
    d = D(1600, 800)
    R = [70, 330, 590]
    d.box("in", 0, R[0], "Article URL or text", "paste mode as fallback", "io")
    d.box("ui", 1, R[0], "Next.js web app", "intake, kit view, library · Vercel")
    d.box("api", 2, R[0], "FastAPI", "Google Cloud Run\n202 Accepted + background job")
    d.box("fetch", 3, R[0], "Fetch + clean", "Trafilatura, 24k character cap")
    d.box("s1", 3, R[1], "1 · Extract", "temp 0 · 8–20 verbatim sentences\nsubstring integrity check", "llm")
    d.box("s2", 2, R[1], "2 · Generate", "temp 0.4 · source sentences only\n5 assets", "llm")
    d.box("s3", 1, R[1], "3 · Verify", "programmatic checks (ids, numbers)\n+ LLM claim verifier", "llm")
    d.box("out", 0, R[1], "Clean copy export", "no citation markers in the text", "io")
    d.box("gem", 2, R[2], "Gemini", "behind a swappable LLMClient")
    d.box("db", 1, R[2], "Supabase Postgres", "kits, assets, claims,\nverification runs, LLM calls", "store")
    d.box("ci", 3, R[2], "CI eval harness", "seeded hallucinations: 3/3 types caught")
    d.arrow("in", "r", "ui", "l"); d.arrow("ui", "r", "api", "l"); d.arrow("api", "r", "fetch", "l")
    d.arrow("fetch", "b", "s1", "t"); d.arrow("s1", "l", "s2", "r"); d.arrow("s2", "l", "s3", "r"); d.arrow("s3", "l", "out", "r")
    d.arrow("gem", "t", "s2", "b", dashed=True)
    d.arrow("s3", "b", "db", "t", dashed=True)
    d.legend(40, 760)
    return d.svg("Coverage Amplifier architecture: extract, generate and verify stages grounded in the article's own sentences")

def cardshield():
    d = D(1600, 1080)
    R = [90, 350, 650, 910]
    d.text(40, 50, "OFFLINE · TRAINING")
    d.box("data", 0, R[0], "creditcard.csv", "SHA-256 pinned", "store")
    d.box("split", 1, R[0], "Time-based split", "60 / 20 / 20")
    d.box("train", 2, R[0], "Train 4 models", "LR, RF, XGBoost, LightGBM")
    d.box("th", 3, R[0], "Cost-based threshold", "chosen on validation")
    d.box("ml", 3, R[1], "MLflow", "tracking + registry", "store")
    d.box("ex", 2, R[1], "Export champion", "model.txt + metadata.json")
    d.text(40, 610, "ONLINE · SERVING (DOCKER)")
    d.box("cl", 1, R[2], "Client", "payment to score", "io")
    d.box("api", 2, R[2], "FastAPI /v1/score", "decision + top 3 SHAP reasons\n13 ms p95 · /metrics")
    d.box("log", 3, R[2], "Prediction log", "SQLite", "store")
    d.text(40, 870, "MONITORING")
    d.box("ref", 2, R[3], "Reference sample", "validation period", "store")
    d.box("dr", 3, R[3], "Evidently drift report", "PSI fallback · drift.html")
    d.arrow("data", "r", "split", "l"); d.arrow("split", "r", "train", "l"); d.arrow("train", "r", "th", "l")
    d.arrow("th", "b", "ml", "t"); d.arrow("ml", "l", "ex", "r")
    d.arrow("ex", "b", "api", "t"); d.arrow("cl", "r", "api", "l"); d.arrow("api", "r", "log", "l")
    d.arrow("log", "b", "dr", "t"); d.arrow("ref", "r", "dr", "l")
    d.legend(40, 1040)
    return d.svg("CardShield architecture: offline training with MLflow, FastAPI serving with SHAP reasons, and drift monitoring")

out = sys.argv[1]
for name, fn in [("haqqi", haqqi), ("coverage-amplifier", coverage), ("cardshield", cardshield)]:
    open(f"{out}/{name}.svg", "w").write(fn())
print("ok")
