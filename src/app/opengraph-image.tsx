import { ImageResponse } from "next/og";
import { hero, identity } from "@/content";

export const alt = "Himasri Allu | AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#070B14",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(142,168,216,0.14), transparent 50%)",
          color: "#F4F6FB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#A7B0C4", textTransform: "uppercase" }}>
          himasriallu.com
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              backgroundImage: "linear-gradient(100deg, #F4F6FB, #B9C1D4)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {identity.name}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 44, color: "#F4F6FB" }}>{hero.roles[0]}</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {hero.proofChips.map((c) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                padding: "12px 20px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(12,18,32,0.8)",
                fontSize: 22,
                color: "#A7B0C4",
              }}
            >
              {`${c.prefix}${c.value}${c.suffix} ${c.label}`.slice(0, 44)}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
