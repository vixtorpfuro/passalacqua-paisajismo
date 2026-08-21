import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProyecto, urlFor } from "@/lib/sanity-fetch";
import { BackButtonInline, BackButtonFull } from "./BackButton";

export const revalidate = 60;

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);
  if (!proyecto) notFound();

  const coverUrl = proyecto.coverImage
    ? urlFor(proyecto.coverImage).width(1920).quality(85).url()
    : null;

  const galleryUrls = (proyecto.images ?? []).map((img) =>
    urlFor(img).width(1200).quality(82).url()
  );

  const [second, ...rest] = galleryUrls;

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Hero */}
      {coverUrl && (
        <div style={{ width: "100%", height: "80vh", overflow: "hidden" }}>
          <img
            src={coverUrl}
            alt={proyecto.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
          />
        </div>
      )}

      {/* Título + metadata */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "48px",
        padding: "48px 24px 52px",
        borderBottom: "1px solid rgba(43,37,32,0.12)",
      }}>
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
            <BackButtonInline />
          </div>
        </div>

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
        {second && (
          <div style={{ width: "100%", overflow: "hidden", aspectRatio: "16/7", marginBottom: "8px" }}>
            <img src={second} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        )}
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
          <BackButtonFull />
        </div>
      </div>

      <Footer />
    </div>
  );
}
