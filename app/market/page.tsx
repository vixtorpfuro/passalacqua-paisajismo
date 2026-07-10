"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const marketProducts = [
  {
    id: "maceta-aire",
    slug: "maceta-aire",
    name: "Maceta Aire",
    image: "/market/Passalacqua_01_home_A-6.png",
    price: "$45.000",
  },
  {
    id: "set-suculentas",
    slug: "set-suculentas",
    name: "Set Suculentas",
    image: "/market/Passalacqua_01_home_A-7.png",
    price: "$32.000",
  },
  {
    id: "jardinera-ceramica",
    slug: "jardinera-ceramica",
    name: "Jardinera Cerámica",
    image: "/market/Passalacqua_01_home_A-8.png",
    price: "$58.000",
  },
];

const blogPosts = [
  {
    id: "que-plantar-en-otono",
    category: "TEMPORADA",
    title: "Qué plantar en otoño",
    image: "/home/27.CASA-IRARRAZAVALCVRDSC_5730-131017@2x.webp",
  },
  {
    id: "josefina-sobre-bienestar",
    category: "ENTREVISTA",
    title: "Josefina sobre bienestar",
    image: "/home/portrait-03.jpg",
  },
  {
    id: "ciudades-para-el-otono",
    category: "VIAJE",
    title: "Ciudades para el otoño",
    image: "/home/portrait-02.jpg",
  },
  {
    id: "parc-andre-citron",
    category: "VIAJE",
    title: "Parc Andre Citron",
    image: "/home/14-casa-via-roja@2x.webp",
  },
  {
    id: "restaurant-margo",
    category: "PROYECTO",
    title: "Restaurant Margo",
    image: "/home/portrait-01.jpg",
  },
  {
    id: "living",
    category: "PRENSA",
    title: "Living",
    image: "/home/garden-06.jpg",
  },
];

function ProductCard({ product }: { product: typeof marketProducts[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/market/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{ aspectRatio: "1/1", overflow: "hidden", position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {/* Overlay rollover */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(43,37,32,0.45)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}>
          <div style={{
            fontSize: "15px",
            fontWeight: "600",
            letterSpacing: "0.05em",
            color: "#f2ede8",
            textAlign: "center",
            marginBottom: "6px",
          }}>
            {product.name}
          </div>
          <div style={{
            fontSize: "13px",
            color: "rgba(242,237,232,0.8)",
          }}>
            {product.price}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MarketPage() {
  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      <div style={{ padding: "24px" }}>
        {/* MARKET row: label + 3 products con rollover */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", marginBottom: "6px" }}>
          <div style={{
            aspectRatio: "1/1",
            overflow: "hidden",
            backgroundColor: "rgba(43,37,32,0.08)",
            display: "flex",
            alignItems: "flex-end",
            padding: "20px",
          }}>
            <Link href="/market/tienda" style={{ textDecoration: "none" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.08em", color: "#2b2520" }}>
                MARKET
              </h2>
            </Link>
          </div>
          {marketProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* BLOG row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
          <div style={{
            backgroundColor: "rgba(43,37,32,0.08)",
            display: "flex",
            alignItems: "flex-start",
            padding: "20px",
            gridRow: "span 2",
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.08em", color: "#2b2520" }}>
              BLOG
            </h2>
          </div>
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
              <div style={{ overflow: "hidden", aspectRatio: "1/1" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                />
              </div>
              <div style={{ paddingTop: "8px", paddingBottom: "16px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.15em", fontWeight: "600", color: "#c8873a", marginBottom: "4px" }}>
                  {post.category}
                </div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#2b2520" }}>
                  {post.title}
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
