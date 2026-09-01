"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCardClient from "./ProjectCardClient";
import FeaturedCarousel from "./FeaturedCarousel";

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

type CarouselItem = { slug: string; name: string; coverUrl: string; description: string };

export default function ProyectosGrid({
  proyectos,
  carouselItems = [],
}: {
  proyectos: Proyecto[];
  carouselItems?: CarouselItem[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activa, setActiva] = useState(() => searchParams.get("cat") ?? "Todos");

  useEffect(() => {
    const cat = searchParams.get("cat") ?? "Todos";
    setActiva(cat);
  }, [searchParams]);

  const seleccionar = (cat: string) => {
    const params = new URLSearchParams(window.location.search);
    if (cat === "Todos") params.delete("cat");
    else params.set("cat", cat);
    const qs = params.toString();
    router.replace(`/proyectos${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const filtrados = activa === "Todos"
    ? proyectos
    : proyectos.filter((p) => p.type?.includes(activa));

  // Primer proyecto con featured=true en la categoría activa
  const featuredP = activa !== "Todos"
    ? filtrados.find((p) => p.featured)
    : null;

  const secondary = filtrados.slice(0, 21);
  const more = filtrados.slice(21);

  return (
    <>
      {/* Hero: carrusel en "Todos", destacado de categoría cuando hay filtro */}
      {activa === "Todos" && carouselItems.length > 0 && (
        <div style={{ padding: "24px 24px 0" }}>
          <FeaturedCarousel items={carouselItems} />
        </div>
      )}
      {featuredP && (featuredP.coverUrlLarge || featuredP.coverUrl) && (
        <div style={{ padding: "24px 24px 0" }}>
          <Link href={`/proyectos/${featuredP.slug.current}?cat=${encodeURIComponent(activa)}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
            <div className="grid-hero">
              <div style={{ overflow: "hidden", height: "520px" }}>
                <img
                  src={featuredP.coverUrlLarge || featuredP.coverUrl}
                  alt={featuredP.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{
                backgroundColor: "#ddd4c8", display: "flex", flexDirection: "column",
                justifyContent: "flex-end", padding: "32px",
              }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "16px" }}>
                  PROYECTO DESTACADO
                </div>
                <h2 style={{
                  fontSize: "2.6rem", fontWeight: "700", lineHeight: 1.0,
                  letterSpacing: "-0.01em", color: "#2b2520", textTransform: "uppercase",
                  marginBottom: "16px",
                }}>
                  {featuredP.name.split(" ").map((w, i) => <span key={i} style={{ display: "block" }}>{w}</span>)}
                </h2>
                {featuredP.description && (
                  <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#2b2520" }}>
                    {featuredP.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}

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
            onClick={() => seleccionar(cat)}
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
                  href={activa === "Todos" ? `/proyectos/${p.slug.current}` : `/proyectos/${p.slug.current}?cat=${encodeURIComponent(activa)}`}
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
                  href={activa === "Todos" ? `/proyectos/${p.slug.current}` : `/proyectos/${p.slug.current}?cat=${encodeURIComponent(activa)}`}
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
