import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllPosts, getPost, urlFor } from "@/lib/sanity-fetch";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

function timeAgo(timestamp: string): string {
  const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
  return `Hace ${Math.floor(days / 30)} meses`;
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString("es-CL", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, allPosts] = await Promise.all([getPost(id), getAllPosts()]);
  if (!post) notFound();

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      <div className="grid-blog" style={{ minHeight: "calc(100vh - 73px)" }}>
        {/* Sidebar */}
        <div style={{
          borderRight: "1px solid rgba(43,37,32,0.12)",
          padding: "32px 24px",
          display: "flex", flexDirection: "column",
        }}>
          <Link href="/blog" style={{ textDecoration: "none" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.08em", color: "#2b2520", marginBottom: "32px" }}>
              BLOG
            </h2>
          </Link>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {allPosts.map((p) => {
              const isActive = p.slug.current === id;
              return (
                <Link key={p._id} href={`/blog/${p.slug.current}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "grid", gridTemplateColumns: "48px 1fr", gap: "10px", alignItems: "center",
                    padding: "10px 0", paddingLeft: isActive ? "8px" : "0",
                    borderBottom: "1px solid rgba(43,37,32,0.08)",
                    borderLeft: isActive ? "2px solid #c8873a" : "2px solid transparent",
                  }}>
                    <div style={{ width: "48px", height: "48px", overflow: "hidden", flexShrink: 0 }}>
                      {p.coverImage && (
                        <img
                          src={urlFor(p.coverImage).width(96).quality(75).url()}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontSize: "11px", fontWeight: isActive ? "700" : "500",
                        color: isActive ? "#c8873a" : "#2b2520", lineHeight: 1.35,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(43,37,32,0.4)", marginTop: "3px" }}>
                        {timeAgo(p.publishedAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Contenido */}
        <div style={{ padding: "48px 56px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <Link href="/blog" style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: "600", color: "#c8873a", textDecoration: "none" }}>
              ← Blog
            </Link>
            <span style={{ color: "rgba(43,37,32,0.2)" }}>·</span>
            <span style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(43,37,32,0.45)" }}>
              {post.category}
            </span>
            <span style={{ color: "rgba(43,37,32,0.2)" }}>·</span>
            <span style={{ fontSize: "11px", color: "rgba(43,37,32,0.45)" }}>
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 style={{
            fontSize: "2rem", fontWeight: "700", lineHeight: 1.1,
            color: "#2b2520", letterSpacing: "-0.01em", marginBottom: "36px", maxWidth: "640px",
          }}>
            {post.title}
          </h1>

          {post.coverImage && (
            <div style={{ overflow: "hidden", marginBottom: "36px", maxWidth: "680px" }}>
              <img
                src={urlFor(post.coverImage).width(1200).quality(85).url()}
                alt={post.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}

          <div style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: 1.85, color: "#2b2520" }}>
            {post.body && (
              <PortableText
                value={post.body as Parameters<typeof PortableText>[0]["value"]}
                components={{
                  block: {
                    normal: ({ children }) => <p style={{ marginBottom: "20px" }}>{children}</p>,
                    h2: ({ children }) => <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "16px", marginTop: "40px" }}>{children}</h2>,
                    h3: ({ children }) => <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px", marginTop: "32px" }}>{children}</h3>,
                  },
                  types: {
                    image: ({ value }) => (
                      <div style={{ margin: "32px 0" }}>
                        <img
                          src={urlFor(value).width(1000).quality(85).url()}
                          alt=""
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    ),
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
