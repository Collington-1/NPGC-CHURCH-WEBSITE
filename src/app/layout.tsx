import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const defaultTitle = "The New Paradigm Global Church (NPGC)";
const defaultDescription =
  "The New Paradigm Global Church (NPGC) — a Spirit-filled community in Port Harcourt, Nigeria, led by Pastor Victor Eforuoku.";
const ogImage = "/images/gallery/worship/13-7img-4977-2.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: "%s | NPGC",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: ogImage, width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  icons: {
    icon: "/brand/npgc-logo.png",
    apple: "/brand/npgc-logo.png",
  },
};

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.youtube],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
