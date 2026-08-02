import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import { fallbackPrograms, type ProgramFallback } from "@/lib/programs-data";
import { ProgramCard } from "@/components/programs/program-card";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore NPGC's programs — Sunday Service, Holy Communion, Bible Study, Prayer Meetings, Night Vigil, Conferences, Retreats, and Special Programs.",
  alternates: { canonical: "/programs" },
};

const query = `*[_type == "program"] | order(order asc){
  _id, name, slug, schedule, description, "image": image.asset->url
}`;

export default async function ProgramsPage() {
  const programs = await sanityFetch<ProgramFallback[]>(
    query,
    {},
    fallbackPrograms
  );

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Our Programs"
        description="From Sunday gatherings to seasons of prayer and impact — find your rhythm with us."
        image="/images/gallery/worship/13-7img-5186-2.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program._id} program={program} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
