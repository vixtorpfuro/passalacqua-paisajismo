import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { proyectosMap } from "@/lib/proyectos-data";
import { sanityImagesByFolder } from "@/lib/sanity-images";

const MAX_IMAGES = 40;
const VALID_EXT = /\.(jpg|jpeg|png|webp)$/i;

function getImages(folder: string, subfolder?: string): string[] {
  // 1. Intentar desde filesystem local (desarrollo)
  const base = path.join(process.cwd(), "public", "proyectos", folder);
  const dir = subfolder ? path.join(base, subfolder) : base;
  try {
    const local = fs
      .readdirSync(dir)
      .filter((f) => VALID_EXT.test(f))
      .sort()
      .slice(0, MAX_IMAGES)
      .map((f) => {
        const rel = subfolder ? `${folder}/${subfolder}/${f}` : `${folder}/${f}`;
        return `/proyectos/${rel.split("/").map(encodeURIComponent).join("/")}`;
      });
    if (local.length > 0) return local;
  } catch { /* no hay carpeta local */ }

  // 2. Fallback a Sanity CDN
  const key = subfolder ? `${folder}/${subfolder}` : folder;
  return sanityImagesByFolder[key] ?? sanityImagesByFolder[folder] ?? [];
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const proyecto = proyectosMap[slug];
  if (!proyecto) notFound();

  const images = getImages(proyecto.folder, proyecto.subfolder);
  const [hero, second, ...rest] = images;

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Hero */}
      <div style={{ width: "100%", height: "80vh", overflow: "hidden" }}>
        <img
          src={hero}
          alt={proyecto.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
        />
      </div>

      {/* Título + metadata */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "48px",
        padding: "48px 24px 52px",
        borderBottom: "1px solid rgba(43,37,32,0.12)",
      }}>
        {/* Metadata izquierda */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {proyecto.type && (
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", textTransform: "uppercase" }}>
              {proyecto.type}
            </div>
          )}
          {(proyecto.location || proyecto.year) && (
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", textTransform: "uppercase" }}>
              {[proyecto.location, proyecto.year].filter(Boolean).join(" · ")}
            </div>
          )}
          <div style={{ marginTop: "24px" }}>
            <Link href="/proyectos" style={{
              fontSize: "11px", letterSpacing: "0.12em", color: "#c8873a",
              textDecoration: "none", fontWeight: "600",
            }}>
              ← Proyectos
            </Link>
          </div>
        </div>

        {/* Título + descripción derecha */}
        <div>
          <h1 style={{
            fontSize: "2.6rem", fontWeight: "700", lineHeight: 1.05,
            color: "#2b2520", textTransform: "uppercase", letterSpacing: "-0.01em",
            marginBottom: proyecto.description ? "28px" : "0",
          }}>
            {proyecto.name}
          </h1>
          {proyecto.description && (
            <p style={{
              fontSize: "1.1rem", lineHeight: 1.7, color: "#2b2520",
              maxWidth: "600px", fontStyle: "italic",
            }}>
              {proyecto.description}
            </p>
          )}
        </div>
      </div>

      {/* Galería */}
      <div style={{ padding: "16px 24px 60px" }}>
        {/* Segunda imagen — ancha */}
        {second && (
          <div style={{ width: "100%", overflow: "hidden", aspectRatio: "16/7", marginBottom: "8px" }}>
            <img src={second} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        )}

        {/* Grid 3 columnas */}
        {rest.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {rest.map((src, i) => (
              <div key={i} style={{ overflow: "hidden", aspectRatio: "4/3" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Volver */}
      <div style={{ padding: "0 24px 60px", borderTop: "1px solid rgba(43,37,32,0.12)" }}>
        <div style={{ paddingTop: "40px" }}>
          <Link
            href="/proyectos"
            style={{
              fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em",
              color: "#f2ede8", backgroundColor: "#2b2520",
              padding: "14px 28px", textDecoration: "none", display: "inline-block",
            }}
          >
            ← TODOS LOS PROYECTOS
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
