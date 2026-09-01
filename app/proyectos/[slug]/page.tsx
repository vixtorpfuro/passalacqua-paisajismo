import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProyecto, urlFor } from "@/lib/sanity-fetch";
import ProyectoContent from "./ProyectoContent";

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

  const images = (proyecto.images ?? []).map((img) => {
    const ar = img.dimensions?.aspectRatio ?? 1.5;
    const w = ar >= 1 ? 1600 : 900;
    return {
      url: urlFor(img).width(w).quality(83).url(),
      aspectRatio: ar,
    };
  });

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />
      <ProyectoContent
        name={proyecto.name}
        type={proyecto.type}
        location={proyecto.location}
        year={proyecto.year}
        description={proyecto.description}
        coverUrl={coverUrl}
        images={images}
      />
      <Footer />
    </div>
  );
}
