"use client";
import { useState } from "react";

const WEBHOOK = "https://script.google.com/macros/s/AKfycbwXFmSJkC8o6j9a6EYWdItYyHdEKQJ1s1cLzQQRhHqQf3nuvuxotMiEPGKBnSaQ98NK/exec";

function Newsletter() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });
      setStatus("ok");
      setNombre("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: "10px 14px",
    backgroundColor: "transparent",
    border: "1px solid rgba(43,37,32,0.3)",
    color: "#2b2520",
    fontSize: "13px",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
  };

  if (status === "ok") {
    return (
      <div style={{ textAlign: "center", fontSize: "13px", color: "#2b2520" }}>
        ¡Gracias! Te sumamos a la lista. 🌿
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
      <input
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ ...inputStyle, width: "160px" }}
      />
      <input
        type="email"
        placeholder="tu@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ ...inputStyle, width: "220px" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          fontSize: "11px", letterSpacing: "0.15em", fontWeight: "700",
          padding: "11px 24px", backgroundColor: "#c8873a", color: "#f2ede8",
          border: "none", cursor: "pointer", fontFamily: "inherit",
          whiteSpace: "nowrap", opacity: status === "loading" ? 0.7 : 1,
        }}
      >
        {status === "loading" ? "..." : "SUSCRIBIRME →"}
      </button>
      {status === "error" && (
        <span style={{ fontSize: "12px", color: "#c0392b", width: "100%", textAlign: "center" }}>
          Hubo un error. Intentá de nuevo.
        </span>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f2ede8" }}>
      {/* Newsletter */}
      <div style={{
        padding: "24px 32px",
        borderTop: "1px solid rgba(43,37,32,0.15)",
        borderBottom: "1px solid rgba(43,37,32,0.15)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
      }}>
        <span style={{ fontSize: "13px", color: "rgba(43,37,32,0.6)", letterSpacing: "0.05em" }}>
          Suscribite al newsletter — contenido mensual de paisajismo y diseño.
        </span>
        <Newsletter />
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
