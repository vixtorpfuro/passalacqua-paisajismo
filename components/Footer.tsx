export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(43,37,32,0.15)", backgroundColor: "#f2ede8" }}>
      {/* Newsletter */}
      <div className="flex items-center justify-center gap-8 py-6 px-8">
        <span className="text-sm" style={{ color: "#2b2520" }}>
          Suscribite al newsletter — contenido mensual de paisajismo y diseño.
        </span>
        <a
          href="/conecta"
          className="text-xs tracking-widest font-bold px-6 py-3 transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#c8873a", color: "#f2ede8" }}
        >
          SUSCRIBIRME →
        </a>
      </div>

      {/* Bottom */}
      <div
        className="flex items-center px-8 py-4"
        style={{ borderTop: "1px solid rgba(43,37,32,0.1)" }}
      >
        <span className="text-xs tracking-widest" style={{ color: "rgba(43,37,32,0.5)" }}>
          PASSALACQUA PAISAJISMO · passalacquapaisajismo.cl
        </span>
      </div>
    </footer>
  );
}
