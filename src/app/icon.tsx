import { ImageResponse } from "next/og";
import { TOKENS } from "@/shared/config";
import { logoSvg } from "@/shared/lib/logo";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: the [AM] logo on a dark Sage tile, which stays readable on light and dark browser tabs.
const t = TOKENS.sage.dark;
const src = `data:image/svg+xml;base64,${Buffer.from(logoSvg({ text: t.text, accent: t.accent })).toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: t.bg,
        borderRadius: 6,
      }}
    >
      <img src={src} width={29} height={21.5} alt="" />
    </div>,
    { ...size },
  );
}
