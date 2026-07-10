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
  "maceta-aire": {
    name: "Maceta Aire",
    subtitle: "Cerámica artesanal · Unidad",
    price: "$45.000",
    description:
      "Maceta de cerámica de alta temperatura, fabricada artesanalmente en Chile. Su diseño limpio y proporciones equilibradas la hacen ideal para plantas de interior o terraza. Cada pieza es única y puede presentar pequeñas variaciones propias del proceso artesanal.",
    details: [
      { label: "Material", value: "Cerámica de alta temperatura" },
      { label: "Dimensiones", value: "Ø 18 cm × 20 cm alto" },
      { label: "Origen", value: "Fabricado en Chile" },
      { label: "Drenaje", value: "Con orificio inferior" },
      { label: "Cuidado", value: "Limpiar con paño húmedo" },
    ],
    images: [
      "/market/Passalacqua_01_home_A-6.png",
      "/market/Passalacqua_01_home_A-7.png",
      "/market/Passalacqua_01_home_A-8.png",
    ],
    related: [
      { slug: "set-suculentas", name: "Set Suculentas", image: "/market/Passalacqua_01_home_A-7.png" },
      { slug: "jardinera-ceramica", name: "Jardinera Cerámica", image: "/market/Passalacqua_01_home_A-8.png" },
    ],
  },
  "set-suculentas": {
    name: "Set Suculentas",
    subtitle: "Plantas · Set de 3",
    price: "$32.000",
    description:
      "Set de tres suculentas seleccionadas por nuestro equipo, elegidas por su compatibilidad estética y sus requerimientos similares de agua y luz. Incluye instrucciones de cuidado y se entregan en macetas de barro natural.",
    details: [
      { label: "Contenido", value: "3 plantas + macetas de barro" },
      { label: "Riego", value: "Cada 15–20 días" },
      { label: "Luz", value: "Luz indirecta abundante" },
      { label: "Interior / Exterior", value: "Interior" },
      { label: "Incluye", value: "Guía de cuidado" },
    ],
    images: [
      "/market/Passalacqua_01_home_A-7.png",
      "/market/Passalacqua_01_home_A-9.png",
      "/market/Passalacqua_01_home_A-10.png",
    ],
    related: [
      { slug: "maceta-aire", name: "Maceta Aire", image: "/market/Passalacqua_01_home_A-6.png" },
      { slug: "jardinera-ceramica", name: "Jardinera Cerámica", image: "/market/Passalacqua_01_home_A-8.png" },
    ],
  },
  "jardinera-ceramica": {
    name: "Jardinera Cerámica",
    subtitle: "Cerámica artesanal · Unidad",
    price: "$58.000",
    description:
      "Jardinera de cerámica de formato rectangular, ideal para hierbas aromáticas, cactus o una composición de plantas pequeñas. Su acabado mate y tono natural encaja con cualquier espacio.",
    details: [
      { label: "Material", value: "Cerámica de alta temperatura" },
      { label: "Dimensiones", value: "30 × 12 × 12 cm" },
      { label: "Origen", value: "Fabricado en Chile" },
      { label: "Drenaje", value: "Con orificio inferior" },
      { label: "Cuidado", value: "Limpiar con paño húmedo" },
    ],
    images: [
      "/market/Passalacqua_01_home_A-8.png",
      "/market/Passalacqua_01_home_A-12.png",
      "/market/Passalacqua_01_home_A-6.png",
    ],
    related: [
      { slug: "maceta-aire", name: "Maceta Aire", image: "/market/Passalacqua_01_home_A-6.png" },
      { slug: "set-suculentas", name: "Set Suculentas", image: "/market/Passalacqua_01_home_A-7.png" },
    ],
  },
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug] ?? products["maceta-aire"];
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
