"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const products: Record<string, {
  name: string;
  subtitle: string;
  price: string;
  description: string;
  details: { label: string; value: string }[];
  images: string[];
  related: { slug: string; name: string; image: string }[];
}> = {
  "macetero-chino": {
    name: "Macetero Chino",
    subtitle: "Cerámica pintada a mano · Unidad",
    price: "Consultar",
    description:
      "Macetero de cerámica estilo chino, pintado a mano con motivos tradicionales en azul y blanco. Ideal para plantas de gran formato: árboles, palmeras o alocasias. Una pieza de carácter que transforma cualquier espacio interior o exterior cubierto.",
    details: [
      { label: "Material", value: "Cerámica pintada a mano" },
      { label: "Dimensiones", value: "Ø 69 cm × 49 cm alto" },
      { label: "Uso", value: "Interior y exterior cubierto" },
      { label: "Estilo", value: "Azul y blanco, motivos orientales" },
    ],
    images: [
      "/market/macetero-chino.jpg",
      "/market/macetero-chino2.jpg",
    ],
    related: [
      { slug: "escultura-leon", name: "Escultura León", image: "/market/escultura-leon.jpg" },
      { slug: "banca-cipres", name: "Banca Ciprés", image: "/market/banca-cipres.jpg" },
    ],
  },
  "escultura-leon": {
    name: "Escultura León",
    subtitle: "Hormigón · Unidad",
    price: "$200.000",
    description:
      "Escultura de cabeza de león en hormigón, diseñada para instalarse en muros o fachadas. Su acabado envejecido le da un carácter clásico que combina perfectamente con paredes cubiertas de vegetación. Una pieza que añade personalidad y profundidad a cualquier jardín.",
    details: [
      { label: "Material", value: "Hormigón" },
      { label: "Dimensiones", value: "25 × 25 cm" },
      { label: "Instalación", value: "Muro o fachada" },
      { label: "Uso", value: "Exterior" },
    ],
    images: [
      "/market/escultura-leon.jpg",
      "/market/escultura-leon2.jpg",
      "/market/escultura-leon3.jpg",
    ],
    related: [
      { slug: "macetero-chino", name: "Macetero Chino", image: "/market/macetero-chino.jpg" },
      { slug: "banca-cipres", name: "Banca Ciprés", image: "/market/banca-cipres.jpg" },
    ],
  },
  "banca-cipres": {
    name: "Banca Ciprés",
    subtitle: "Madera de ciprés · Unidad",
    price: "$560.000 + IVA",
    description:
      "Banca de jardín fabricada en madera de ciprés, resistente a la intemperie y de larga durabilidad. Su diseño clásico con respaldo de tablillas y apoyabrazos curvos es atemporal — funciona igual en un jardín formal que en una terraza contemporánea.",
    details: [
      { label: "Material", value: "Madera de ciprés" },
      { label: "Dimensiones", value: "160 cm largo × 50 cm prof. × 93 cm alto" },
      { label: "Uso", value: "Exterior" },
      { label: "Mantención", value: "Aplicar aceite para madera una vez al año" },
      { label: "Precio", value: "$560.000 + IVA" },
    ],
    images: [
      "/market/banca-cipres.jpg",
    ],
    related: [
      { slug: "macetero-chino", name: "Macetero Chino", image: "/market/macetero-chino.jpg" },
      { slug: "escultura-leon", name: "Escultura León", image: "/market/escultura-leon.jpg" },
    ],
  },
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug];
  if (!product) return null;
  const [activeImg, setActiveImg] = useState(0);
  const [openDetail, setOpenDetail] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Breadcrumb */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(43,37,32,0.12)" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(43,37,32,0.5)" }}>
          <Link href="/market" style={{ color: "rgba(43,37,32,0.5)", textDecoration: "none" }}>MARKET</Link>
          {" · "}
          <span>{product.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Producto: galería + info */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        borderBottom: "1px solid rgba(43,37,32,0.12)",
      }}>
        {/* Galería */}
        <div style={{ padding: "24px 12px 24px 24px" }}>
          {/* Imagen principal */}
          <div style={{ overflow: "hidden", aspectRatio: "1/1", marginBottom: "12px" }}>
            <img
              src={product.images[activeImg]}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.3s" }}
            />
          </div>
          {/* Miniaturas */}
          <div style={{ display: "flex", gap: "8px" }}>
            {product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: "72px",
                  height: "72px",
                  overflow: "hidden",
                  cursor: "pointer",
                  outline: i === activeImg ? "2px solid #c8873a" : "2px solid transparent",
                  outlineOffset: "2px",
                  transition: "outline 0.2s",
                }}
              >
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "48px 24px 48px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "12px" }}>
            {product.subtitle}
          </div>
          <h1 style={{
            fontSize: "2.2rem",
            fontWeight: "700",
            lineHeight: 1.05,
            color: "#2b2520",
            letterSpacing: "-0.01em",
            marginBottom: "16px",
          }}>
            {product.name}
          </h1>
          <div style={{ fontSize: "1.3rem", fontWeight: "600", color: "#2b2520", marginBottom: "28px" }}>
            {product.price}
          </div>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#2b2520", marginBottom: "36px" }}>
            {product.description}
          </p>

          {/* Botón */}
          <a
            href="mailto:hola@passalacquapaisajismo.cl?subject=Consulta%20sobre%20producto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 32px",
              backgroundColor: "#c8873a",
              color: "#f2ede8",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.15em",
              textDecoration: "none",
              marginBottom: "36px",
              alignSelf: "flex-start",
            }}
          >
            CONSULTAR →
          </a>

          {/* Detalles acordeón */}
          <div>
            {product.details.map((d) => (
              <div key={d.label} style={{ borderTop: "1px solid rgba(43,37,32,0.15)" }}>
                <button
                  onClick={() => setOpenDetail(openDetail === d.label ? null : d.label)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", color: "#2b2520" }}>
                    {d.label.toUpperCase()}
                  </span>
                  <span style={{ fontSize: "16px", color: "#c8873a", flexShrink: 0, marginLeft: "12px" }}>
                    {openDetail === d.label ? "−" : "+"}
                  </span>
                </button>
                {openDetail === d.label && (
                  <div style={{ paddingBottom: "14px" }}>
                    <span style={{ fontSize: "13px", lineHeight: 1.7, color: "#2b2520" }}>{d.value}</span>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(43,37,32,0.15)" }} />
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div style={{ padding: "48px 24px 60px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "24px" }}>
          TAMBIÉN TE PUEDE INTERESAR
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", maxWidth: "600px" }}>
          {product.related.map((r) => (
            <Link key={r.slug} href={`/market/${r.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ overflow: "hidden", aspectRatio: "1/1" }}>
                <img src={r.image} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ backgroundColor: "#ddd4c8", padding: "10px 12px 12px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>{r.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
