import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryImages, type GalleryImage } from "@/lib/gallery-manifest";
import { PageHero } from "@/components/layout/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from NPGC — Sunday services, worship, prayer, special events, and church life.",
  alternates: { canonical: "/gallery" },
};

const query = `*[_type == "galleryImage"] | order(order asc){
  "src": image.asset->url, category
}`;

export default async function GalleryPage() {
  const cmsImages = await sanityFetch<GalleryImage[]>(query, {}, []);
  const allImages = [...cmsImages, ...galleryImages];

  return (
    <>
      <PageHero
        eyebrow="Life at NPGC"
        title="Gallery"
        description="Moments of worship, prayer, and community from across our church."
        image="/images/gallery/special-events/img-20250417-wa0059.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <GalleryGrid images={allImages} />
        </div>
      </section>
    </>
  );
}
