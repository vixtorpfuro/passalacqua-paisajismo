"use client";
import { useState } from "react";
import Link from "next/link";

export default function ProjectCardClient({
  name,
  href,
  coverUrl,
  aspect = "3/4",
}: {
  name: string;
  href: string;
  coverUrl: string;
  aspect?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{ aspectRatio: aspect, overflow: "hidden", position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={name}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transition: "transform 0.5s",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", backgroundColor: "#ddd4c8" }} />
        )}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(43,37,32,0.4)",
          display: "flex", alignItems: "flex-end", padding: "16px",
          opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease",
        }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "#f2ede8", letterSpacing: "0.04em" }}>
            {name}
          </span>
        </div>
      </div>
      <div style={{ backgroundColor: "#ddd4c8", padding: "10px 12px 12px" }}>
        <div style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>{name}</div>
      </div>
    </Link>
  );
}
