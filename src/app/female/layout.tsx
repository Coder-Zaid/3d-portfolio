import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/providers";
import AppOverlays from "@/components/app-overlays";
import Header from "@/components/header/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Syeda Zubia Areej | AI & Video Editor Portfolio",
  description: "Creative portfolio for AI & Video Editing expertise.",
};

export default function FemaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, archivoBlack.variable, "font-display"].join(" ")} suppressHydrationWarning>
      <body className="female-theme bg-transparent">
        <Providers>
          <Header />
          {children}
          <AppOverlays />
        </Providers>
      </body>
    </html>
  );
}
