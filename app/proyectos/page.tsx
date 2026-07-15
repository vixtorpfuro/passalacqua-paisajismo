"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

// Encode a folder + filename into a safe URL path
function img(folder: string, file: string) {
  return `/proyectos/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

const featuredList = [
  {
    id: "cerro-manquehue",
    name: "Cerro Manquehue",
    image: img("01 cerro-manquehue", "_MGL6063.jpg"),
    description: "Un jardín en las laderas del cerro Manquehue que integra la vegetación nativa con especies mediterráneas, creando espacios de contemplación y bienestar.",
  },
  {
    id: "margo",
    name: "Margo",
    image: img("02 margo", "1.jpg"),
    description: "Proyecto de paisajismo interior-exterior para el Restaurante Margo. Jardines que conviven con la arquitectura y crean una atmósfera donde la naturaleza está presente en cada mesa.",
  },
  {
    id: "antumalal",
    name: "Jardín Antumalal",
    image: img("02 JARDIN ANTUMALAL", "IMG_8808.JPEG"),
    description: "Jardín en entorno lacustre que dialoga con el paisaje nativo de la Araucanía. Vegetación local integrada con espacios de contemplación y descanso.",
  },
  {
    id: "gracia-cariola",
    name: "Jardín Gracia Cariola",
    image: img("02 JARDIN GRACIA CARIOLA", "_MGL5962.jpg"),
    description: "Jardín residencial de diseño contemporáneo con paleta vegetal mediterránea. Espacios exteriores que extienden la vida interior hacia el jardín.",
  },
  {
    id: "ranco",
    name: "Jardín Ranco",
    image: img("02 JARDIN RANCO", "Foto 28-09-25, 16 59 48.jpg"),
    description: "Proyecto en las orillas del lago Ranco que integra la vegetación nativa del sur de Chile con espacios de encuentro y contemplación del paisaje lacustre.",
  },
];

const secondary = [
  { id: "margo",               name: "Margo",               folder: "02 margo",               image: img("02 margo", "1.jpg") },
  { id: "bertin",              name: "Bertin",               folder: "02 bertin",              image: img("02 bertin", "2303C98B-1149-495F-8BF0-33B11281BBC1.jpg") },
  { id: "andrea-bertin-playa", name: "Andrea Bertin Playa",  folder: "02 andrea bertin playa", image: img("02 andrea bertin playa", "PHOTO-2024-03-12-10-40-44 7.jpg") },
  { id: "antumalal",           name: "Jardín Antumalal",     folder: "02 JARDIN ANTUMALAL",    image: img("02 JARDIN ANTUMALAL", "IMG_8808.JPEG") },
  { id: "gracia-cariola",      name: "Jardín Gracia Cariola",folder: "02 JARDIN GRACIA CARIOLA",image: img("02 JARDIN GRACIA CARIOLA", "_MGL5962.jpg") },
  { id: "los-vilos",           name: "Jardín Los Vilos",     folder: "02 JARDIN LOS VILOS",    image: img("02 JARDIN LOS VILOS", "Foto 22-09-25, 12 51 34 (1).jpg") },
  { id: "ranco",               name: "Jardín Ranco",         folder: "02 JARDIN RANCO",        image: img("02 JARDIN RANCO", "Foto 28-09-25, 16 59 48.jpg") },
  { id: "sennerman",           name: "Jardín Sennerman",     folder: "02 JARDIN SENNERMAN",    image: img("02 JARDIN SENNERMAN", "DJI_0180.JPG") },
  { id: "denisse-neger",       name: "Denisse Neger",        folder: "02 Denisse Neger",       image: img("02 Denisse Neger", "DSC_0396.JPG") },
  { id: "lidia-langlois",      name: "Lidia Langlois",       folder: "02 Lidia Langlois",      image: img("02 Lidia Langlois", "DSC_8924.JPG") },
  { id: "maria-gracia",        name: "María Gracia",         folder: "02 Maria Gracia",        image: img("02 Maria Gracia", "DSC_1407.JPG") },
  { id: "china-correa",        name: "China Correa",         folder: "02 china correa",        image: img("02 china correa", "IMG_0159.jpeg") },
  { id: "falabella",           name: "Falabella",            folder: "02 falabella",           image: img("02 falabella", "19.png") },
  { id: "jose",                name: "José",                 folder: "02 jose",                image: img("02 jose", "1ca44d9b-e981-40b5-8d16-d019e393036e.jpg") },
  { id: "khammis",             name: "Khammis",              folder: "02 khammis",             image: img("02 khammis", "IMG_5921.jpg") },
  { id: "la-plaza",            name: "La Plaza",             folder: "02 la plaza",            image: img("02 la plaza", "662E6B71-2BB9-4F2F-896C-F33BE500A9C6.jpeg") },
  { id: "mellafe",             name: "Mellafe",              folder: "02 mellafe",             image: img("02 mellafe", "0db0434f-1c03-408e-88d3-8e3cad1fcec6.jpg") },
  { id: "moira",               name: "Moira",                folder: "02 moira",               image: img("02 moira", "220848f0-c42c-4014-a550-55c891e3a7d9.jpg") },
  { id: "pilar",               name: "Pilar",                folder: "02 pilar",               image: img("02 pilar", "_MG_4841.jpg") },
  { id: "security",            name: "Security",             folder: "02 security",            image: img("02 security", "IMG_0554.jpeg") },
  { id: "los-vilos-02",        name: "Los Vilos",            folder: "02 los vilos",           image: img("02 los vilos", "Foto 22-09-25, 12 51 34 (1).jpg") },
];

const rest = [
  { id: "alejandra-prieto",        name: "Alejandra Prieto",        image: img("Alejandra Prieto",        "Alejandra Prieto-046.jpg") },
  { id: "alejandro-alvarez",       name: "Alejandro Álvarez",       image: img("Alejandro Alvarez",       "DSC_1100.JPG") },
  { id: "ana-maria-figueroa",      name: "Ana María Figueroa",      image: img("Ana Maria Figueroa",      "Ana Maria Figueroa-001.jpg") },
  { id: "andrea-bertin",           name: "Andrea Bertin",           image: img("Andrea Bertin",           "29-10-09 423.jpg") },
  { id: "carola-matta",            name: "Carola Matta",            image: img("Carola Matta",            "Carola Matta-001.jpg") },
  { id: "carola-del-campo",        name: "Carola del Campo",        image: img("Carola del Campo",        "Carola del Campo-001.JPG") },
  { id: "carolina-velasco",        name: "Carolina Velasco",        image: img("Carolina Velasco",        "Carolina Velasco-001.JPG") },
  { id: "cecilia-claro",           name: "Cecilia Claro",           image: img("Cecilia Claro",           "DSC_1789.JPG") },
  { id: "clinica-lo-curro",        name: "Clínica Lo Curro",        image: img("Clinica Lo Curro",        "Clinica Lo Curro-001.jpg") },
  { id: "diego-abadie",            name: "Diego Abadie",            image: img("Diego Abadie",            "Diego Abadie-001.jpg") },
  { id: "eleana-vidaurre",         name: "Eleana Vidaurre",         image: img("Eleana Vidaurre",         "DSC_2088.JPG") },
  { id: "fernanda-otero",          name: "Fernanda Otero",          image: img("Fernanda Otero",          "DSC_2353.JPG") },
  { id: "francisca-goycolea",      name: "Francisca Goycolea",      image: img("Francisca Goycolea",      "DSC_3350.JPG") },
  { id: "jael-ergas",              name: "Jael Ergas",              image: img("Jael Ergas",              "IMG_2857.JPG") },
  { id: "josefa-garcia",           name: "Josefa García de la Huerta", image: img("Josefa Garcia de la Huerta", "Josefa Garcia de la Huerta-001.JPG") },
  { id: "josefina-passalacqua",    name: "Josefina Passalacqua",    image: img("Josefina Passalacqua",   "DSC_6497.JPG") },
  { id: "juan-irrarazabal",        name: "Juan E. Irarrázabal",     image: img("Juan E Irrarazabal",      "DSC_2117.JPG") },
  { id: "m-elisa-sotta",           name: "M. Elisa Sotta",          image: img("M.Elisa Sotta",           "Maria Elisa Sotta-001.JPG") },
  { id: "monica-valdes",           name: "Mónica Valdés",           image: img("Monica Valdes",           "DSC_0912.JPG") },
  { id: "paula-delano",            name: "Paula Delano",            image: img("Paula Delano",            "DSC_0005.JPG") },
  { id: "pollo-mir",               name: "Pollo Mir",               image: img("Pollo Mir",               "Pollo Mir-001.jpg") },
  { id: "rosario-figueroa",        name: "Rosario Figueroa",        image: img("Rosario Figueroa",        "DSC_2821.JPG") },
  { id: "sebastian-oddo",          name: "Sebastián Oddo",          image: img("Sebastian Oddo",          "DSC_5964.JPG") },
  { id: "titi-marincovic",         name: "Titi Marincovic",         image: img("Titi Marincovic",         "DSC_7077.JPG") },
  { id: "vespucio-2700",           name: "Vespucio 2700",           image: img("VESPUCIO 2700/Web Res",   "0Y9A8950.jpg") },
  { id: "veronica-calderon",       name: "Verónica Calderón",       image: img("Veronica Calderon",       "Veronica Calderon-001.jpg") },
  { id: "ximena-campos",           name: "Ximena Campos",           image: img("Ximena Campos",           "DSC_4095.JPG") },
  { id: "angelica-correa",         name: "Angélica Correa",         image: img("angelica correa",         "IMG_4340.jpeg") },
  { id: "cimm",                    name: "CIMM",                    image: img("cimm",                    "image25.jpeg") },
  { id: "saval",                   name: "Saval",                   image: img("saval",                   "_MG_5430.jpg") },
  { id: "verdecee",                name: "Verdecee",                image: img("verdecee",                "3752A5BB-C5D8-4303-9F06-C36B5429F523_1_105_c.jpeg") },
];

function ProjectCard({ name, image, href, aspect = "3/4" }: { name: string; image: string; href: string; aspect?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{ aspectRatio: aspect, overflow: "hidden", position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(43,37,32,0.4)",
          display: "flex", alignItems: "flex-end", padding: "16px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "#f2ede8", letterSpacing: "0.04em" }}>
            {name}
          </span>
        </div>
      </div>
      <div style={{ backgroundColor: "#ddd4c8", padding: "10px 12px 12px" }}>
        <div style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>{name}</div>
      </div>
    </Link>
  );
}

export default function ProyectosPage() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    if (idx === featuredIdx) return;
    setFading(true);
    setTimeout(() => {
      setFeaturedIdx(idx);
      setFading(false);
    }, 400);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((featuredIdx + 1) % featuredList.length);
    }, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [featuredIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const featured = featuredList[featuredIdx];

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Hero proyecto principal — rotativo */}
      <AnimatedSection delay={0}>
        <div style={{ padding: "24px 24px 0" }}>
          <Link href={`/proyectos/${featured.id}`} style={{ textDecoration: "none", display: "block" }}>
            <div className="grid-hero">
              <div style={{ overflow: "hidden", height: "520px", position: "relative" }}>
                <img
                  key={featured.id}
                  src={featured.image}
                  alt={featured.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    opacity: fading ? 0 : 1,
                    transition: "opacity 0.4s ease",
                  }}
                />
              </div>
              <div style={{
                backgroundColor: "#ddd4c8",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "32px", position: "relative",
              }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "16px" }}>
                  PROYECTO DESTACADO
                </div>
                <h1 style={{
                  fontSize: "2.6rem", fontWeight: "700", lineHeight: 1.0,
                  letterSpacing: "-0.01em", color: "#2b2520", textTransform: "uppercase",
                  marginBottom: "16px",
                  opacity: fading ? 0 : 1, transition: "opacity 0.4s ease",
                }}>
                  {featured.name.split(" ").map((w, i) => <span key={i} style={{ display: "block" }}>{w}</span>)}
                </h1>
                <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#2b2520", marginBottom: "28px", opacity: fading ? 0 : 1, transition: "opacity 0.4s ease" }}>
                  {featured.description}
                </p>
                {/* Dots */}
                <div style={{ display: "flex", gap: "8px" }} onClick={(e) => e.preventDefault()}>
                  {featuredList.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.preventDefault(); goTo(i); }}
                      style={{
                        width: i === featuredIdx ? "24px" : "8px",
                        height: "8px", borderRadius: "4px",
                        backgroundColor: i === featuredIdx ? "#c8873a" : "rgba(43,37,32,0.25)",
                        border: "none", cursor: "pointer", padding: 0,
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </AnimatedSection>

      {/* Proyectos secundarios — 3 col */}
      <AnimatedSection delay={50}>
        <div style={{ padding: "8px 24px 0" }}>
          <div className="grid-3col">
            {secondary.map((p) => (
              <ProjectCard key={p.id} name={p.name} image={p.image} href={`/proyectos/${p.id}`} aspect="4/3" />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Más proyectos — 5 col */}
      <AnimatedSection delay={80}>
        <div style={{ padding: "8px 24px 40px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.45)", margin: "24px 0 16px" }}>
            MÁS PROYECTOS
          </div>
          <div className="grid-5col">
            {rest.map((p) => (
              <ProjectCard key={p.id} name={p.name} image={p.image} href={`/proyectos/${p.id}`} aspect="3/4" />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
