import type { Metadata } from "next";
import { HandCoins, Gift, Building2, Globe2, Sprout, Landmark } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { BankDetailsCard } from "@/components/give/bank-details-card";
import { GiveForm } from "@/components/forms/give-form";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give your tithes, offerings, and seeds to The New Paradigm Global Church — securely and cheerfully.",
};

const categories = [
  { icon: Landmark, title: "Tithe", text: "Honoring God with the firstfruits of our increase." },
  { icon: Gift, title: "Offering", text: "A cheerful expression of worship and gratitude." },
  { icon: Building2, title: "Project Giving", text: "Supporting specific church projects and initiatives." },
  { icon: HandCoins, title: "Building Fund", text: "Partnering to build a house for God's presence." },
  { icon: Globe2, title: "Mission Support", text: "Fueling the spread of the gospel beyond our walls." },
  { icon: Sprout, title: "Special Seed", text: "Sowing into a specific vision or need by faith." },
];

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="Sow & Support the Vision"
        description="Your giving fuels ministry, missions, and the building of God's house."
        image="/images/gallery/prayer/2109img-7461.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/60 bg-card p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10">
                  <Icon className="h-5 w-5 text-gold-500" />
                </div>
                <p className="mt-4 font-display text-lg font-bold text-foreground">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Bank Transfer
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
              Account Details
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Give directly via bank transfer, then let us know using the
              confirmation form so we can follow up and say thank you.
            </p>
            <div className="mt-8">
              <BankDetailsCard />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Confirm Your Giving
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
              Let Us Know
            </h2>
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-8">
              <GiveForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
