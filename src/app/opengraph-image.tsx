import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, person, TOKENS } from "@/shared/config";
import { logoSvg } from "@/shared/lib/logo";

export const alt = `${person.name}, ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview in the Sage light palette: the [AM] logo, the name in Huninn, the role and the bio,
// framed by the corner ticks of the hero inspector. Read once at module scope; nothing depends on the request.
const t = TOKENS.sage.light;
const huninn = await readFile(
  join(process.cwd(), "src/app/fonts/huninn-latin.ttf"),
);
const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg({ text: t.text, accent: t.accent })).toString("base64")}`;

const tick = (pos: Record<string, number>, sides: string[]) => (
  <div
    style={{
      position: "absolute",
      width: 28,
      height: 28,
      ...pos,
      ...Object.fromEntries(
        sides.map((s) => [`border${s}`, `3px solid ${t.accent}`]),
      ),
    }}
  />
);

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        background: t.bg,
        backgroundImage: `radial-gradient(circle, ${t.border} 1.4px, transparent 1.6px)`,
        backgroundSize: "24px 24px",
        color: t.text,
        fontFamily: "Huninn",
        position: "relative",
      }}
    >
      {tick({ left: 40, top: 40 }, ["Left", "Top"])}
      {tick({ right: 40, top: 40 }, ["Right", "Top"])}
      {tick({ left: 40, bottom: 40 }, ["Left", "Bottom"])}
      {tick({ right: 40, bottom: 40 }, ["Right", "Bottom"])}
      <div
        style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26 }}
      >
        <img src={logo} width={76} height={56} alt="" />
        <span style={{ color: t.muted }}>
          {person.role}, {person.location}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 124, lineHeight: 1, letterSpacing: -3 }}>
          {person.name}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: t.muted,
            maxWidth: 900,
          }}
        >
          {hero.bio}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: t.muted,
        }}
      >
        <span>ali-moradi-develop.com</span>
        <span style={{ color: t.accent }}>Open to remote roles</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Huninn", data: huninn, weight: 400, style: "normal" }],
    },
  );
}
