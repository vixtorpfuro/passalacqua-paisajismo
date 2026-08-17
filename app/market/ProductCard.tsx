"use client";
import { useState } from "react";
import Link from "next/link";

type Product = { slug: string; name: string; image: string; price: string; description?: string };

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/market/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{ aspectRatio: "1/1", overflow: "hidden", position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(43,37,32,0.45)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}>
          <div style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "0.05em", color: "#f2ede8", textAlign: "center", marginBottom: "4px" }}>
            {product.name}
          </div>
          {product.description && (
            <div style={{ fontSize: "11px", color: "rgba(242,237,232,0.65)", marginBottom: "6px", letterSpacing: "0.04em" }}>{product.description}</div>
          )}
          <div style={{ fontSize: "13px", color: "rgba(242,237,232,0.8)" }}>{product.price}</div>
        </div>
      </div>
    </Link>
  );
}
