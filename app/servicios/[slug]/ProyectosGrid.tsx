"use client";
import Link from "next/link";
import { useState } from "react";

type Proyecto = { _id: string; name: string; slug: { current: string }; coverUrl: string };

export default function ProyectosGrid({ proyectos }: { proyectos: Proyecto[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "8px",
    }}>
      {proyectos.map((p) => <ProyectoCard key={p._id} proyecto={p} />)}
    </div>
  );
}

function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/proyectos/${proyecto.slug.current}`} style={{ textDecoration: "none" }}>
      <div style={{ overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
        <img
          src={proyecto.coverUrl}
          alt={proyecto.name}
          loading="lazy"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "40px 16px 16px",
          background: "linear-gradient(to top, rgba(43,37,32,0.6) 0%, transparent 100%)",
        }}>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#f2ede8" }}>
            {proyecto.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
