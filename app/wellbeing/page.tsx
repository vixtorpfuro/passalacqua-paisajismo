"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const paradas = [
  { id: "paisajismo",   label: "PAISAJISMO",   image: "/wellbeing/wellbeing@3x.png",    side: "left"  as const, x: 80,  y: 80,  lx: 80,  ly: 60,  anchor: "middle" as const, texto: "El paisajismo es el arte de transformar un espacio exterior en una extensión viva de quien lo habita. No se trata solo de plantar — se trata de diseñar experiencias donde la naturaleza y la vida cotidiana se encuentran." },
  { id: "compartir",   label: "COMPARTIR",    image: "/wellbeing/COMPARTIR@3Bx.png",   side: "right" as const, x: 500, y: 80,  lx: 500, ly: 60,  anchor: "middle" as const, texto: "Un jardín bien diseñado convoca. Genera los espacios para que las personas se reúnan, conversen y compartan momentos. La mesa bajo el árbol, el sendero que invita a caminar acompañado." },
  { id: "conectar",    label: "CONECTAR",     image: "/wellbeing/CONECTAR.png",         side: "right" as const, x: 290, y: 195, lx: 290, ly: 175, anchor: "middle" as const, texto: "La naturaleza tiene una capacidad única de conectarnos con nosotros mismos. Caminar entre plantas, escuchar el agua, sentir el sol — son actos simples que restauran nuestra energía y nos devuelven al presente." },
  { id: "recorrer",    label: "RECORRER",     image: "/wellbeing/recorrer.png",         side: "left"  as const, x: 80,  y: 310, lx: 80,  ly: 290, anchor: "middle" as const, texto: "Un jardín con recorrido es un jardín que se descubre. Diseñamos caminos que llevan de un espacio a otro, que generan expectativa y sorpresa, que hacen que cada visita sea una experiencia nueva." },
  { id: "desconectar", label: "DESCONECTAR",  image: "/wellbeing/desconectar.png",      side: "right" as const, x: 500, y: 420, lx: 500, ly: 400, anchor: "middle" as const, texto: "El jardín es refugio. Un lugar donde el ruido del mundo se apaga y el ritmo de la naturaleza toma el control. Diseñamos rincones de calma donde la mente puede finalmente descansar." },
  { id: "reunir",      label: "REUNIR",       image: "/wellbeing/REUNIR.png",           side: "right" as const, x: 310, y: 530, lx: 310, ly: 510, anchor: "middle" as const, texto: "Los espacios exteriores son los mejores anfitriones. Diseñamos jardines que facilitan el encuentro — con luz cálida, con sombra generosa, con lugares para sentarse que inviten a quedarse." },
  { id: "resguardar",  label: "RESGUARDAR",   image: "/wellbeing/RESGUARDAR.png",       side: "left"  as const, x: 80,  y: 640, lx: 80,  ly: 620, anchor: "middle" as const, texto: "Proteger del viento, del sol intenso, de las miradas. El diseño de paisaje crea microclimas y límites naturales que hacen del jardín un espacio seguro y acogedor durante todo el año." },
  { id: "entretener",  label: "ENTRETENER",   image: "/wellbeing/entretener.png",       side: "right" as const, x: 500, y: 740, lx: 500, ly: 720, anchor: "middle" as const, texto: "Un jardín vivo entretiene. El movimiento de las hojas, el canto de los pájaros, los colores que cambian con las estaciones — la naturaleza ofrece un espectáculo permanente y siempre renovado." },
  { id: "wellbeing",   label: "WELLBEING",    image: "/wellbeing/wellbeing@3x.png",     side: "left"  as const, x: 120, y: 840, lx: 120, ly: 820, anchor: "middle" as const, texto: "Creemos que el paisaje es una extensión emocional de la arquitectura. Diseñamos jardines con intención, donde cada espacio te acompaña a sentir un bienestar profundo y cotidiano." },
  { id: "jugar",       label: "JUGAR",        image: "/wellbeing/JUGAR.png",            side: "left"  as const, x: 290, y: 840, lx: 290, ly: 820, anchor: "middle" as const, texto: "El jardín también es lugar de juego — para los niños, para los adultos. Diseñar con juego en mente es diseñar para la alegría, para el movimiento, para el disfrute sin propósito." },
];

// Snake path: serpentine going DOWN, curves on alternating sides
// viewBox 600 x 900
const snakePath = [
  // Row A: L→R  y=80
  "M 80 80 L 500 80",
  // Curve right side down to y=195
  "Q 550 80 550 137 Q 550 195 500 195",
  // Row B: R→L  y=195
  "L 80 195",
  // Curve left side down to y=310
  "Q 30 195 30 252 Q 30 310 80 310",
  // Row C: L→R  y=310
  "L 500 310",
  // Curve right side down to y=420
  "Q 550 310 550 365 Q 550 420 500 420",
  // Row D: R→L  y=420
  "L 80 420",
  // Curve left side down to y=530
  "Q 30 420 30 475 Q 30 530 80 530",
  // Row E: L→R  y=530
  "L 500 530",
  // Curve right side down to y=640
  "Q 550 530 550 585 Q 550 640 500 640",
  // Row F: R→L  y=640
  "L 80 640",
  // Curve left side down to y=740
  "Q 30 640 30 690 Q 30 740 80 740",
  // Row G: L→R  y=740
  "L 500 740",
  // Curve right side down to y=840
  "Q 550 740 550 790 Q 550 840 500 840",
  // Row H: R→L  y=840
  "L 80 840",
].join(" ");

export default function WellbeingPage() {
  const [activo, setActivo] = useState<string | null>(null);
  const paradaActiva = paradas.find((p) => p.id === activo);

  const panelLeft  = paradaActiva?.side === "left"  ? paradaActiva : null;
  const panelRight = paradaActiva?.side === "right" ? paradaActiva : null;

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Intro: imagen + texto */}
      <AnimatedSection delay={0}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid rgba(43,37,32,0.12)",
        }}>
          <div style={{ overflow: "hidden", maxHeight: "500px" }}>
            <img
              src="/wellbeing/wellbeing@3x.png"
              alt="Wellbeing"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ padding: "60px 24px 60px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "24px" }}>
              WELLBEING
            </div>
            <h1 style={{
              fontSize: "2.4rem", fontWeight: "700", lineHeight: 1.05,
              color: "#2b2520", textTransform: "uppercase",
              letterSpacing: "-0.01em", marginBottom: "32px",
            }}>
              Wellbeing<br />a través del<br />paisaje.
            </h1>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520", marginBottom: "20px" }}>
              Creemos que el paisaje es una extensión <strong>emocional</strong> de la arquitectura. Diseñamos jardines con <strong>intención</strong>, donde cada espacio te acompaña a sentir un <strong>bienestar</strong> profundo y cotidiano.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520" }}>
              El jardín no es decoración — es experiencia. Es el lugar donde te conectás con la naturaleza, con los demás y con vos mismo.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Recorrido */}
      <AnimatedSection delay={100}>
        <div style={{ padding: "60px 24px 80px" }}>
          {/* 3 columnas — altura fija = SVG (500px ancho × 880/600 ratio ≈ 733px) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 500px 1fr", gap: "24px", height: "733px" }}>

            {/* Panel izquierdo — posicionado a la altura del nodo */}
            <div style={{ position: "relative", height: "100%" }}>
              {panelLeft && (
                <div style={{
                  position: "absolute",
                  top: `min(${((panelLeft.y / 880) * 100).toFixed(1)}%, calc(100% - 580px))`,
                  transform: "translateY(0)",
                  width: "100%",
                  transition: "top 0.3s ease",
                }}>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#2b2520", marginBottom: "12px" }}>
                    {panelLeft.texto}
                  </p>
                  <img src={panelLeft.image} alt={panelLeft.label}
                    style={{ width: "100%", height: "auto", maxHeight: "520px", objectFit: "contain", display: "block" }} />
                </div>
              )}
            </div>

            {/* SVG serpentín */}
            <div style={{ height: "100%" }}>
              <svg viewBox="0 0 600 880" style={{ width: "100%", height: "100%", display: "block" }}>
                <path
                  d={snakePath}
                  fill="none"
                  stroke="rgba(43,37,32,0.22)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {paradas.map((p) => {
                  const isActive = activo === p.id;
                  return (
                    <g key={p.id} style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActivo(p.id)}
                      onMouseLeave={() => setActivo(null)}>
                      <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
                      <circle
                        cx={p.x} cy={p.y}
                        r={isActive ? 6 : 4}
                        fill={isActive ? "#c8873a" : "#f2ede8"}
                        stroke={isActive ? "#c8873a" : "#2b2520"}
                        strokeWidth="1.5"
                        style={{ transition: "all 0.2s" }}
                      />
                      <text
                        x={p.lx} y={p.ly}
                        textAnchor={p.anchor}
                        style={{
                          fontSize: "13px",
                          fontWeight: isActive ? "700" : "500",
                          letterSpacing: "0.14em",
                          fill: isActive ? "#c8873a" : "#2b2520",
                          fontFamily: "inherit",
                          userSelect: "none",
                          transition: "fill 0.2s",
                        }}
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Panel derecho — posicionado a la altura del nodo */}
            <div style={{ position: "relative", height: "100%" }}>
              {panelRight && (
                <div style={{
                  position: "absolute",
                  top: `min(${((panelRight.y / 880) * 100).toFixed(1)}%, calc(100% - 580px))`,
                  transform: "translateY(0)",
                  width: "100%",
                  transition: "top 0.3s ease",
                }}>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#2b2520", marginBottom: "12px" }}>
                    {panelRight.texto}
                  </p>
                  <img src={panelRight.image} alt={panelRight.label}
                    style={{ width: "100%", height: "auto", maxHeight: "520px", objectFit: "contain", display: "block" }} />
                </div>
              )}
            </div>

          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}

// Textos para cada parada
// (los asignamos inline en el array para mantener orden)
// —— añadir campo texto al array paradas ——
