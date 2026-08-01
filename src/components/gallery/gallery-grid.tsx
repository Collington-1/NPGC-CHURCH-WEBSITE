"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/gallery-manifest";

const categoryLabels: Record<string, string> = {
  all: "All",
  "sunday-service": "Sunday Service",
  worship: "Worship",
  praise: "Praise",
  choir: "Choir",
  pastor: "Pastor",
  children: "Children",
  outreach: "Outreach",
  prayer: "Prayer",
  "special-events": "Special Events",
  congregation: "Congregation",
};

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(() => {
    const set = new Set(images.map((img) => img.category));
    return ["all", ...Array.from(set)];
  }, [images]);

  const [active, setActive] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? images : images.filter((img) => img.category === active)),
    [images, active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
              active === cat
                ? "border-gold-500 bg-gold-500 text-primary-foreground"
                : "border-border/70 text-muted-foreground hover:border-gold-500/60 hover:text-foreground"
            )}
          >
            {categoryLabels[cat] ?? cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            onClick={() => setLightboxIndex(i)}
            className="group relative block aspect-square w-full overflow-hidden rounded-xl"
          >
            <Image
              src={img.src}
              alt={`NPGC — ${categoryLabels[img.category] ?? img.category}`}
              fill
              sizes="(min-width: 1024px) 25vw, 45vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </motion.button>
        ))}
      </div>

      {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 text-white/70 hover:text-white"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? null : (i - 1 + filtered.length) % filtered.length
                );
              }}
              className="absolute left-4 text-white/70 hover:text-white sm:left-8"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <motion.div
              key={filtered[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt="NPGC gallery"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
              }}
              className="absolute right-4 text-white/70 hover:text-white sm:right-8"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
      )}
    </div>
  );
}
