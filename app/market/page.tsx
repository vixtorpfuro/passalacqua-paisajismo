import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "./ProductCard";

const marketProducts = [
  { slug: "maceta-aire",        name: "Maceta Aire",        image: "/market/Passalacqua_01_home_A-6.jpg",  price: "$45.000" },
  { slug: "set-suculentas",     name: "Set Suculentas",     image: "/market/Passalacqua_01_home_A-7.jpg",  price: "$32.000" },
  { slug: "jardinera-ceramica", name: "Jardinera Cerámica", image: "/market/Passalacqua_01_home_A-8.jpg",  price: "$58.000" },
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
