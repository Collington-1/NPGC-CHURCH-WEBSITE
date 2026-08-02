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
  { stage: "01", title: "New Believer", text: "Foundations of the faith — Scripture, prayer, and identity in Christ — for anyone newly born again or new to NPGC." },
  { stage: "02", title: "Growing", text: "Deepening in the Word, building a consistent prayer life, and getting rooted in church community." },
  { stage: "03", title: "Leadership Track", text: "Equipping for service and leadership — raising disciples who can, in turn, disciple others." },
];

// TODO: fine-tune with confirmed specifics via Sanity Studio (/studio -> FAQ, group "discipleship").
const fallbackFaqs = [
  {
    question: "How long does the Discipleship program run?",
    answer:
      "Discipleship is structured in stages rather than a fixed term — you move at the pace of your growth, from New Believer through to the Leadership Track.",
  },
  {
    question: "Do I need to be a member to join?",
    answer:
      "No — Discipleship is open to anyone at NPGC who wants to grow deeper in their walk with God, whether you're brand new or you've been with us for years.",
  },
  {
    question: "When and where do classes hold?",
    answer:
      "Classes are held on-site at NPGC. Submit the form below and our Discipleship team will reach out with the current schedule.",
  },
];

const gallery = [
  "/images/gallery/ministration/13-7img-5783-scaled.jpg",
  "/images/gallery/ministration/img-8824-20251012-scaled.jpg",
  "/images/gallery/prayer/img-9787-scaled.jpg",
  "/images/gallery/prayer/img-9665-20260705.jpg",
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
        image="/images/gallery/prayer/2109img-7460-scaled.jpg"
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
            Discipleship at NPGC is a structured journey that takes every
            believer from their first step of faith into mature, fruitful
            service in the Kingdom. Through teaching, mentorship, and
            hands-on ministry experience, we walk with you stage by stage —
            so you don&apos;t just attend church, you grow into everything
            God has called you to be.
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
