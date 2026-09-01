"use client";
import { useState } from "react";
import { BackButtonInline, BackButtonFull } from "./BackButton";

type ImageItem = {
  url: string;
  aspectRatio: number;
};

type Props = {
  name: string;
  type?: string[];
  location?: string;
  year?: string;
  description?: string;
  coverUrl: string | null;
  images: ImageItem[];
  backUrl: string;
};

export default function ProyectoContent({ name, type, location, year, description, coverUrl, images, backUrl }: Props) {
  const [infoOpen, setInfoOpen] = useState(false);

  // Agrupar: verticales de a pares, horizontales solas
  type Group =
    | { kind: "single"; img: ImageItem }
    | { kind: "pair"; imgs: [ImageItem, ImageItem] }
    | { kind: "solo-v"; img: ImageItem };

  const groups: Group[] = [];
  let i = 0;
  while (i < images.length) {
    const cur = images[i];
    if (cur.aspectRatio < 1) {
      const next = images[i + 1];
      if (next && next.aspectRatio < 1) {
        groups.push({ kind: "pair", imgs: [cur, next] });
        i += 2;
      } else {
        groups.push({ kind: "solo-v", img: cur });
        i += 1;
      }
    } else {
      groups.push({ kind: "single", img: cur });
      i += 1;
    }
  }

  const meta = [type?.join(", "), location, year].filter(Boolean).join(" · ");

  return (
    <>
      {/* Hero */}
      {coverUrl && (
        <div style={{ width: "100%", height: "80vh", overflow: "hidden" }}>
          <img
            src={coverUrl}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
          />
        </div>
      )}

      {/* Header */}
      <div style={{ padding: "48px 72px 40px", borderBottom: "1px solid rgba(43,37,32,0.12)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            {meta && (
              <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", textTransform: "uppercase", marginBottom: "10px" }}>
                {meta}
              </div>
            )}
            <h1 style={{
              fontSize: "2.4rem", fontWeight: "700", lineHeight: 1.05,
              color: "#2b2520", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0,
            }}>
              {name}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", paddingTop: "8px" }}>
            {description && (
              <button
                onClick={() => setInfoOpen(!infoOpen)}
                style={{
                  fontSize: "11px", letterSpacing: "0.15em", fontWeight: "600",
                  color: "#2b2520", background: "none", border: "1.5px solid rgba(43,37,32,0.3)",
                  cursor: "pointer", padding: "8px 18px", fontFamily: "inherit",
                }}
              >
                {infoOpen ? "— INFO" : "+ INFO"}
              </button>
            )}
            <BackButtonInline backUrl={backUrl} />
          </div>
        </div>

        {/* Descripción expandible */}
        <div style={{ maxHeight: infoOpen ? "400px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#2b2520", fontStyle: "italic", maxWidth: "680px", margin: "28px 0 0" }}>
            {description}
          </p>
        </div>
      </div>

      {/* Galería */}
      <div style={{ padding: "32px 72px 100px" }}>
        {groups.map((g, idx) => {
          if (g.kind === "single") {
            return (
              <div key={idx} style={{ width: "100%", marginBottom: "8px", overflow: "hidden" }}>
                <img src={g.img.url} alt="" style={{ width: "100%", display: "block" }} />
              </div>
            );
          }
          if (g.kind === "pair") {
            return (
              <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                {g.imgs.map((img, j) => (
                  <div key={j} style={{ overflow: "hidden" }}>
                    <img src={img.url} alt="" style={{ width: "100%", display: "block" }} />
                  </div>
                ))}
              </div>
            );
          }
          return (
            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
              <div style={{ overflow: "hidden" }}>
                <img src={g.img.url} alt="" style={{ width: "100%", display: "block" }} />
              </div>
              <div />
            </div>
          );
        })}
      </div>

      {/* Volver */}
      <div style={{ padding: "40px 72px 60px", borderTop: "1px solid rgba(43,37,32,0.12)" }}>
        <BackButtonFull backUrl={backUrl} />
      </div>
    </>
  );
}
