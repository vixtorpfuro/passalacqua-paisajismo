import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      {/* Hero fullscreen */}
      <div className="relative w-full" style={{ height: "100vh" }}>
        <img
          src="/home/07-casa-via-roja@2x.webp"
          alt="Passalacqua Paisajismo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle dark overlay at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>
    </div>
  );
}
