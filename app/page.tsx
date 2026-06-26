"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

const slides = [
  "/home/07-casa-via-roja@2x.webp",
  "/home/27.CASA-IRARRAZAVALCVRDSC_5730-131017@2x.webp",
  "/home/14-casa-via-roja@2x.webp",
  "/home/27.CASA-IRARRAZAVALCVRDSC_7287-210218@2x.webp",
  "/home/garden-06.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setPrev(current);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setFading(false);
        setPrev(null);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div style={{ backgroundColor: "#f2ede8" }}>
      <Header />
      {/* Hero slideshow */}
      <div style={{ position: "relative", width: "100%", height: "calc(100vh - 73px)", overflow: "hidden" }}>
        {/* Previous image fading out */}
        {prev !== null && (
          <img
            src={slides[prev]}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: fading ? 0 : 1,
              transition: "opacity 1s ease-in-out",
            }}
          />
        )}
        {/* Current image */}
        <img
          key={current}
          src={slides[current]}
          alt="Passalacqua Paisajismo"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: fading ? 0 : 1,
            transition: "opacity 1s ease-in-out",
          }}
        />
        {/* Dot indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: i === current ? "#c8873a" : "rgba(255,255,255,0.6)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
