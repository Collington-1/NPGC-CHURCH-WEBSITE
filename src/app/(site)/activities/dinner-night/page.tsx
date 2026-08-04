import type { Metadata } from "next";
import Image from "next/image";
import { UtensilsCrossed, Users, Sparkles } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Dinner Night",
  description:
    "Dinner Night at NPGC — an evening of food, fun, and fellowship for the whole church family.",
  alternates: { canonical: "/activities/dinner-night" },
};

const highlights = [
  {
    icon: UtensilsCrossed,
    title: "Good Food",
    text: "A shared meal, prepared with love, enjoyed together as one family.",
  },
  {
    icon: Users,
    title: "Real Connection",
    text: "A relaxed setting to build genuine friendships outside of a regular service.",
  },
  {
    icon: Sparkles,
    title: "Just for Fun",
    text: "Games, laughter, and good company — church life doesn't stop at the sanctuary door.",
  },
];

export default function DinnerNightPage() {
  return (
    <>
      <PageHero
        eyebrow="Activities · Dinner Night"
        title="Dinner Night"
        description="An evening of food, fun, and fellowship for the NPGC family."
        // TODO: placeholder photo — client is sending dedicated Dinner Night
        // photos to replace this and the gallery below.
        image="/images/gallery/happy/img-9622-20251026-scaled.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            About Dinner Night
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
            Fellowship Around the Table
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Dinner Night is a chance for the NPGC family to gather outside the
            four walls of a regular service — sharing a meal, good
            conversation, and genuine fellowship. It's church life at its most
            relaxed: no program to follow, just people enjoying one another's
            company as family.
          </p>
        </div>
      </section>

      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10">
                  <Icon className="h-6 w-6 text-gold-500" />
                </div>
                <p className="mt-4 font-display text-lg font-bold text-foreground">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Gallery
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-foreground">
            Moments From Dinner Night
          </h2>

          {/* TODO: swap this empty state for a real photo grid once the
              client sends dedicated Dinner Night photos — see
              scripts/sync-images.mjs for how new categories get added. */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-border/60 bg-card/40 px-8 py-16 text-center">
            <Image
              src="/brand/npgc-logo.png"
              alt=""
              width={40}
              height={40}
              className="mx-auto h-10 w-10 opacity-60"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Photos from our Dinner Night are coming soon — check back
              shortly!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
