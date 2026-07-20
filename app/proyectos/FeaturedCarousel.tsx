"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type FeaturedItem = {
  slug: string;
  name: string;
  coverUrl: string;
  description: string;
};

export default function FeaturedCarousel({ items }: { items: FeaturedItem[] }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    if (next === idx) return;
    setFading(true);
    setTimeout(() => { setIdx(next); setFading(false); }, 400);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo((idx + 1) % items.length), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const item = items[idx];

  return (
    <Link href={`/proyectos/${item.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="grid-hero">
        <div style={{ overflow: "hidden", height: "520px", position: "relative" }}>
          <img
            key={item.slug}
            src={item.coverUrl}
            alt={item.name}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              opacity: fading ? 0 : 1, transition: "opacity 0.4s ease",
            }}
          />
        </div>
        <div style={{
          backgroundColor: "#ddd4c8", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "32px", position: "relative",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "16px" }}>
            PROYECTO DESTACADO
          </div>
          <h1 style={{
            fontSize: "2.6rem", fontWeight: "700", lineHeight: 1.0,
            letterSpacing: "-0.01em", color: "#2b2520", textTransform: "uppercase",
            marginBottom: "16px", opacity: fading ? 0 : 1, transition: "opacity 0.4s ease",
          }}>
            {item.name.split(" ").map((w, i) => <span key={i} style={{ display: "block" }}>{w}</span>)}
          </h1>
          <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#2b2520", marginBottom: "28px", opacity: fading ? 0 : 1, transition: "opacity 0.4s ease" }}>
            {item.description}
          </p>
          <div style={{ display: "flex", gap: "8px" }} onClick={(e) => e.preventDefault()}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); goTo(i); }}
                style={{
                  width: i === idx ? "24px" : "8px", height: "8px", borderRadius: "4px",
                  backgroundColor: i === idx ? "#c8873a" : "rgba(43,37,32,0.25)",
                  border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
