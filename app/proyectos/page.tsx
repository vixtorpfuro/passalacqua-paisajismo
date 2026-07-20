import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import FeaturedCarousel from "./FeaturedCarousel";
import ProjectCardClient from "./ProjectCardClient";
import { getAllProyectos, urlFor } from "@/lib/sanity-fetch";

export const revalidate = 60;

// Slugs que aparecen en el carrusel destacado (en orden)
const FEATURED_SLUGS = [
  "cerro-manquehue",
  "margo",
  "antumalal",
  "gracia-cariola",
  "ranco",
];

export default async function ProyectosPage() {
  const todos = await getAllProyectos();

  const featured = FEATURED_SLUGS
    .map((slug) => todos.find((p) => p.slug.current === slug))
    .filter(Boolean)
    .map((p) => ({
      slug: p!.slug.current,
      name: p!.name,
      coverUrl: p!.coverImage
        ? urlFor(p!.coverImage).width(1600).quality(85).url()
        : "",
      description: p!.description ?? "",
    }));

  // El resto en orden, excluyendo los featured
  const featuredSet = new Set(FEATURED_SLUGS);
  const rest = todos.filter((p) => !featuredSet.has(p.slug.current));

  // Primeros 21 → grilla 3col; el resto → grilla 5col
  const secondary = rest.slice(0, 21);
  const more = rest.slice(21);

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      {/* Hero rotativo */}
      {featured.length > 0 && (
        <AnimatedSection delay={0}>
          <div style={{ padding: "24px 24px 0" }}>
            <FeaturedCarousel items={featured} />
          </div>
        </AnimatedSection>
      )}

      {/* Proyectos secundarios — 3 col */}
      <AnimatedSection delay={50}>
        <div style={{ padding: "8px 24px 0" }}>
          <div className="grid-3col">
            {secondary.map((p) => (
              <ProjectCardClient
                key={p._id}
                name={p.name}
                href={`/proyectos/${p.slug.current}`}
                coverUrl={
                  p.coverImage
                    ? urlFor(p.coverImage).width(800).quality(82).url()
                    : ""
                }
                aspect="4/3"
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Más proyectos — 5 col */}
      {more.length > 0 && (
        <AnimatedSection delay={80}>
          <div style={{ padding: "8px 24px 40px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "rgba(43,37,32,0.45)", margin: "24px 0 16px" }}>
              MÁS PROYECTOS
            </div>
            <div className="grid-5col">
              {more.map((p) => (
                <ProjectCardClient
                  key={p._id}
                  name={p.name}
                  href={`/proyectos/${p.slug.current}`}
                  coverUrl={
                    p.coverImage
                      ? urlFor(p.coverImage).width(600).quality(82).url()
                      : ""
                  }
                  aspect="3/4"
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <Footer />
    </div>
  );
}
