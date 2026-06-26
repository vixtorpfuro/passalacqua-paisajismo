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
              padding: "14px 24px",
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
        <div className="flex" style={{ minHeight: "500px" }}>
          {/* Image */}
          <div className="flex-1" style={{ maxWidth: "60%" }}>
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full h-full object-cover"
              style={{ maxHeight: "560px" }}
            />
          </div>
          {/* Text */}
          <div
            className="flex-1 flex flex-col justify-end p-12"
            style={{ backgroundColor: "#f2ede8" }}
          >
            <h1
              className="font-bold uppercase leading-tight mb-4"
              style={{ fontSize: "2.5rem", color: "#2b2520" }}
            >
              {featured.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#2b2520", maxWidth: "360px" }}>
              {featured.description}
            </p>
          </div>
        </div>
      )}

      {/* Projects grid */}
      <div className="flex flex-wrap px-6 py-6 gap-0" style={{ borderTop: "1px solid rgba(43,37,32,0.1)" }}>
        {filteredGrid.map((project) => (
          <Link
            key={project.id}
            href={`/proyectos/${project.id}`}
            className="group"
            style={{ width: "20%", padding: "4px" }}
          >
            <div className="overflow-hidden" style={{ aspectRatio: "1/1.1" }}>
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="pt-2 pb-4">
              <div className="text-sm font-semibold" style={{ color: "#2b2520" }}>
                {project.name}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(43,37,32,0.6)" }}>
                {project.location} · {project.year} · {project.type}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}
