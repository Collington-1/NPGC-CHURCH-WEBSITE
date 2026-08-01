import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const preview = [
  "/images/gallery/worship/13-7img-4985-2.jpg",
  "/images/gallery/prayer/2109img-7334.jpg",
  "/images/gallery/congregation/img-8746-20251012.jpg",
  "/images/gallery/special-events/img-20250417-wa0058.jpg",
  "/images/gallery/worship/13-7img-5300.jpg",
  "/images/gallery/pastor/img-6375.jpg",
];

export function GalleryPreview() {
  return (
    <section className="bg-[#0c0906] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Life at NPGC
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              From the Gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400"
          >
            View full gallery
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {preview.map((src, i) => (
            <Link
              key={src}
              href="/gallery"
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt="NPGC gallery photo"
                fill
                sizes="(min-width: 1024px) 16vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
