"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const founders = [
  {
    img: "/nosotras/pia.jpg",
    name: "Pía Passalacqua",
    role: "Socia Fundadora",
  },
  {
    img: "/nosotras/josefina.jpg",
    name: "Josefina Passalacqua",
    role: "Socia Fundadora",
  },
];

const proceso = [
  {
    title: "Visita y diagnóstico",
    body: "Comenzamos con una visita al sitio para conocer el terreno, la orientación, las condiciones de luz y las necesidades de quienes habitarán el jardín. Esta primera instancia es fundamental para entender el espíritu del lugar.",
  },
  {
    title: "Análisis y concepto",
    body: "Con los datos del sitio desarrollamos un análisis de potencial paisajístico. A partir de ahí surge el concepto del proyecto: una idea directriz que guía todas las decisiones de diseño, desde la paleta vegetal hasta los materiales y la estructura espacial.",
  },
  {
    title: "Proyecto de diseño",
    body: "Traducimos el concepto en planos, renders y una memoria descriptiva detallada. El proyecto incluye el diseño de paisaje blando (plantaciones, especies, riego) y duro (pavimentos, estructuras, iluminación).",
  },
  {
    title: "Proyecto ejecutivo y licitación",
    body: "Desarrollamos la documentación técnica necesaria para iniciar la obra: especificaciones, detalles constructivos y presupuesto. Acompañamos el proceso de selección de contratistas.",
  },
  {
    title: "Supervisión y mantenimiento",
    body: "Nuestro equipo supervisa la ejecución de la obra y ofrece planes de mantenimiento adaptados a cada jardín, asegurando que el proyecto crezca y evolucione tal como fue concebido.",
  },
];

export default function NosotrasPage() {
  const [openProceso, setOpenProceso] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Hero: imagen completa + texto al lado */}
      <AnimatedSection delay={0}>
        <div className="grid-2col-eq" style={{ borderBottom: "1px solid rgba(43,37,32,0.12)" }}>
          {/* Imagen completa sin recorte */}
          <div style={{ padding: "24px 12px 24px 24px" }}>
            <img
              src="/nosotras/nosotras.jpg"
              alt="Pía y Josefina Passalacqua"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          {/* Texto */}
          <div style={{
            padding: "60px 24px 60px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "24px" }}>
              NOSOTRAS
            </div>
            <h1 style={{
              fontSize: "2.6rem",
              fontWeight: "700",
              lineHeight: 1.05,
              color: "#2b2520",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              marginBottom: "32px",
            }}>
              El paisaje<br />como origen.
            </h1>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520", marginBottom: "20px" }}>
              Somos un estudio de paisajismo fundado en Santiago de Chile con la convicción de que un jardín bien diseñado transforma la manera en que habitamos los espacios. Trabajamos en residencias, edificios corporativos, hoteles y azoteas, siempre desde una mirada que integra la naturaleza del lugar, el clima y las personas que lo van a vivir.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520" }}>
              Cada proyecto comienza con la escucha: del terreno, del entorno, del cliente. A partir de ahí construimos jardines que no se imponen sobre el paisaje, sino que se convierten en parte de él.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Fundadoras */}
      <AnimatedSection delay={0}>
        <div className="grid-2col-eq" style={{ borderTop: "1px solid rgba(43,37,32,0.12)", borderBottom: "1px solid rgba(43,37,32,0.12)" }}>
          {/* Fotos */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "24px 12px 24px 24px" }}>
            {founders.map((f, i) => (
              <div key={i}>
                <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
                  <img
                    src={f.img}
                    alt={f.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                </div>
                <div style={{ backgroundColor: "#ddd4c8", padding: "10px 12px 12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>{f.name}</div>
                  <div style={{ fontSize: "11px", marginTop: "3px", color: "rgba(43,37,32,0.55)" }}>{f.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Texto */}
          <div style={{
            padding: "48px 24px 48px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "24px" }}>
              LAS FUNDADORAS
            </div>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520", marginBottom: "20px" }}>
              Pía y Josefina Passalacqua son las socias fundadoras del estudio. Hermanas y paisajistas, llevan más de una década trabajando juntas con una visión compartida: diseñar jardines que nazcan del lugar, que respeten el entorno y que mejoren la vida de quienes los habitan.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520", marginBottom: "20px" }}>
              Formadas en la Universidad Católica de Chile y con experiencia en proyectos residenciales, corporativos y hoteleros a lo largo de todo el país, han construido un estudio con identidad propia: sensible, riguroso y profundamente conectado con la naturaleza chilena.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520" }}>
              Cada proyecto que llevan adelante lleva la firma de su mirada: una paleta vegetal contemporánea, materiales nobles y espacios pensados para el bienestar de las personas.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Foto equipo completo */}
      <AnimatedSection delay={0}>
        <div style={{ padding: "24px 24px 0" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "16px" }}>
            EL EQUIPO
          </div>
          <div style={{ overflow: "hidden", width: "100%", aspectRatio: "16/7" }}>
            <img
              src="/nosotras/equipo.jpg"
              alt="Equipo Passalacqua Paisajismo"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* El proceso */}
      <AnimatedSection delay={0}>
        <div className="grid-2col" style={{ gap: "48px", padding: "60px 24px 80px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", paddingTop: "6px" }}>
            EL PROCESO
          </div>
          <div>
            {proceso.map((step, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(43,37,32,0.15)" }}>
                <button
                  onClick={() => setOpenProceso(openProceso === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: "600", color: "#2b2520", letterSpacing: "-0.01em" }}>
                    {step.title}
                  </span>
                  <span style={{ fontSize: "20px", color: "#c8873a", lineHeight: 1, flexShrink: 0, marginLeft: "16px" }}>
                    {openProceso === i ? "−" : "+"}
                  </span>
                </button>
                {openProceso === i && (
                  <div style={{ paddingBottom: "24px" }}>
                    <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#2b2520", maxWidth: "520px" }}>
                      {step.body}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(43,37,32,0.15)" }} />
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
