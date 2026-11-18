import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityClient, urlFor } from "@/lib/sanity-fetch";
import LandingClient, { type LandingProyecto } from "./LandingClient";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Paisajismo para proyectos · Passalacqua Paisajismo",
  description:
    "Diseñamos el paisaje de proyectos inmobiliarios, constructoras y oficinas de arquitectura desde el inicio. Agenda una reunión.",
  robots: { index: false, follow: true },
};

// Tipologías que interesan a inmobiliarias, constructoras y arquitectos
const TIPOS = ["Inmobiliarias", "Corporativo", "Hotelería y Entretenimiento", "Azoteas y Terrazas"];

type Raw = {
  name: string;
  slug: { current: string };
  coverImage?: { asset: { _ref: string } };
  location?: string;
  type?: string[];
};

async function getProyectos(): Promise<LandingProyecto[]> {
  let raw: Raw[] = [];
  try {
    raw = await sanityClient.fetch(
      `*[_type == "proyecto" && count((type)[@ in $tipos]) > 0 && defined(coverImage)] | order(order asc) [0...8] {
        name, slug, coverImage, location, type
      }`,
      { tipos: TIPOS }
    );
  } catch {
    // Si Sanity no responde, la landing se muestra igual, sin la grilla de proyectos
    return [];
  }
  return raw.map((p) => ({
    name: p.name.trim(),
    slug: p.slug.current,
    location: p.location?.trim() || "",
    tipo: (p.type ?? []).find((t) => TIPOS.includes(t)) ?? p.type?.[0] ?? "",
    cover: p.coverImage ? urlFor(p.coverImage).width(720).height(900).fit("crop").quality(78).url() : "",
  }));
}

export default async function JardinImposiblePage() {
  const proyectos = await getProyectos();
  return (
    <Suspense>
      <LandingClient proyectos={proyectos} />
    </Suspense>
  );
}
