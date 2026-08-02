import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, ShieldCheck, Heart, BookOpen } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { PageHero } from "@/components/layout/page-hero";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { ArkvilleForm } from "@/components/forms/arkville-form";

export const metadata: Metadata = {
  title: "Arkville — Children's Bible School",
  description:
    "Arkville is NPGC's children's Bible school — a safe, fun, and Word-filled space for kids to grow in God.",
  alternates: { canonical: "/activities/arkville" },
};

const whyJoin = [
  { icon: BookOpen, title: "Bible-Centered", text: "Age-appropriate teaching rooted in Scripture." },
  { icon: ShieldCheck, title: "Safe Environment", text: "A secure, well-supervised space for every child." },
  { icon: Heart, title: "Loving Mentors", text: "Passionate volunteers who disciple with care." },
  { icon: Sparkles, title: "Fun & Engaging", text: "Worship, games, and activities kids look forward to." },
];

// TODO: fine-tune with confirmed specifics via Sanity Studio (/studio -> FAQ, group "arkville").
const fallbackFaqs = [
  {
    question: "What age group is Arkville for?",
    answer:
      "Arkville welcomes children across our children's church age range, grouped so teaching always fits where each child is. Bring your child on your first visit and our team will place them right away.",
  },
  {
    question: "What time does Arkville hold?",
    answer:
      "Arkville runs alongside our main Sunday service, so the whole family can arrive, worship, and leave together.",
  },
  {
    question: "Do I need to register my child in advance?",
    answer:
      "No advance registration is required to visit — just bring your child on Sunday. If you'd like to register ahead of time, use the form below.",
  },
];

// TODO: no dedicated Arkville/children photography has been provided yet —
// these are the closest available images (families and congregation in
// joyful, welcoming moments). Swap in real Arkville classroom/kids photos via
// Sanity Studio as soon as they're available.
const gallery = [
  "/images/gallery/happy/img-9622-20251026-scaled.jpg",
  "/images/gallery/happy/img-8759-20251012-scaled.jpg",
  "/images/gallery/welcome/p1098348-20251012-scaled.jpg",
  "/images/gallery/welcome/p1098351-20251012-scaled.jpg",
];

const faqQuery = `*[_type == "faq" && group == "arkville"] | order(order asc){ question, answer }`;

export default async function ArkvillePage() {
  const faqs = await sanityFetch(faqQuery, {}, fallbackFaqs);

  return (
    <>
      <PageHero
        eyebrow="Activities · Arkville"
        title="Arkville"
        description="Children's Bible School — where the next generation meets the God of the Bible."
        image="/images/gallery/welcome/p1098271-20251012-scaled.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            About Arkville
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
            Built For Kids To Meet God
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Arkville is NPGC&apos;s dedicated children&apos;s ministry — a
            fun, safe, and Word-centered space where children don&apos;t just
            hear about God secondhand, but build a real relationship with Him
            for themselves. Through age-appropriate teaching, worship, and
            play, every child who walks through our doors is discipled, not
            just entertained.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border/60 bg-card px-8 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Vision
          </p>
          <p className="mt-4 font-display text-2xl font-bold leading-snug text-foreground">
            Raising children who know God for themselves from the earliest age.
          </p>
        </div>
      </section>

      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Why Join Arkville
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyJoin.map(({ icon: Icon, title, text }) => (
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
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery.map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={src} alt="Arkville" fill sizes="25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c0906] py-20 sm:py-28">
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
              Sign Your Child Up
            </h2>
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-8">
              <ArkvilleForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
