export type IGPost = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export async function getInstagramPosts(limit = 30): Promise<IGPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data as IGPost[]).filter(
      (p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM"
    );
  } catch {
    return [];
  }
}

// Extraer primera línea del caption como título
export function captionToTitle(caption?: string): string {
  if (!caption) return "Sin título";
  const first = caption.split("\n")[0].replace(/#\w+/g, "").trim();
  return first.length > 60 ? first.slice(0, 58) + "…" : first || "Publicación";
}
