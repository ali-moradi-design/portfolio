import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          color: "#3FD0B8",
          fontSize: 12,
          fontWeight: 300,
          letterSpacing: 1,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        AM
      </div>
    ),
    { ...size },
  );
}
