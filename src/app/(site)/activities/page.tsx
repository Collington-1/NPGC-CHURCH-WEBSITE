import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Explore Arkville, our children's Bible school, and Discipleship, our growth track for believers at NPGC.",
  alternates: { canonical: "/activities" },
};

const activities = [
  {
    href: "/activities/arkville",
    title: "Arkville",
    tagline: "Children's Bible School",
    description:
      "A vibrant, safe space where children encounter God's Word in ways built for them.",
    image: "/images/gallery/congregation/img-8746-20251012.jpg",
  },
  {
    href: "/activities/discipleship",
    title: "Discipleship",
    tagline: "Growing into spiritual maturity",
    description:
      "A structured path to help every believer grow deep roots and bear lasting fruit.",
    image: "/images/gallery/prayer/2109img-7469.jpg",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Activities"
        title="Grow With Us"
        description="Dedicated tracks for children and for believers pursuing spiritual growth."
        image="/images/gallery/worship/13-7img-5187-2.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2">
          {activities.map((activity) => (
            <Link
              key={activity.href}
              href={activity.href}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                  {activity.tagline}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-white">
                  {activity.title}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                  {activity.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-400">
                  Learn more <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
