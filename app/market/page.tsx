import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "./ProductCard";

const marketProducts = [
  { slug: "macetero-chino",   name: "Macetero Chino",   image: "/market/macetero-chino.jpg",   price: "Consultar",         description: "69 cm diámetro × 49 cm alto" },
  { slug: "escultura-leon",   name: "Escultura León",   image: "/market/escultura-leon.jpg",   price: "$200.000",          description: "25 × 25 cm" },
  { slug: "banca-cipres",     name: "Banca Ciprés",    image: "/market/banca-cipres.jpg",     price: "$560.000 + IVA",    description: "160 × 50 × 93 cm alto" },
];

export default function MarketPage() {
  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      <div style={{ padding: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
          <div style={{
            aspectRatio: "1/1", overflow: "hidden", backgroundColor: "rgba(43,37,32,0.08)",
            display: "flex", alignItems: "flex-end", padding: "20px",
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.08em", color: "#2b2520" }}>
              MARKET
            </h2>
          </div>
          {marketProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
