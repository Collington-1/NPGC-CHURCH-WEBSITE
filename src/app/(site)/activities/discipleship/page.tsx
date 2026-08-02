import type { Metadata } from "next";
import Image from "next/image";
import { Compass, TrendingUp, Users2 } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { PageHero } from "@/components/layout/page-hero";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { DiscipleshipForm } from "@/components/forms/discipleship-form";

export const metadata: Metadata = {
  title: "Discipleship",
  description:
    "NPGC's Discipleship track helps believers grow into spiritual maturity through structured stages of teaching and mentorship.",
  alternates: { canonical: "/activities/discipleship" },
};

const benefits = [
  { icon: Compass, title: "Clear Direction", text: "A guided path for your walk with God, wherever you're starting from." },
  { icon: TrendingUp, title: "Real Growth", text: "Practical teaching that builds lasting spiritual habits." },
  { icon: Users2, title: "Community", text: "Grow alongside others pursuing the same goal." },
];

const stages = [
  { stage: "01", title: "New Believer", text: "[Placeholder] Foundations of faith for those newly born again." },
  { stage: "02", title: "Growing", text: "[Placeholder] Deepening in the Word, prayer, and church life." },
  { stage: "03", title: "Leadership Track", text: "[Placeholder] Equipping for service and leadership in the church." },
];

// TODO: replace with confirmed FAQ content via Sanity Studio (/studio -> FAQ, group "discipleship").
const fallbackFaqs = [
  {
    question: "How long does the Discipleship program run?",
    answer: "[Placeholder] Confirm the program duration per stage.",
  },
  {
    question: "Do I need to be a member to join?",
    answer: "[Placeholder] Confirm membership requirements.",
  },
  {
    question: "When and where do classes hold?",
    answer: "[Placeholder] Confirm schedule and location.",
  },
];

const gallery = [
  "/images/gallery/prayer/2109img-7476.jpg",
  "/images/gallery/worship/13-7img-5143-2.jpg",
  "/images/gallery/prayer/2109img-7359.jpg",
  "/images/gallery/worship/13-7img-4977-2.jpg",
];

const faqQuery = `*[_type == "faq" && group == "discipleship"] | order(order asc){ question, answer }`;

export default async function DiscipleshipPage() {
  const faqs = await sanityFetch(faqQuery, {}, fallbackFaqs);

  return (
    <>
      <PageHero
        eyebrow="Activities · Discipleship"
        title="Discipleship"
        description="A structured path to spiritual maturity — for every believer, at every stage."
        image="/images/gallery/prayer/2109img-7273.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Program Overview
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
            Growing Deep Roots
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            [Placeholder] Discipleship at NPGC is a structured journey that
            takes every believer from their first step of faith into mature,
            fruitful service in the Kingdom. Replace this paragraph with the
            confirmed program overview.
          </p>
        </div>
      </section>

      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Benefits
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
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
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Training Stages
          </p>
          <div className="mt-14 space-y-6">
            {stages.map((s) => (
              <div
                key={s.stage}
                className="flex gap-6 rounded-2xl border border-border/60 bg-card p-8"
              >
                <span className="font-display text-3xl font-extrabold text-gold-500">
                  {s.stage}
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-foreground">{s.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Gallery
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery.map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={src} alt="Discipleship" fill sizes="25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              FAQs
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
              Common Questions
            </h2>
            <div className="mt-8">
              <FaqAccordion items={faqs} />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Register
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
              Start Your Journey
            </h2>
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-8">
              <DiscipleshipForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
