import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

const cm = (f: string) => `/proyectos/${encodeURIComponent("01 cerro-manquehue")}/${encodeURIComponent(f)}`;

export default function CerroManquehue() {
  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Hero — full bleed, tall */}
      <div style={{ width: "100%", height: "85vh", overflow: "hidden" }}>
        <img
          src={cm("_MGL6063.jpg")}
          alt="Cerro Manquehue"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%", display: "block" }}
        />
      </div>

      {/* Meta + Title */}
      <AnimatedSection delay={0}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "48px",
          padding: "48px 24px 40px",
          borderBottom: "1px solid rgba(43,37,32,0.12)",
        }}>
          {/* Left: meta */}
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "8px" }}>
              RESIDENCIAL
            </div>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "8px" }}>
              SANTIAGO · 2016
            </div>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)" }}>
              PAISAJISMO · JARDÍN PRIVADO
            </div>
          </div>
          {/* Right: title + intro */}
          <div>
            <h1 style={{
              fontSize: "2.6rem",
              fontWeight: "700",
              lineHeight: 1.05,
              color: "#2b2520",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              marginBottom: "24px",
            }}>
              Casa en el<br />Cerro Manquehue.
            </h1>
            <p style={{
              fontSize: "1.25rem",
              lineHeight: 1.6,
              color: "#2b2520",
              fontStyle: "italic",
              maxWidth: "560px",
            }}>
              Un jardín que no se impone sobre el cerro — se convierte en él.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Full-bleed image 1 */}
      <AnimatedSection delay={0}>
        <div style={{ width: "100%", height: "70vh", overflow: "hidden" }}>
          <img
            src={cm("_MG_5140.jpg")}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
          />
        </div>
      </AnimatedSection>

      {/* Text block 1 */}
      <AnimatedSection delay={0}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "48px",
          padding: "60px 24px",
          borderBottom: "1px solid rgba(43,37,32,0.12)",
        }}>
          <div /> {/* empty left */}
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#2b2520", maxWidth: "640px" }}>
            Los muros de piedra siguen las cotas naturales de la ladera sur del Manquehue,
            en el mismo lenguaje horizontal de la arquitectura. Sobre esa base de roca,
            los macizos vegetales aparecen como nubes verdes — volúmenes ligeros que
            contrastan con la piedra y se mueven con el viento.
          </p>
        </div>
      </AnimatedSection>

      {/* Two-column images */}
      <AnimatedSection delay={0}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          padding: "0 24px",
        }}>
          <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
            <img
              src={cm("_MGL5962.jpg")}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
            <img
              src={cm("_MGL6017.jpg")}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Text block 2 — short, centered */}
      <AnimatedSection delay={0}>
        <div style={{
          padding: "80px 24px",
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid rgba(43,37,32,0.12)",
        }}>
          <p style={{
            fontSize: "1.5rem",
            lineHeight: 1.5,
            color: "#2b2520",
            textAlign: "center",
            maxWidth: "560px",
            fontStyle: "italic",
          }}>
            Desde aquí se ve el poniente.<br />
            La cordillera. La puesta de sol.
          </p>
        </div>
      </AnimatedSection>

      {/* Full-bleed image 2 — panorámica ciudad */}
      <AnimatedSection delay={0}>
        <div style={{ width: "100%", height: "70vh", overflow: "hidden" }}>
          <img
            src={cm("_MGL6093.jpg")}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", display: "block" }}
          />
        </div>
      </AnimatedSection>

      {/* Text block 3 + image side by side */}
      <AnimatedSection delay={0}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          borderTop: "1px solid rgba(43,37,32,0.12)",
          borderBottom: "1px solid rgba(43,37,32,0.12)",
        }}>
          {/* Text */}
          <div style={{
            padding: "64px 48px 64px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520" }}>
              Y en otoño, el jardín se enciende: los ginkgos se vuelven amarillo puro,
              los aceres japoneses rojo encendido, y en la ladera sur — donde el sol
              llega diferente — los rododendros y azaleas florecen en su momento exacto.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#2b2520", marginTop: "24px" }}>
              El boj en distintos portes sostiene la estructura todo el año.
              El resto del jardín respira, cambia y sorprende.
            </p>
          </div>
          {/* Image */}
          <div style={{ overflow: "hidden" }}>
            <img
              src={cm("_MGL6090.jpg")}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Three-column image grid */}
      <AnimatedSection delay={0}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          padding: "16px 24px 24px",
        }}>
          {[cm("_MG_5240.jpg"), cm("_MGL6017.jpg"), cm("_MGL5962.jpg")].map((src, i) => (
            <div key={i} style={{ overflow: "hidden", aspectRatio: "3/4" }}>
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Full-bleed cierre */}
      <AnimatedSection delay={0}>
        <div style={{ width: "100%", height: "60vh", overflow: "hidden" }}>
          <img
            src={cm("_MG_5240.jpg")}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
          />
        </div>
      </AnimatedSection>

      {/* Related projects */}
      <AnimatedSection delay={0}>
        <div style={{ padding: "60px 24px 0", borderTop: "1px solid rgba(43,37,32,0.12)" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.5)", marginBottom: "32px" }}>
            OTROS PROYECTOS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { href: "/proyectos", img: "/home/14-casa-via-roja@2x.webp", name: "Jardín Vía Roja", meta: "Santiago · Residencial" },
              { href: "/proyectos", img: "/home/garden-06.jpg", name: "Casa Plaza", meta: "Cachagua · Residencial" },
              { href: "/proyectos", img: "/home/portrait-01.jpg", name: "Margo", meta: "Santiago · Corporativo" },
            ].map((p) => (
              <Link key={p.name} href={p.href} style={{ textDecoration: "none" }}>
                <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ backgroundColor: "#ddd4c8", padding: "12px 14px 16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#2b2520" }}>{p.name}</div>
                  <div style={{ fontSize: "11px", marginTop: "3px", color: "rgba(43,37,32,0.55)" }}>{p.meta}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
