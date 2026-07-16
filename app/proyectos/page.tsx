"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const featuredList = [
  {
    id: "cerro-manquehue",
    name: "Cerro Manquehue",
    image: "https://cdn.sanity.io/images/kcbpv06c/production/3dc5d776e2ff5227e928e36941d8b91cce77ebde-1920x1280.jpg",
    description: "Un jardín en las laderas del cerro Manquehue que integra la vegetación nativa con especies mediterráneas, creando espacios de contemplación y bienestar.",
  },
  {
    id: "margo",
    name: "Margo",
    image: "https://cdn.sanity.io/images/kcbpv06c/production/65ec906115215db8405261728e010cacfd4923f2-2400x1600.jpg",
    description: "Proyecto de paisajismo interior-exterior para el Restaurante Margo. Jardines que conviven con la arquitectura y crean una atmósfera donde la naturaleza está presente en cada mesa.",
  },
  {
    id: "antumalal",
    name: "Jardín Antumalal",
    image: "https://cdn.sanity.io/images/kcbpv06c/production/95bcee5f0bcab7591ae7069fe793e87d1e38c776-1536x2048.jpg",
    description: "Jardín en entorno lacustre que dialoga con el paisaje nativo de la Araucanía. Vegetación local integrada con espacios de contemplación y descanso.",
  },
  {
    id: "gracia-cariola",
    name: "Jardín Gracia Cariola",
    image: "https://cdn.sanity.io/images/kcbpv06c/production/08b04cc13521f9d954c69af51673e68e87bacb30-2400x1600.jpg",
    description: "Jardín residencial de diseño contemporáneo con paleta vegetal mediterránea. Espacios exteriores que extienden la vida interior hacia el jardín.",
  },
  {
    id: "ranco",
    name: "Jardín Ranco",
    image: "https://cdn.sanity.io/images/kcbpv06c/production/d69eca812a3d5b9a78557fcb67859cb8b55963a3-2400x1800.jpg",
    description: "Proyecto en las orillas del lago Ranco que integra la vegetación nativa del sur de Chile con espacios de encuentro y contemplación del paisaje lacustre.",
  },
];

const secondary = [
  { id: "margo",               name: "Margo",                image: "https://cdn.sanity.io/images/kcbpv06c/production/65ec906115215db8405261728e010cacfd4923f2-2400x1600.jpg" },
  { id: "bertin",              name: "Bertin",               image: "https://cdn.sanity.io/images/kcbpv06c/production/2a8a84971ed47c1f5b803f2b31bde340c620fc3c-1284x2282.jpg" },
  { id: "andrea-bertin-playa", name: "Andrea Bertin Playa",  image: "https://cdn.sanity.io/images/kcbpv06c/production/b6e5112524c011cecf2b720e986e2499508f54c2-960x1280.jpg" },
  { id: "antumalal",           name: "Jardín Antumalal",     image: "https://cdn.sanity.io/images/kcbpv06c/production/95bcee5f0bcab7591ae7069fe793e87d1e38c776-1536x2048.jpg" },
  { id: "gracia-cariola",      name: "Jardín Gracia Cariola",image: "https://cdn.sanity.io/images/kcbpv06c/production/08b04cc13521f9d954c69af51673e68e87bacb30-2400x1600.jpg" },
  { id: "los-vilos",           name: "Jardín Los Vilos",     image: "https://cdn.sanity.io/images/kcbpv06c/production/26e0d656cdf225beb96699086962c4271318cdf0-1600x1068.jpg" },
  { id: "ranco",               name: "Jardín Ranco",         image: "https://cdn.sanity.io/images/kcbpv06c/production/d69eca812a3d5b9a78557fcb67859cb8b55963a3-2400x1800.jpg" },
  { id: "sennerman",           name: "Jardín Sennerman",     image: "https://cdn.sanity.io/images/kcbpv06c/production/e710a709b3dccefb7521408b9676b9f5efa39fdb-2400x1519.jpg" },
  { id: "denisse-neger",       name: "Denisse Neger",        image: "https://cdn.sanity.io/images/kcbpv06c/production/443a631d6e8ee95ded453dbad2b0f5b321c43c11-2400x3623.jpg" },
  { id: "lidia-langlois",      name: "Lidia Langlois",       image: "https://cdn.sanity.io/images/kcbpv06c/production/de70d78f5e21d617519e73348279f514e62f8a89-2400x3623.jpg" },
  { id: "maria-gracia",        name: "María Gracia",         image: "https://cdn.sanity.io/images/kcbpv06c/production/6a439533b44b6d1049395aa0d0fe7ea1bd78ca80-2400x3623.jpg" },
  { id: "china-correa",        name: "China Correa",         image: "https://cdn.sanity.io/images/kcbpv06c/production/c648e0c7136adfbcb9b11e94949d4cb38eea9f31-2400x1800.jpg" },
  { id: "falabella",           name: "Falabella",            image: "https://cdn.sanity.io/images/kcbpv06c/production/5eb68012973f93d0c0b7d38166e2d4118d502738-1804x1424.png" },
  { id: "jose",                name: "José",                 image: "https://cdn.sanity.io/images/kcbpv06c/production/bbfd6a6dd135eaeee5ea333ead653d868119a847-1280x960.jpg" },
  { id: "khammis",             name: "Khammis",              image: "https://cdn.sanity.io/images/kcbpv06c/production/a83cf0ce96c034888d5b68400d4abdb3544ba9f4-2400x1800.jpg" },
  { id: "la-plaza",            name: "La Plaza",             image: "https://cdn.sanity.io/images/kcbpv06c/production/faec04e751fe619c3bc2cdac2193c1fbf7dd8379-2400x1800.jpg" },
  { id: "mellafe",             name: "Mellafe",              image: "https://cdn.sanity.io/images/kcbpv06c/production/573fd446a7d8e551ef377cd64a3b303615c2318f-768x1024.jpg" },
  { id: "moira",               name: "Moira",                image: "https://cdn.sanity.io/images/kcbpv06c/production/161044ce77312d7bdb49ce69d42275095b982fe6-960x1280.jpg" },
  { id: "pilar",               name: "Pilar",                image: "https://cdn.sanity.io/images/kcbpv06c/production/8b6795b25ad28cb4ace602f9713b3157b0ee361e-2400x1600.jpg" },
  { id: "security",            name: "Security",             image: "https://cdn.sanity.io/images/kcbpv06c/production/12208cd0051a644585f42b0c179f4b5ebae4ca34-640x480.jpg" },
  { id: "los-vilos-02",        name: "Los Vilos",            image: "https://cdn.sanity.io/images/kcbpv06c/production/26e0d656cdf225beb96699086962c4271318cdf0-1600x1068.jpg" },
];

const rest = [
  { id: "alejandra-prieto",        name: "Alejandra Prieto",           image: "https://cdn.sanity.io/images/kcbpv06c/production/d34213fce51394610335bb747d82e450cab2ab0c-2400x3623.jpg" },
  { id: "alejandro-alvarez",       name: "Alejandro Álvarez",          image: "https://cdn.sanity.io/images/kcbpv06c/production/d252433ba40729bafe5c624fe9a75bdfd1dac2e4-2400x3623.jpg" },
  { id: "ana-maria-figueroa",      name: "Ana María Figueroa",         image: "https://cdn.sanity.io/images/kcbpv06c/production/3ca38ad7e74afd0e02ceb304efbd2a01db76bd13-2400x3623.jpg" },
  { id: "andrea-bertin",           name: "Andrea Bertin",              image: "https://cdn.sanity.io/images/kcbpv06c/production/6cff60b998a5940cfc476dbbf3256a75c03fa897-1600x1200.jpg" },
  { id: "carola-matta",            name: "Carola Matta",               image: "https://cdn.sanity.io/images/kcbpv06c/production/015585905583aa3075ffa02308fa652784b2ffdc-2400x3623.jpg" },
  { id: "carola-del-campo",        name: "Carola del Campo",           image: "https://cdn.sanity.io/images/kcbpv06c/production/40a0be35991756a7e0ceb1a4dcda578a2cc07f8e-2400x3623.jpg" },
  { id: "carolina-velasco",        name: "Carolina Velasco",           image: "https://cdn.sanity.io/images/kcbpv06c/production/0b036637ef393020a97fa77798aa7185d9b8603a-2400x3623.jpg" },
  { id: "cecilia-claro",           name: "Cecilia Claro",              image: "https://cdn.sanity.io/images/kcbpv06c/production/b511972e2f100da5dd814ee7a76356e1f1fb7fc4-2400x3623.jpg" },
  { id: "clinica-lo-curro",        name: "Clínica Lo Curro",           image: "https://cdn.sanity.io/images/kcbpv06c/production/7fb227db648a0290a556ec8527ad2e9a85e7e07f-2400x3623.jpg" },
  { id: "diego-abadie",            name: "Diego Abadie",               image: "https://cdn.sanity.io/images/kcbpv06c/production/c1581ac3a8926f7b06627bd5f055865c611ce94b-2400x3623.jpg" },
  { id: "eleana-vidaurre",         name: "Eleana Vidaurre",            image: "https://cdn.sanity.io/images/kcbpv06c/production/e7deaae44c72cc4f812f7ede8919709ca539bf61-2400x1589.jpg" },
  { id: "fernanda-otero",          name: "Fernanda Otero",             image: "https://cdn.sanity.io/images/kcbpv06c/production/67975fac6ed1d7d6ec0d7de75985a9b72ae19beb-2400x3623.jpg" },
  { id: "francisca-goycolea",      name: "Francisca Goycolea",         image: "https://cdn.sanity.io/images/kcbpv06c/production/f1efad5616eebe19be88ab0bb6b7d2460c072907-2400x1589.jpg" },
  { id: "jael-ergas",              name: "Jael Ergas",                 image: "https://cdn.sanity.io/images/kcbpv06c/production/da3d1756d39fe553d391c5ecf85e4f78e24da878-2400x3603.jpg" },
  { id: "josefa-garcia",           name: "Josefa García de la Huerta", image: "https://cdn.sanity.io/images/kcbpv06c/production/be87abc76e22e3a899c9597084c9e91813eab4f5-2400x3623.jpg" },
  { id: "josefina-passalacqua",    name: "Josefina Passalacqua",       image: "https://cdn.sanity.io/images/kcbpv06c/production/4ec2a81fcd0eb6015a18cafc7a59400f113f7b82-2400x3623.jpg" },
  { id: "juan-irrarazabal",        name: "Juan E. Irarrázabal",        image: "https://cdn.sanity.io/images/kcbpv06c/production/79534a814f01d21da979edffaba6d2c0374dad6a-2400x1589.jpg" },
  { id: "m-elisa-sotta",           name: "M. Elisa Sotta",             image: "https://cdn.sanity.io/images/kcbpv06c/production/e25a8d05bf69c36d53558bd847ce83fb010540b2-2400x1589.jpg" },
  { id: "monica-valdes",           name: "Mónica Valdés",              image: "https://cdn.sanity.io/images/kcbpv06c/production/c3df336d9a5f432f593623c72b7a61e71b77e11a-2400x3623.jpg" },
  { id: "paula-delano",            name: "Paula Delano",               image: "https://cdn.sanity.io/images/kcbpv06c/production/89ec1861ffdf339c06d86799f01a66052a4834bf-2400x1589.jpg" },
  { id: "pollo-mir",               name: "Pollo Mir",                  image: "https://cdn.sanity.io/images/kcbpv06c/production/4f8d97d9875e856641474efa2982573d4984e6a4-2400x3624.jpg" },
  { id: "rosario-figueroa",        name: "Rosario Figueroa",           image: "https://cdn.sanity.io/images/kcbpv06c/production/210508e7cf200fbe0dbcce87a26265013f1eb938-2400x3623.jpg" },
  { id: "sebastian-oddo",          name: "Sebastián Oddo",             image: "https://cdn.sanity.io/images/kcbpv06c/production/d3829895692c9924aa7fb7e30c8cde9a173dea44-2400x3623.jpg" },
  { id: "titi-marincovic",         name: "Titi Marincovic",            image: "https://cdn.sanity.io/images/kcbpv06c/production/bb8ecc6c49dabde46af0fc46b9edc3f7eb9d5fba-2400x1589.jpg" },
  { id: "vespucio-2700",           name: "Vespucio 2700",              image: "https://cdn.sanity.io/images/kcbpv06c/production/7827b72d6edc416db6a1b1518ff47cfd0abc0d40-2400x1604.jpg" },
  { id: "veronica-calderon",       name: "Verónica Calderón",          image: "https://cdn.sanity.io/images/kcbpv06c/production/4ff4a73c746c17099ad8283d30bd640663fee3d7-2400x3623.jpg" },
  { id: "ximena-campos",           name: "Ximena Campos",              image: "https://cdn.sanity.io/images/kcbpv06c/production/696fea800635722f768ea5deb7fded9182722a8b-2400x3623.jpg" },
  { id: "angelica-correa",         name: "Angélica Correa",            image: "https://cdn.sanity.io/images/kcbpv06c/production/703b0e0ef32649e00814c1baf4cfffe083432489-2400x1800.jpg" },
  { id: "cimm",                    name: "CIMM",                       image: "https://cdn.sanity.io/images/kcbpv06c/production/886f92121154d72d841246d9c1f94c658a5ba5f9-640x480.jpg" },
  { id: "saval",                   name: "Saval",                      image: "https://cdn.sanity.io/images/kcbpv06c/production/2aed7cb31a5491582b87a583659c942e89af58f5-2400x1600.jpg" },
  { id: "verdecee",                name: "Verdecee",                   image: "https://cdn.sanity.io/images/kcbpv06c/production/ad8365710c775f90b4364828716e6a9354ef60f3-768x1024.jpg" },
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
