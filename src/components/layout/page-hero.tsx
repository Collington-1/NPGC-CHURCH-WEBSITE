import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-[60vh] min-h-[420px] w-full items-end overflow-hidden bg-black">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
