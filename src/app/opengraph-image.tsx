import { ImageResponse } from "next/og";

export const alt = "Ali Moradi — Senior Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1C1C1C",
          color: "#E6E6E6",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #282727 1px, transparent 1px), linear-gradient(to bottom, #282727 1px, transparent 1px)",
            backgroundSize: "86px 86px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#8A8A8A",
            fontWeight: 300,
          }}
        >
          <span>01. SENIOR FRONT-END DEVELOPER</span>
          <span>02. TEHRAN BASED</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 430,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 300,
                letterSpacing: -2,
                lineHeight: 0.92,
                color: "#E6E6E6",
              }}
            >
              Ali
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 300,
                letterSpacing: -2,
                lineHeight: 0.92,
                color: "#E6E6E6",
              }}
            >
              Moradi
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 16,
                fontWeight: 300,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#3FD0B8",
              }}
            >
              Senior Frontend Developer
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 18,
                fontWeight: 300,
                lineHeight: 1.45,
                color: "#D4D4D4",
              }}
            >
              7+ years building enterprise dashboards for big data products.
            </div>
          </div>
          <div
            style={{
              width: 520,
              height: 360,
              borderRadius: 220,
              background:
                "radial-gradient(ellipse 70% 58% at 48% 52%, rgba(230,230,230,0.38) 0%, rgba(230,230,230,0.08) 46%, transparent 72%)",
              flexShrink: 0,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8A8A8A",
            fontWeight: 300,
          }}
        >
          <span>
            <span style={{ color: "#3FD0B8" }}>ALI</span>MORADI
          </span>
          <span>04. OPEN TO WORK</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
