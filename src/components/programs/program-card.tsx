import Image from "next/image";

import type { ProgramFallback } from "@/lib/programs-data";

export function ProgramCard({ program }: { program: ProgramFallback }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={program.image}
          alt={program.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-xl font-bold text-white">
          {program.name}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-400">
          {program.schedule}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          {program.description}
        </p>
      </div>
    </div>
  );
}
