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
  type?: string[];
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
    `*[_type == "proyecto" && $type in type] | order(order asc) {
      _id, name, slug, order, coverImage, type
    }`,
    { type }
  );
}

export type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  coverImage?: { asset: { _ref: string } };
  publishedAt: string;
  body?: unknown[];
};

export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, category, coverImage, publishedAt
    }`
  );
}

export async function getPost(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, category, coverImage, publishedAt, body
    }`,
    { slug }
  );
}

export type SanityCategoria = {
  name: string;
  featuredProject?: SanityProyecto & { coverUrl: string };
};

export async function getCategoriasFeatured(): Promise<Record<string, SanityProyecto>> {
  const categorias = await sanityClient.fetch<Array<{ name: string; featuredProject: SanityProyecto }>>(`
    *[_type == "categoria" && defined(featuredProject)] {
      name,
      featuredProject-> {
        _id, name, slug, coverImage, description, location, year, type
      }
    }
  `);
  const map: Record<string, SanityProyecto> = {};
  for (const c of categorias) {
    if (c.name && c.featuredProject) map[c.name] = c.featuredProject;
  }
  return map;
}

export async function getProyecto(slug: string): Promise<SanityProyecto | null> {
  return sanityClient.fetch(
    `*[_type == "proyecto" && slug.current == $slug][0] {
      _id, name, slug, order, coverImage, images, description, location, year, type
    }`,
    { slug }
  );
}
