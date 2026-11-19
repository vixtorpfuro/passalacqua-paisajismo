"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

export type LandingProyecto = {
  name: string;
  slug: string;
  location: string;
  tipo: string;
  cover: string;
};

// Número que recibe las solicitudes de reunión por WhatsApp (formato internacional, sin + ni espacios)
const WHATSAPP = "56995389616";
const EMAIL = "oficina@passalacquapaisajismo.cl";
// Copia de cada solicitud del formulario (FormSubmit; la primera vez pide activar desde el correo)
const COPIA = "vpellegrini@furo.company";
// Píxel de Meta: se activa cuando NEXT_PUBLIC_META_PIXEL_ID está definido en Vercel
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}
function track(evento: "Contact" | "Lead", data?: Record<string, string>) {
  try { window.fbq?.("track", evento, data); } catch {}
}

const DARK = "#2b2520";
const CREAM = "#f2ede8";
const ORANGE = "#c8873a";
const GREEN = "#1e2b21";

type Segmento = "inmobiliarias" | "constructoras" | "arquitectos";

const SEGMENTOS: { id: Segmento; label: string; tipo: string; texto: string }[] = [
  {
    id: "inmobiliarias",
    label: "Inmobiliarias",
    tipo: "Inmobiliaria",
    texto:
      "Un buen paisaje se ve desde la sala de ventas. Diseñamos el paisajismo de proyectos inmobiliarios desde el anteproyecto, para que el jardín sea parte de lo que se vende.",
  },
  {
    id: "constructoras",
    label: "Constructoras",
    tipo: "Constructora",
    texto: "Paisajismo que llega a tiempo a la obra: diseño, ejecución y mantención con un solo equipo.",
  },
  {
    id: "arquitectos",
    label: "Oficinas de arquitectura",
    tipo: "Oficina de arquitectura",
    texto:
      "Trabajamos junto a oficinas de arquitectura para que el exterior dialogue con el proyecto desde el primer trazo.",
  },
];

const ETAPAS = ["Estrategia", "Concepto", "Diseño", "Construcción", "Mantención"];

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export default function LandingClient({ proyectos }: { proyectos: LandingProyecto[] }) {
  const params = useSearchParams();
  const utm = (params.get("utm_content") || "").toLowerCase();
  const origen = params.get("utm_source") ? `${params.get("utm_source")} · ${utm || "sin anuncio"}` : "web";
  const seg = SEGMENTOS.find((s) => s.id === utm) ?? null;

  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tipo, setTipo] = useState(seg?.tipo ?? "");
  const [proyecto, setProyecto] = useState("");

  const mensaje = [
    "Hola, vi la campaña Jardín imposible y me gustaría agendar una reunión.",
    nombre && `Nombre: ${nombre}`,
    empresa && `Empresa: ${empresa}`,
    tipo && `Tipo: ${tipo}`,
    proyecto && `Proyecto: ${proyecto}`,
    `Ref: ${origen}`,
  ]
    .filter(Boolean)
    .join("\n");

  const waQuick = waLink(`Hola, vi la campaña Jardín imposible y me gustaría agendar una reunión.\nRef: ${origen}`);

  function enviarCopia() {
    try {
      fetch(`https://formsubmit.co/ajax/${COPIA}`, {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nueva solicitud Jardín imposible · ${nombre}${empresa ? " · " + empresa : ""}`,
          _template: "table",
          _captcha: "false",
          Nombre: nombre,
          Empresa: empresa || "—",
          Tipo: tipo || "—",
          Proyecto: proyecto || "—",
          Origen: origen,
          Fecha: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }),
        }),
      }).catch(() => {});
    } catch {}
  }

  return (
    <div style={{ backgroundColor: CREAM, color: DARK, minHeight: "100vh", paddingBottom: 84 }}>
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
      {/* Logo */}
      <header style={{ display: "flex", justifyContent: "center", padding: "18px 20px", borderBottom: "1px solid rgba(43,37,32,0.12)" }}>
        <Link href="/" aria-label="Passalacqua Paisajismo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo_web@3x.png" alt="Passalacqua Paisajismo" style={{ display: "block", height: 38, width: "auto" }} />
        </Link>
      </header>

      <main style={{ maxWidth: 560, margin: "0 auto" }}>
        {/* Hero */}
        <section>
          <video
            src="/landing/jardin-imposible.mp4"
            poster="/landing/jardin-imposible-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ display: "block", width: "100%", aspectRatio: "4 / 5", objectFit: "cover", backgroundColor: "#ddd" }}
          />
          <div style={{ padding: "28px 22px 8px" }}>
            <div style={eyebrow}>JARDÍN IMPOSIBLE · {seg ? seg.label.toUpperCase() : "PAISAJISMO PARA PROYECTOS"}</div>
            <h1 style={{ fontSize: "1.75rem", lineHeight: 1.18, fontWeight: 300, marginBottom: 16 }}>
              El paisaje se diseña <strong style={{ fontWeight: 700 }}>desde el inicio</strong> del proyecto.
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(43,37,32,0.78)", marginBottom: 26 }}>
              {seg
                ? seg.texto
                : "Diseñamos el paisaje de proyectos inmobiliarios, constructoras y oficinas de arquitectura, desde la estrategia hasta la mantención."}
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              <a href="#agenda" style={btnPrimary}>AGENDAR UNA REUNIÓN →</a>
              <a href="#proyectos" style={btnSecondary}>VER PROYECTOS</a>
            </div>
          </div>
        </section>

        {/* Para quién */}
        <section style={{ padding: "44px 22px 8px" }}>
          <div style={eyebrow}>CON QUIÉN TRABAJAMOS</div>
          <div style={{ display: "grid", gap: 10 }}>
            {SEGMENTOS.map((s) => {
              const active = seg?.id === s.id;
              return (
                <div
                  key={s.id}
                  style={{
                    padding: "18px 18px",
                    backgroundColor: active ? GREEN : "rgba(43,37,32,0.04)",
                    color: active ? CREAM : DARK,
                    borderLeft: `3px solid ${active ? ORANGE : "transparent"}`,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, opacity: active ? 0.9 : 0.75 }}>{s.texto}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Proyectos */}
        {proyectos.length > 0 && (
          <section id="proyectos" style={{ padding: "44px 22px 8px", scrollMarginTop: 12 }}>
            <div style={eyebrow}>PROYECTOS</div>
            <h2 style={h2}>
              Paisaje para <strong style={{ fontWeight: 700 }}>edificios, oficinas y espacios comunes</strong>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 }}>
              {proyectos.map((p) => (
                <Link key={p.slug} href={`/proyectos/${p.slug}`} style={{ textDecoration: "none", color: DARK }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={p.name}
                    loading="lazy"
                    style={{ display: "block", width: "100%", aspectRatio: "4 / 5", objectFit: "cover", backgroundColor: "#e4ddd3" }}
                  />
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(43,37,32,0.55)", marginBottom: 6 }}>
                    {[p.tipo, p.location].filter(Boolean).join(" · ")}
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/proyectos" style={{ ...btnSecondary, display: "block", marginTop: 16 }}>
              VER TODOS LOS PROYECTOS →
            </Link>
          </section>
        )}

        {/* Proceso */}
        <section style={{ padding: "44px 22px 8px" }}>
          <div style={eyebrow}>CÓMO TRABAJAMOS</div>
          <h2 style={h2}>
            Un solo equipo, <strong style={{ fontWeight: 700 }}>de la estrategia a la mantención</strong>
          </h2>
          <ol style={{ listStyle: "none", marginTop: 18, borderTop: "1px solid rgba(43,37,32,0.12)" }}>
            {ETAPAS.map((e, i) => (
              <li
                key={e}
                style={{ display: "flex", gap: 16, alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid rgba(43,37,32,0.12)" }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: "0.1em" }}>0{i + 1}</span>
                <span style={{ fontSize: 16, fontWeight: 500 }}>{e}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Agenda */}
        <section id="agenda" style={{ padding: "44px 22px 32px", scrollMarginTop: 12 }}>
          <div style={{ backgroundColor: GREEN, color: CREAM, padding: "28px 20px" }}>
            <div style={{ ...eyebrow, color: "#e39a68" }}>AGENDA UNA REUNIÓN</div>
            <h2 style={{ ...h2, color: CREAM, marginBottom: 8 }}>
              Conversemos sobre <strong style={{ fontWeight: 700 }}>tu proyecto</strong>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.8, marginBottom: 22 }}>
              Completa tus datos y te escribimos por WhatsApp para coordinar.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(waLink(mensaje), "_blank");
                enviarCopia();
                track("Lead", { content_name: utm || "web" });
              }}
              style={{ display: "grid", gap: 12 }}
            >
              <input required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" autoComplete="name" style={input} />
              <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Empresa" autoComplete="organization" style={input} />
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={input}>
                <option value="">Tipo de empresa</option>
                {SEGMENTOS.map((s) => (
                  <option key={s.id} value={s.tipo} style={{ color: DARK }}>{s.tipo}</option>
                ))}
                <option value="Otro" style={{ color: DARK }}>Otro</option>
              </select>
              <textarea
                value={proyecto}
                onChange={(e) => setProyecto(e.target.value)}
                placeholder="Cuéntanos brevemente del proyecto (opcional)"
                rows={3}
                style={{ ...input, resize: "vertical", lineHeight: 1.5 }}
              />
              <button type="submit" style={{ ...btnPrimary, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                ENVIAR POR WHATSAPP →
              </button>
            </form>
            <a onClick={() => track("Contact", { content_name: "email" })} href={`mailto:${EMAIL}?subject=${encodeURIComponent("Reunión · Jardín imposible")}`} style={{ display: "block", textAlign: "center", marginTop: 16, fontSize: 13, color: CREAM, opacity: 0.8 }}>
              o escríbenos a {EMAIL}
            </a>
          </div>
        </section>

        <footer style={{ textAlign: "center", padding: "8px 22px 40px" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.22em", fontWeight: 600, marginBottom: 10 }}>WELLBEING A TRAVÉS DEL PAISAJE</div>
          <a href="https://www.instagram.com/passalacquapaisajismo" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "rgba(43,37,32,0.6)" }}>
            @passalacquapaisajismo
          </a>
        </footer>
      </main>

      {/* Barra fija en celular */}
      <div
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
          padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
          backgroundColor: "rgba(242,237,232,0.96)", borderTop: "1px solid rgba(43,37,32,0.12)",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
        }}
      >
        <a href="#proyectos" style={{ ...btnSecondary, padding: "13px 8px" }}>VER PROYECTOS</a>
        <a href={waQuick} onClick={() => track("Contact", { content_name: utm || "web" })} target="_blank" rel="noopener noreferrer" style={{ ...btnPrimary, padding: "13px 8px" }}>AGENDAR REUNIÓN</a>
      </div>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontSize: 11, letterSpacing: "0.15em", color: ORANGE, fontWeight: 600, marginBottom: 14,
};
const h2: React.CSSProperties = { fontSize: "1.35rem", lineHeight: 1.25, fontWeight: 300 };
const btnPrimary: React.CSSProperties = {
  display: "block", padding: "15px 20px", backgroundColor: ORANGE, color: CREAM,
  fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textDecoration: "none", textAlign: "center",
};
const btnSecondary: React.CSSProperties = {
  display: "block", padding: "14px 20px", backgroundColor: "transparent", color: DARK,
  fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textDecoration: "none", textAlign: "center",
  border: "1px solid rgba(43,37,32,0.3)",
};
const input: React.CSSProperties = {
  width: "100%", padding: "13px 14px", backgroundColor: "rgba(242,237,232,0.08)", color: CREAM,
  border: "1px solid rgba(242,237,232,0.25)", fontSize: 16, fontFamily: "inherit", outline: "none", borderRadius: 0,
};
