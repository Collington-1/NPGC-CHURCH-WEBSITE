import type { Metadata } from "next";
import Image from "next/image";
import { Flame, BookOpen, HandHeart, Users, Rocket } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  fallbackAboutContent,
  fallbackStaff,
  type AboutContent,
  type StaffMemberFallback,
} from "@/lib/about-data";
import { PageHero } from "@/components/layout/page-hero";
import { aboutStoryImage } from "@/lib/curated-images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The New Paradigm Global Church (NPGC) — our story, vision, mission, core values, statement of faith, and leadership.",
};

const valueIcons = [Flame, HandHeart, Rocket, Users, BookOpen];

const contentQuery = `*[_type == "aboutContent"][0]`;
const staffQuery = `*[_type == "staffMember"] | order(order asc){ _id, name, role, bio, "photo": photo.asset->url, isLeadPastor }`;

export default async function AboutPage() {
  const content = await sanityFetch<AboutContent>(
    contentQuery,
    {},
    fallbackAboutContent
  );
  const staff = await sanityFetch<StaffMemberFallback[]>(
    staffQuery,
    {},
    fallbackStaff
  );

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="About NPGC"
        description="A Spirit-filled family raising world-changers in Port Harcourt, Nigeria."
        image="/images/gallery/worship/13-7img-5154-2.jpg"
      />

      {/* Story */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Image
              src={aboutStoryImage}
              alt="NPGC congregation"
              fill
              sizes="(min-width: 1024px) 40rem, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Our Story
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
              How We Began
            </h2>
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {content.story}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Vision
            </p>
            <p className="mt-5 font-display text-2xl font-bold leading-snug text-foreground">
              {content.vision}
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Mission
            </p>
            <p className="mt-5 font-display text-2xl font-bold leading-snug text-foreground">
              {content.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            What We Stand On
          </p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold text-foreground">
            Core Values
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {content.coreValues.map((value, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10">
                    <Icon className="h-6 w-6 text-gold-500" />
                  </div>
                  <p className="mt-4 font-display text-lg font-bold text-foreground">
                    {value.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            What We Believe
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
            Statement of Faith
          </h2>
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
            {content.statementOfFaith}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Our Journey
          </p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold text-foreground">
            Timeline
          </h2>
          <div className="mt-14 space-y-8 border-l border-border pl-8">
            {content.timeline.map((item) => (
              <div key={item.year + item.event} className="relative">
                <div className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-gold-500" />
                <p className="text-sm font-semibold text-gold-400">{item.year}</p>
                <p className="mt-1 text-base text-muted-foreground">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#0c0906] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Leadership
          </p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold text-foreground">
            Meet the Team
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((member) => (
              <div
                key={member._id}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="font-display text-xl font-bold text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-400">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
