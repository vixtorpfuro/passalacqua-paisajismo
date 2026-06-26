"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

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
    image: "/home/27.CASA-IRARRAZAVALCVRDSC_5730-131017@2x.webp",
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
    image: "/home/27.CASA-IRARRAZAVALCVRDSC_7287-210218@2x.webp",
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
        <div style={{ padding: "20px 24px 0" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "58% 42%",
            gap: "16px",
            border: "1px solid rgba(43,37,32,0.12)",
            backgroundColor: "#ddd4c8",
          }}>
            {/* Image */}
            <div style={{ overflow: "hidden", height: "460px" }}>
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
                padding: "40px 44px",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: "#2b2520",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {featured.name.split(" ").map((word, i) => (
                  <span key={i} style={{ display: "block" }}>{word}</span>
                ))}
              </h1>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#2b2520", maxWidth: "320px" }}>
                {featured.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Projects grid */}
      <div style={{ padding: "20px 24px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
          }}
        >
          {filteredGrid.map((project) => (
            <Link
              key={project.id}
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
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
