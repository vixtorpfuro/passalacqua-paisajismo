"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const categories = [
  "TODOS",
  "RESIDENCIAL",
  "CORPORATIVO",
  "HOTELERÍA",
  "ZONA ÁRIDA",
  "AZOTEAS",
];

const projects = [
  {
    id: "cerro-manquehue",
    name: "Cerro Manquehue",
    location: "Santiago",
    year: "2016",
    type: "Residencial Costero",
    category: "RESIDENCIAL",
    image: "/proyectos/cerro-manquehue/_MGL6063.jpg",
    featured: true,
    description:
      "Un jardín en las laderas del cerro Manquehue que integra la vegetación nativa con especies mediterráneas, creando espacios de contemplación y bienestar.",
  },
  {
    id: "margo",
    name: "Margo",
    location: "Santiago",
    year: "2016",
    type: "Restaurante",
    category: "CORPORATIVO",
    image: "/home/portrait-01.jpg",
  },
  {
    id: "jardin-via-roja",
    name: "Jardín Vía Roja",
    location: "Santiago",
    year: "2016",
    type: "Residencial Urbano",
    category: "RESIDENCIAL",
    image: "/home/14-casa-via-roja@2x.webp",
  },
  {
    id: "casa-plaza",
    name: "Casa Plaza",
    location: "Cachagua",
    year: "2016",
    type: "Residencial Costero",
    category: "RESIDENCIAL",
    image: "/home/garden-06.jpg",
  },
  {
    id: "cerro-manquehue-2",
    name: "Cerro Manquehue",
    location: "Santiago",
    year: "2016",
    type: "Residencial Costero",
    category: "RESIDENCIAL",
    image: "/proyectos/cerro-manquehue/_MGL6017.jpg",
  },
  {
    id: "falabella",
    name: "Falabella",
    location: "Santiago",
    year: "2016",
    type: "Oficinas",
    category: "CORPORATIVO",
    image: "/home/portrait-02.jpg",
  },
];

export default function ProyectosPage() {
  const [activeCategory, setActiveCategory] = useState("TODOS");

  const featured = projects.find((p) => p.featured);
  const grid = projects.filter((p) => !p.featured);

  const filteredGrid =
    activeCategory === "TODOS"
      ? grid
      : grid.filter((p) => p.category === activeCategory);

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Category filter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          borderTop: "1px solid rgba(43,37,32,0.15)",
          borderBottom: "1px solid rgba(43,37,32,0.15)",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              fontWeight: "500",
              padding: "10px 20px",
              whiteSpace: "nowrap",
              color: activeCategory === cat ? "#c8873a" : "#2b2520",
              borderBottom: activeCategory === cat ? "2px solid #c8873a" : "2px solid transparent",
              background: "none",
              border: "none",
              borderBottomStyle: "solid",
              borderBottomWidth: "2px",
              borderBottomColor: activeCategory === cat ? "#c8873a" : "transparent",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured project */}
      {featured && (activeCategory === "TODOS" || activeCategory === featured.category) && (
        <AnimatedSection delay={0} style={{ padding: "20px 24px 20px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "58fr 42fr",
            gap: "16px",
          }}>
            {/* Image */}
            <div style={{ overflow: "hidden", height: "480px" }}>
              <img
                src="/home/14-casa-via-roja@2x.webp"
                alt={featured.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {/* Text panel */}
            <div
              style={{
                backgroundColor: "#ddd4c8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "24px",
              }}
            >
              <h1
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "700",
                  lineHeight: 1.0,
                  letterSpacing: "-0.01em",
                  color: "#2b2520",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {featured.name.split(" ").map((word, i) => (
                  <span key={i} style={{ display: "block" }}>{word}</span>
                ))}
              </h1>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#2b2520" }}>
                {featured.description}
              </p>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Projects grid */}
      <div style={{ padding: "0 24px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
          }}
        >
          {filteredGrid.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 80}>
            <Link
              href={`/proyectos/${project.id}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s",
                  }}
                />
              </div>
              <div style={{ backgroundColor: "#ddd4c8", padding: "12px 14px 16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>
                  {project.name}
                </div>
                <div style={{ fontSize: "11px", marginTop: "3px", color: "rgba(43,37,32,0.65)" }}>
                  {project.location} · {project.year} · {project.type}
                </div>
              </div>
            </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
