"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/proyectos", label: "PROYECTOS" },
  { href: "/wellbeing", label: "WELLBEING" },
  { href: "/nosotras", label: "NOSOTRAS" },
  { href: "/servicios", label: "SERVICIOS" },
  { href: "/market", label: "MARKET" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const textColor = isHome ? "#f2ede8" : "#2b2520";
  const subtleColor = isHome ? "rgba(242,237,232,0.7)" : "rgba(43,37,32,0.55)";

  return (
    <header
      style={{
        position: isHome ? "absolute" : "relative",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isHome ? "transparent" : "#f2ede8",
        borderBottom: isHome ? "none" : "1px solid rgba(43,37,32,0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 32px",
          gap: "24px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Logo_web@3x.png"
            alt="Passalacqua Paisajismo"
            style={{ width: "44px", height: "44px", objectFit: "contain" }}
          />
          <div>
            <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.15em", color: textColor, lineHeight: 1.2 }}>
              PASSALACQUA
            </div>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: textColor, lineHeight: 1.2 }}>
              PAISAJISMO
            </div>
            <div style={{ fontSize: "10px", fontStyle: "italic", color: subtleColor, marginTop: "1px" }}>
              Wellbeing a través del paisaje.
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px", flexShrink: 0 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                fontWeight: "500",
                textDecoration: "none",
                color: pathname === link.href ? "#c8873a" : textColor,
                borderBottom: pathname === link.href ? "2px solid #c8873a" : "2px solid transparent",
                paddingBottom: "2px",
                transition: "opacity 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/conecta"
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              fontWeight: "700",
              textDecoration: "none",
              color: "#c8873a",
            }}
          >
            CONECTA
          </Link>

          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                backgroundColor: isHome ? "rgba(43,37,32,0.6)" : "#2b2520",
                color: "#f2ede8",
                textDecoration: "none",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: `2px solid ${isHome ? "#f2ede8" : "#2b2520"}`,
                color: textColor,
                textDecoration: "none",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
