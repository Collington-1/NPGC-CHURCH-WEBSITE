import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The New Paradigm Global Church (NPGC)",
    template: "%s | NPGC",
  },
  description:
    "The New Paradigm Global Church (NPGC) — a Spirit-filled community in Port Harcourt, Nigeria, led by Pastor Victor Eforuoku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", syne.variable, inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
