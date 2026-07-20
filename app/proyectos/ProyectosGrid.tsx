"use client";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCardClient from "./ProjectCardClient";

const CATEGORIAS = [
  "Todos",
  "Corporativo",
  "Residencial",
  "Hotelería y Entretenimiento",
  "Azoteas y Terrazas",
  "Casas Playa",
  "Casas Sur",
  "Inmobiliarias",
];

type Proyecto = {
  _id: string;
  name: string;
  slug: { current: string };
  type?: string;
  coverUrl: string;
};

export default function ProyectosGrid({ proyectos }: { proyectos: Proyecto[] }) {
  const [activa, setActiva] = useState("Todos");

  const filtrados = activa === "Todos"
    ? proyectos
    : proyectos.filter((p) => p.type === activa);

  const secondary = filtrados.slice(0, 21);
  const more = filtrados.slice(21);

  return (
    <>
      {/* Filtros */}
      <div style={{
        padding: "20px 24px 0",
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
      }}>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiva(cat)}
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              fontWeight: activa === cat ? "700" : "500",
              padding: "7px 16px",
              border: activa === cat ? "1.5px solid #2b2520" : "1.5px solid rgba(43,37,32,0.25)",
              backgroundColor: activa === cat ? "#2b2520" : "transparent",
              color: activa === cat ? "#f2ede8" : "#2b2520",
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grilla secundaria — 3 col */}
      <AnimatedSection delay={50}>
        <div style={{ padding: "8px 24px 0" }}>
          {filtrados.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "rgba(43,37,32,0.4)", fontSize: "13px", letterSpacing: "0.1em" }}>
              SIN PROYECTOS EN ESTA CATEGORÍA
            </div>
          ) : (
            <div className="grid-3col">
              {secondary.map((p) => (
                <ProjectCardClient
                  key={p._id}
                  name={p.name}
                  href={`/proyectos/${p.slug.current}`}
                  coverUrl={p.coverUrl}
                  aspect="4/3"
                />
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Más proyectos — 5 col */}
      {more.length > 0 && (
        <AnimatedSection delay={80}>
          <div style={{ padding: "8px 24px 40px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.45)", margin: "24px 0 16px" }}>
              MÁS PROYECTOS
            </div>
            <div className="grid-5col">
              {more.map((p) => (
                <ProjectCardClient
                  key={p._id}
                  name={p.name}
                  href={`/proyectos/${p.slug.current}`}
                  coverUrl={p.coverUrl}
                  aspect="3/4"
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  );
}
