import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { hero, identity } from "@/content";

export const alt = "Himasri Allu | AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The hero portrait as a data URL, or null while it has not been supplied. */
function portrait(): string | null {
  const file = path.join(process.cwd(), "public/photos/portrait.jpg");
  if (!fs.existsSync(file)) return null;
  return `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
}

export default function OgImage() {
  const photo = portrait();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#070B14",
          backgroundImage: "radial-gradient(circle at 15% 10%, rgba(142,168,216,0.14), transparent 50%)",
          color: "#F4F6FB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#A7B0C4", textTransform: "uppercase" }}>
            himasriallu.com
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: photo ? 104 : 128,
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
            <div style={{ display: "flex", marginTop: 16, fontSize: 26, color: "#A7B0C4" }}>{identity.location}</div>
          </div>
        </div>
        {photo && (
          <img
            src={photo}
            alt=""
            width={360}
            height={360}
            style={{ borderRadius: 9999, border: "2px solid rgba(255,255,255,0.18)", objectFit: "cover" }}
          />
        )}
      </div>
    ),
    size,
  );
}
