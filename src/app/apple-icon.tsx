import { ImageResponse } from "next/og";
import { TOKENS } from "@/app/lab/_lib/tokens";
import { logoSvg } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: the [AM] logo on the dark Sage background (iOS rounds the corners itself).
const t = TOKENS.sage.dark;
const src = `data:image/svg+xml;base64,${Buffer.from(logoSvg({ text: t.text, accent: t.accent })).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: t.bg }}>
        <img src={src} width={124} height={92} alt="" />
      </div>
    ),
    { ...size },
  );
}
