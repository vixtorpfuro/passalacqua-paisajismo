import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />
      <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <p className="text-sm tracking-widest uppercase" style={{ color: "rgba(43,37,32,0.4)" }}>
          Próximamente
        </p>
      </div>
      <Footer />
    </div>
  );
}
