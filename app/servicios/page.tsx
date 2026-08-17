"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const stats = [
  { value: 120,    suffix: "+",  label: "Jardines diseñados" },
  { value: 5000,   suffix: "+",  label: "Árboles plantados" },
  { value: 80000,  suffix: "m²", label: "Zonas verdes" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("es-CL")}{suffix}
    </span>
  );
}

const servicios = [
  { id: "diseno",        label: "Diseño de Jardín",            angle: 90,  color: "#e8603c", texto: "Proyecto integral de paisajismo desde el concepto hasta los planos de detalle. Paleta vegetal, materialidad, riego e iluminación." },
  { id: "residencial",   label: "Residencial",                  angle: 45,  color: "#e8963c", texto: "Jardines privados para casas y departamentos. Espacios que reflejan la identidad de quienes los habitan y se adaptan al entorno." },
  { id: "corporativo",   label: "Corporativo",                  angle: 0,   color: "#c8d44e", texto: "Paisajismo para oficinas, edificios y espacios de trabajo. Diseño que mejora el bienestar de las personas y la imagen de las empresas." },
  { id: "hoteleria",     label: "Hotelería",                    angle: 315, color: "#5abeaa", texto: "Jardines para hoteles, lodges y centros de descanso. Experiencias de naturaleza que se convierten en parte del servicio." },
  { id: "azoteas",       label: "Azoteas y Terrazas",           angle: 270, color: "#4a8fd4", texto: "Diseño de jardines en altura para terrazas, azoteas y balcones. Soluciones técnicas adaptadas a cada estructura y clima." },
  { id: "mantenimiento", label: "Supervisión y Mantenimiento",  angle: 225, color: "#9b6cc8", texto: "Acompañamiento continuo del jardín en el tiempo. Planes de mantención, riego, poda y seguimiento estacional para que el proyecto crezca tal como fue concebido." },
  { id: "ejecutivo",     label: "Asesorías en Paisaje",         angle: 180, color: "#d44e7a", texto: "Consultoría y asesoría en paisajismo para proyectos en distintas etapas: selección de plantas, revisión de diseños, orientación técnica y recomendaciones personalizadas." },
  { id: "supervision",   label: "Supervisión de Obras",         angle: 135, color: "#e87a3c", texto: "Acompañamiento en terreno durante la ejecución del proyecto. Control de calidad, coordinación de contratistas y seguimiento." },
];

const CX = 400;
const CY = 350;
const R_INNER = 80;
const R_OUTER = 200;
const R_LABEL = 268;

function toRad(deg: number) {
  return ((deg - 90) * Math.PI) / 180;
}

export default function ServiciosPage() {
  const [activo, setActivo] = useState<string | null>(null);
  const sa = servicios.find((s) => s.id === activo);

  // Left panel: angles 91–270 (left half of circle)
  const isLeft = sa ? sa.angle > 90 && sa.angle <= 270 : false;
  const panelLeft  = sa && isLeft  ? sa : null;
  const panelRight = sa && !isLeft ? sa : null;

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Intro */}
      <AnimatedSection delay={0}>
        <div className="grid-servicios" style={{ padding: "60px 24px", borderBottom: "1px solid rgba(43,37,32,0.12)" }}>
          <div>
            <h1 style={{
              fontSize: "2.4rem", fontWeight: "700", lineHeight: 1.05,
              color: "#2b2520", textTransform: "uppercase",
              letterSpacing: "-0.01em", marginBottom: "28px",
            }}>
              Lo que<br />hacemos.
            </h1>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520" }}>
              Diseñamos jardines con intención. Desde el primer boceto hasta la última planta, acompañamos cada proyecto con rigor técnico y sensibilidad estética.
            </p>
          </div>
          <div />
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ borderTop: "1px solid rgba(43,37,32,0.12)", paddingTop: "20px" }}>
                <div style={{
                  fontSize: "3rem", fontWeight: "700", lineHeight: 1,
                  color: "#2b2520", letterSpacing: "-0.02em", marginBottom: "8px",
                }}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: "12px", letterSpacing: "0.12em", color: "rgba(43,37,32,0.5)", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Círculo */}
      <AnimatedSection delay={100}>
        <div style={{ padding: "60px 24px 80px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {/* SVG */}
            <div>
              <svg viewBox="0 0 800 700" style={{ width: "100%", display: "block", overflow: "visible" }}>
                {/* Círculo exterior punteado */}
                <circle cx={CX} cy={CY} r={R_OUTER}
                  fill="none" stroke="rgba(43,37,32,0.15)" strokeWidth="1" strokeDasharray="4 6" />
                {/* Círculo interior */}
                <circle cx={CX} cy={CY} r={R_INNER}
                  fill="rgba(43,37,32,0.05)" stroke="rgba(43,37,32,0.18)" strokeWidth="1" />
                {/* Centro */}
                <text x={CX} y={CY - 6} textAnchor="middle"
                  style={{ fontSize: "11px", letterSpacing: "0.15em", fill: "rgba(43,37,32,0.45)", fontFamily: "inherit" }}>
                  PASSALACQUA
                </text>
                <text x={CX} y={CY + 10} textAnchor="middle"
                  style={{ fontSize: "10px", letterSpacing: "0.12em", fill: "rgba(43,37,32,0.35)", fontFamily: "inherit" }}>
                  PAISAJISMO
                </text>

                {/* Servicios */}
                {servicios.map((s) => {
                  const rad = toRad(s.angle);
                  const x1 = CX + R_INNER * Math.cos(rad);
                  const y1 = CY + R_INNER * Math.sin(rad);
                  const x2 = CX + R_OUTER * Math.cos(rad);
                  const y2 = CY + R_OUTER * Math.sin(rad);
                  const lx = CX + R_LABEL * Math.cos(rad);
                  const ly = CY + R_LABEL * Math.sin(rad);
                  const isActive = activo === s.id;

                  let anchor: "start" | "middle" | "end" = "middle";
                  if (lx < CX - 30) anchor = "end";
                  else if (lx > CX + 30) anchor = "start";

                  // Multi-line for long labels
                  const words = s.label.split(" ");
                  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
                  const line2 = words.length > 1 ? words.slice(Math.ceil(words.length / 2)).join(" ") : null;

                  return (
                    <g key={s.id} style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActivo(s.id)}
                      onMouseLeave={() => setActivo(null)}>
                      {/* Línea punteada */}
                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={s.color}
                        strokeWidth={isActive ? 3 : 2}
                        opacity={isActive ? 1 : 0.9}
                        style={{ transition: "all 0.2s" }}
                      />
                      {/* Punto */}
                      <circle cx={x2} cy={y2}
                        r={isActive ? 6 : 4}
                        fill={s.color}
                        opacity={isActive ? 1 : 0.9}
                        style={{ transition: "all 0.2s" }}
                      />
                      {/* Hitbox */}
                      <circle cx={lx} cy={ly} r={40} fill="transparent" />
                      {/* Label (1 o 2 líneas) */}
                      <text x={lx} y={line2 ? ly - 7 : ly + 4} textAnchor={anchor}
                        style={{
                          fontSize: "12px",
                          fontWeight: isActive ? "700" : "500",
                          letterSpacing: "0.1em",
                          fill: isActive ? s.color : "#2b2520",
                          fontFamily: "inherit",
                          userSelect: "none",
                          transition: "fill 0.2s",
                        }}>
                        {line1}
                      </text>
                      {line2 && (
                        <text x={lx} y={ly + 10} textAnchor={anchor}
                          style={{
                            fontSize: "12px",
                            fontWeight: isActive ? "700" : "500",
                            letterSpacing: "0.1em",
                            fill: isActive ? s.color : "#2b2520",
                            fontFamily: "inherit",
                            userSelect: "none",
                            transition: "fill 0.2s",
                          }}>
                          {line2}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
