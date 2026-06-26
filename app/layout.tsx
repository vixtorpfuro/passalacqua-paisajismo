import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Passalacqua Paisajismo",
  description: "Wellbeing a través del paisaje.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
