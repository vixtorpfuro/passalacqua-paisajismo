import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getInstagramPosts, captionToTitle } from "@/lib/instagram";
import { placeholderPosts, type BlogPost } from "@/lib/blog-placeholders";

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

type SidebarItem = { id: string; title: string; image: string; timestamp: string };

function Sidebar({ items, activeId }: { items: SidebarItem[]; activeId: string }) {
  return (
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
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <Link key={item.id} href={`/blog/${item.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr", gap: "10px", alignItems: "center",
                padding: "10px 0", paddingLeft: isActive ? "8px" : "0",
                borderBottom: "1px solid rgba(43,37,32,0.08)",
                borderLeft: isActive ? "2px solid #c8873a" : "2px solid transparent",
              }}>
                <div style={{ width: "48px", height: "48px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div>
                  <div style={{
                    fontSize: "11px", fontWeight: isActive ? "700" : "500",
                    color: isActive ? "#c8873a" : "#2b2520", lineHeight: 1.35,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(43,37,32,0.4)", marginTop: "3px" }}>
                    {timeAgo(item.timestamp)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function PostContent({ title, image, timestamp, body, permalink }: {
  title: string; image: string; timestamp: string; body: string; permalink?: string;
}) {
  return (
    <div style={{ padding: "48px 56px 80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/blog" style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: "600", color: "#c8873a", textDecoration: "none" }}>
          ← Blog
        </Link>
        <span style={{ color: "rgba(43,37,32,0.2)" }}>·</span>
        <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(43,37,32,0.45)" }}>
          {formatDate(timestamp)}
        </span>
      </div>

      <h1 style={{
        fontSize: "2rem", fontWeight: "700", lineHeight: 1.1,
        color: "#2b2520", letterSpacing: "-0.01em", marginBottom: "36px", maxWidth: "640px",
      }}>
        {title}
      </h1>

      <div style={{ overflow: "hidden", marginBottom: "36px", maxWidth: "680px" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      <div style={{ maxWidth: "620px" }}>
        {body.split("\n").filter(Boolean).map((paragraph, i) => (
          <p key={i} style={{ fontSize: "1rem", lineHeight: 1.85, color: "#2b2520", marginBottom: "20px" }}>
            {paragraph}
          </p>
        ))}
      </div>

      {permalink && (
        <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(43,37,32,0.12)" }}>
          <a href={permalink} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em",
            color: "#f2ede8", backgroundColor: "#2b2520",
            padding: "12px 24px", textDecoration: "none",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            VER EN INSTAGRAM
          </a>
        </div>
      )}
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const igPosts = await getInstagramPosts(30);
  const hasIG = igPosts.length > 0;

  if (hasIG) {
    const post = igPosts.find((p) => p.id === id);
    if (!post) notFound();

    const sidebarItems: SidebarItem[] = igPosts.map((p) => ({
      id: p.id, title: captionToTitle(p.caption), image: p.media_url, timestamp: p.timestamp,
    }));

    const body = (post.caption ?? "").replace(/#\w+/g, "").replace(/\s+/g, " ").trim();

    return (
      <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
        <Header />
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "calc(100vh - 73px)" }}>
          <Sidebar items={sidebarItems} activeId={id} />
          <PostContent
            title={captionToTitle(post.caption)}
            image={post.media_url}
            timestamp={post.timestamp}
            body={body}
            permalink={post.permalink}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Sin token — usar placeholders
  const post: BlogPost | undefined = placeholderPosts.find((p) => p.id === id);
  if (!post) notFound();

  const sidebarItems: SidebarItem[] = placeholderPosts.map((p) => ({
    id: p.id, title: p.title, image: p.image, timestamp: p.timestamp,
  }));

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "calc(100vh - 73px)" }}>
        <Sidebar items={sidebarItems} activeId={id} />
        <PostContent title={post.title} image={post.image} timestamp={post.timestamp} body={post.body} />
      </div>
      <Footer />
    </div>
  );
}
