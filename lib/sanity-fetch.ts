import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "kcbpv06c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export type SanityProyecto = {
  _id: string;
  name: string;
  slug: { current: string };
  order: number;
  coverImage?: { asset: { _ref: string } };
  images?: Array<{ _key: string; asset: { _ref: string } }>;
  description?: string;
  location?: string;
  year?: string;
  type?: string;
};

export async function getAllProyectos(): Promise<SanityProyecto[]> {
  return sanityClient.fetch(
    `*[_type == "proyecto"] | order(order asc) {
      _id, name, slug, order, coverImage, description, location, year, type
    }`
  );
}

export async function getProyectosByType(type: string): Promise<SanityProyecto[]> {
  return sanityClient.fetch(
    `*[_type == "proyecto" && type == $type] | order(order asc) {
      _id, name, slug, order, coverImage, type
    }`,
    { type }
  );
}

export async function getProyecto(slug: string): Promise<SanityProyecto | null> {
  return sanityClient.fetch(
    `*[_type == "proyecto" && slug.current == $slug][0] {
      _id, name, slug, order, coverImage, images, description, location, year, type
    }`,
    { slug }
  );
}
