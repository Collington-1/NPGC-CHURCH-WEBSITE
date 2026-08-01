import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { pastorSpotlightImage } from "@/lib/curated-images";

export function MeetPastor() {
  return (
    <section className="relative overflow-hidden bg-[#0c0906] py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-3xl lg:order-1">
          <Image
            src={pastorSpotlightImage}
            alt="Pastor Victor Eforuoku ministering"
            fill
            sizes="(min-width: 1024px) 40rem, 90vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Meet Our Pastor
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Pastor Victor Eforuoku
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold-400">
            Lead Pastor, NPGC
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Pastor Victor Eforuoku is the Founder and Lead Pastor of The New
            Paradigm Global Church (NPGC), a prophetic teaching ministry
            dedicated to raising influential people for global impact. He
            oversees a vibrant community of believers focused on spiritual
            growth, prayer, and the transformation of lives by the Word of
            God.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400"
          >
            Read the full story
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
