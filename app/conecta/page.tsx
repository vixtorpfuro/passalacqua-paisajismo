"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConectaPage() {
  const [superficie, setSuperficie] = useState(300);

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "0",
        minHeight: "calc(100vh - 73px)",
        borderBottom: "1px solid rgba(43,37,32,0.12)",
      }}>

        {/* Columna izquierda */}
        <div style={{
          padding: "60px 40px 60px 24px",
          borderRight: "1px solid rgba(43,37,32,0.12)",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#c8873a", fontWeight: "600", marginBottom: "24px" }}>
            CONECTA
          </div>
          <h1 style={{
            fontSize: "1.6rem",
            fontWeight: "700",
            color: "#2b2520",
            lineHeight: 1.2,
            marginBottom: "12px",
          }}>
            Cuentanos tu proyecto.
          </h1>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(43,37,32,0.7)", marginBottom: "36px" }}>
            En 20 minutos evaluamos si hay fit<br />y cómo podemos trabajar juntos.
          </p>

          {/* CTAs */}
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "14px 20px",
              backgroundColor: "#c8873a",
              color: "#f2ede8",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textDecoration: "none",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            AGENDAR REUNIÓN DE 20 MIN →
          </a>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "13px 20px",
              backgroundColor: "transparent",
              color: "#2b2520",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textDecoration: "none",
              textAlign: "center",
              border: "1px solid rgba(43,37,32,0.3)",
              marginBottom: "48px",
            }}
          >
            VER DISPONIBILIDAD EN CALENDLY
          </a>

          {/* Contacto */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { icon: "@", label: "EMAIL", value: "oficina@passalacquapaisajismo.cl" },
              { icon: "□", label: "INSTAGRAM", value: "@passalacquapaisajismo" },
              { icon: "in", label: "LINKEDIN", value: "Passalacqua Paisajismo" },
              { icon: "⊠", label: "ESTUDIO", value: "Santiago, Chile" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#2b2520",
                  color: "#f2ede8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "2px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "13px", color: "#2b2520" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — formulario */}
        <div style={{ padding: "60px 24px 60px 48px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "32px", fontWeight: "600" }}>
            CUENTANOS DE TU PROYECTO
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", flexDirection: "column", gap: "0" }}
          >
            {/* Nombre + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>NOMBRE</label>
                <input placeholder="Tu nombre" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input type="email" placeholder="tu@email.com" style={inputStyle} />
              </div>
            </div>

            {/* Tipo de proyecto */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>TIPO DE PROYECTO</label>
              <input placeholder="Jardín residencial / Inmobiliario / Hotelería..." style={inputStyle} />
            </div>

            {/* Región */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>REGIÓN</label>
              <input placeholder="Metropolitana / Costa / Norte / Sur..." style={inputStyle} />
            </div>

            {/* Superficie */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={labelStyle}>SUPERFICIE ESTIMADA (m²)</label>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>{superficie} m²</span>
              </div>
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={superficie}
                onChange={(e) => setSuperficie(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#c8873a",
                  cursor: "pointer",
                }}
              />
            </div>

            {/* Detalles */}
            <div style={{ marginBottom: "36px" }}>
              <label style={labelStyle}>DETALLES DEL PROYECTO</label>
              <textarea
                placeholder="Cuentanos qué tienes en mente, el estado actual del espacio y cualquier referencia que te inspire..."
                rows={5}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                padding: "16px 32px",
                backgroundColor: "#c8873a",
                color: "#f2ede8",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.15em",
                border: "none",
                cursor: "pointer",
                width: "100%",
                marginBottom: "16px",
              }}
            >
              ENVIAR Y AGENDAR REUNIÓN →
            </button>
            <div style={{ fontSize: "12px", color: "rgba(43,37,32,0.5)", textAlign: "center" }}>
              Te respondemos en menos de 24 horas hábiles
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "0.15em",
  fontWeight: "600",
  color: "rgba(43,37,32,0.6)",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  backgroundColor: "rgba(43,37,32,0.06)",
  border: "none",
  borderBottom: "1px solid rgba(43,37,32,0.2)",
  fontSize: "13px",
  color: "#2b2520",
  outline: "none",
  fontFamily: "inherit",
};
