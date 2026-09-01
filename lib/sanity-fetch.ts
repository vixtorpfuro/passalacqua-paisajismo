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
  images?: Array<{ _key: string; asset?: { _ref: string }; dimensions?: { width: number; height: number; aspectRatio: number } }>;
  description?: string;
  location?: string;
  year?: string;
  type?: string[];
  featured?: boolean;
};

export async function getAllProyectos(): Promise<SanityProyecto[]> {
  return sanityClient.fetch(
    `*[_type == "proyecto"] | order(order asc) {
      _id, name, slug, order, coverImage, description, location, year, type, featured
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


export async function getProyecto(slug: string): Promise<SanityProyecto | null> {
  return sanityClient.fetch(
    `*[_type == "proyecto" && slug.current == $slug][0] {
      _id, name, slug, order, coverImage, description, location, year, type,
      "images": images[] { _key, asset, "dimensions": asset->metadata.dimensions }
    }`,
    { slug }
  );
}
