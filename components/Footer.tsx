export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f2ede8" }}>
      {/* Newsletter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          padding: "28px 32px",
          borderTop: "1px solid rgba(43,37,32,0.15)",
          borderBottom: "1px solid rgba(43,37,32,0.15)",
        }}
      >
        <span style={{ fontSize: "14px", color: "#2b2520" }}>
          Suscribite al newsletter — contenido mensual de paisajismo y diseño.
        </span>
        <a
          href="/conecta"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            fontWeight: "700",
            padding: "12px 24px",
            backgroundColor: "#c8873a",
            color: "#f2ede8",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          SUSCRIBIRME →
        </a>
      </div>

      {/* Bottom */}
      <div style={{ padding: "20px 32px" }}>
        <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(43,37,32,0.5)" }}>
          PASSALACQUA PAISAJISMO · passalacquapaisajismo.cl
        </span>
      </div>
    </footer>
  );
}
