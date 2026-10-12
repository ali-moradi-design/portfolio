import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1C1C1C",
          color: "#E6E6E6",
          fontSize: 54,
          fontWeight: 300,
          letterSpacing: 4,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <span style={{ color: "#3FD0B8" }}>A</span>
        <span>M</span>
      </div>
    ),
    { ...size },
  );
}
