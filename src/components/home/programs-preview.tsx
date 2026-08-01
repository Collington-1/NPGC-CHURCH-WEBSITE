import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { fallbackPrograms } from "@/lib/programs-data";
import { ProgramCard } from "@/components/programs/program-card";

export function ProgramsPreview() {
  const featured = fallbackPrograms.slice(0, 4);

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Get Involved
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Upcoming Programs
            </h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400"
          >
            View all programs
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
