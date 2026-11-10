import { ImageResponse } from "next/og";
import { siteName, siteTagline } from "@/lib/metadata";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px 104px",
          backgroundColor: "#0a0a0b",
          color: "#edebe6",
        }}
      >
        <div
          style={{
            width: 88,
            height: 1,
            backgroundColor: "#c8a24d",
            marginBottom: 48,
          }}
        />
        <div
          style={{
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            maxWidth: 900,
          }}
        >
          {siteName}
        </div>
        {siteTagline ? (
          <div
            style={{
              marginTop: 34,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#8f8d87",
              maxWidth: 780,
            }}
          >
            {siteTagline}
          </div>
        ) : null}
      </div>
    ),
    size,
  );
}
