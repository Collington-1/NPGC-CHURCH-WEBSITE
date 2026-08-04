"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { heroSlides } from "@/lib/curated-images";
import { Button } from "@/components/ui/button";

const SLIDE_DURATION = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_DURATION
    );
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-black">
      {/* All slides stay mounted; only opacity animates. Avoids relying on
          exit-animation unmounting, which framer-motion doesn't reliably
          complete for this stack — see gallery-grid.tsx for the same issue. */}
      {heroSlides.map((s, i) => (
        <motion.div
          key={s.src}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ zIndex: i === index ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.heading}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/50 to-black/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/10 to-black/60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-32 lg:pb-32 lg:pt-40">
        <motion.div
          key={slide.heading}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
            The New Paradigm Global Church
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-6xl sm:leading-[1.05] lg:text-7xl">
            {slide.heading}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
            {slide.subheading}
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gold-500 px-6 text-sm font-semibold text-primary-foreground hover:bg-gold-400 sm:px-8 sm:text-base"
          >
            <Link href="/about">Plan Your Visit</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:px-8 sm:text-base"
          >
            <Link href="/give">Give Online</Link>
          </Button>
        </div>

        <div className="mt-10 flex gap-2 sm:mt-16">
          {heroSlides.map((s, i) => (
            <button
              key={s.src}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-10 bg-gold-500" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
