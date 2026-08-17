import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, urlFor } from "@/lib/sanity-fetch";
import BlogGrid from "./BlogGrid";

export const revalidate = 60;

export default async function BlogPage() {
  const raw = await getAllPosts();

  const posts = raw.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    coverUrl: p.coverImage ? urlFor(p.coverImage).width(600).quality(80).url() : "",
    publishedAt: p.publishedAt,
  }));

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />
      <BlogGrid posts={posts} />
      <Footer />
    </div>
  );
}
