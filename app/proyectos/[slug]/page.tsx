import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProyecto, urlFor } from "@/lib/sanity-fetch";
import ProyectoContent from "./ProyectoContent";

export const revalidate = 60;

export default async function ProyectoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { slug } = await params;
  const { cat } = await searchParams;
  const proyecto = await getProyecto(slug);
  if (!proyecto) notFound();

  const backUrl = cat ? `/proyectos?cat=${encodeURIComponent(cat)}` : "/proyectos";

  const images = (proyecto.images ?? []).map((img) => {
    const ar = img.dimensions?.aspectRatio ?? 1.5;
    const w = ar >= 1 ? 1600 : 900;
    return {
      url: img.asset ? urlFor(img).width(w).quality(83).url() : "",
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
        images={images}
        backUrl={backUrl}
      />
      <Footer />
    </div>
  );
}
