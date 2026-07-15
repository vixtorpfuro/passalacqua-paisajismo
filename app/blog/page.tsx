import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getInstagramPosts, captionToTitle } from "@/lib/instagram";
import { placeholderPosts } from "@/lib/blog-placeholders";

function timeAgo(timestamp: string): string {
  const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
  return `Hace ${Math.floor(days / 30)} meses`;
}

export default async function BlogPage() {
  const igPosts = await getInstagramPosts(30);
  const hasIG = igPosts.length > 0;

  return (
    <div style={{ backgroundColor: "#f2ede8", minHeight: "100vh" }}>
      <Header />

      <div style={{ padding: "24px" }}>
        <div className="grid-4col">
          {/* Label */}
          <div style={{
            backgroundColor: "rgba(43,37,32,0.08)",
            display: "flex", alignItems: "flex-start", padding: "20px",
            gridRow: "span 2",
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.08em", color: "#2b2520" }}>
              BLOG
            </h2>
          </div>

          {hasIG
            ? igPosts.slice(0, 29).map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ overflow: "hidden", aspectRatio: "1/1" }}>
                    <img src={post.media_url} alt={captionToTitle(post.caption)}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ paddingTop: "8px", paddingBottom: "16px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.15em", fontWeight: "600", color: "#c8873a", marginBottom: "4px" }}>
                      {timeAgo(post.timestamp)}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#2b2520" }}>
                      {captionToTitle(post.caption)}
                    </div>
                  </div>
                </Link>
              ))
            : placeholderPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ overflow: "hidden", aspectRatio: "1/1" }}>
                    <img src={post.image} alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ paddingTop: "8px", paddingBottom: "16px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.15em", fontWeight: "600", color: "#c8873a", marginBottom: "4px" }}>
                      {post.category}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#2b2520" }}>{post.title}</div>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
