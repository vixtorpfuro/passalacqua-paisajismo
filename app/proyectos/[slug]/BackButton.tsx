"use client";
import { useRouter, useSearchParams } from "next/navigation";

function useBackUrl() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");
  return cat ? `/proyectos?cat=${encodeURIComponent(cat)}` : "/proyectos";
}

export function BackButtonInline() {
  const router = useRouter();
  const backUrl = useBackUrl();
  return (
    <button
      onClick={() => router.push(backUrl)}
      style={{
        fontSize: "11px", letterSpacing: "0.12em", color: "#c8873a",
        textDecoration: "none", fontWeight: "600",
        background: "none", border: "none", cursor: "pointer", padding: 0,
        fontFamily: "inherit",
      }}
    >
      ← Proyectos
    </button>
  );
}

export function BackButtonFull() {
  const router = useRouter();
  const backUrl = useBackUrl();
  return (
    <button
      onClick={() => router.push(backUrl)}
      style={{
        fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em",
        color: "#f2ede8", backgroundColor: "#2b2520",
        padding: "14px 28px", border: "none", cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      ← VOLVER
    </button>
  );
}
