import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProyectosGrid from "./ProyectosGrid";
import { getAllProyectos, urlFor } from "@/lib/sanity-fetch";

export const revalidate = 60;

// Slugs que aparecen en el carrusel destacado (en orden)
const FEATURED_SLUGS = [
  "jardin-via-roja",
  "restaurante-margo",
  "los-vilos",
  "falabella",
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

  const rest = todos
    .map((p) => ({
      _id: p._id,
      name: p.name,
      slug: p.slug,
      type: p.type,
      featured: p.featured,
      coverUrl: p.coverImage
        ? urlFor(p.coverImage).width(800).quality(82).url()
        : "",
      coverUrlLarge: p.coverImage
        ? urlFor(p.coverImage).width(1600).quality(85).url()
        : "",
      description: p.description,
    }));

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />
      <Suspense>
        <ProyectosGrid proyectos={rest} carouselItems={featured} />
      </Suspense>
      <Footer />
    </div>
  );
}
