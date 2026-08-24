"use client";
import { useState } from "react";
import Link from "next/link";
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
  type?: string[];
  featured?: boolean;
  coverUrl: string;
  coverUrlLarge?: string;
  description?: string;
};

export default function ProyectosGrid({ proyectos }: { proyectos: Proyecto[] }) {
  const [activa, setActiva] = useState("Todos");

  const filtrados = activa === "Todos"
    ? proyectos
    : proyectos.filter((p) => p.type?.includes(activa));

  // Primer proyecto con featured=true en la categoría activa
  const featuredP = activa !== "Todos"
    ? filtrados.find((p) => p.featured)
    : null;

  const sinDestacado = featuredP
    ? filtrados.filter((p) => p._id !== featuredP._id)
    : filtrados;

  const secondary = sinDestacado.slice(0, 21);
  const more = sinDestacado.slice(21);

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

      {/* Proyecto destacado de la categoría */}
      {featuredP && (featuredP.coverUrlLarge || featuredP.coverUrl) && (
        <div style={{ padding: "16px 24px 0" }}>
          <Link href={`/proyectos/${featuredP.slug.current}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
              <img
                src={featuredP.coverUrlLarge || featuredP.coverUrl}
                alt={featuredP.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(43,37,32,0.65) 0%, transparent 55%)",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "28px 32px",
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(242,237,232,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>
                    DESTACADO
                  </div>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#f2ede8", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0 }}>
                    {featuredP.name}
                  </h2>
                  {featuredP.description && (
                    <p style={{ fontSize: "0.9rem", color: "rgba(242,237,232,0.8)", marginTop: "6px", fontStyle: "italic", maxWidth: "500px" }}>
                      {featuredP.description}
                    </p>
                  )}
                </div>
                <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#f2ede8", fontWeight: "700", whiteSpace: "nowrap", paddingLeft: "24px" }}>
                  VER PROYECTO →
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

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
