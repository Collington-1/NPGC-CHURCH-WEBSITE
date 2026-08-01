import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  {
    title: "Impact",
    description:
      "Every gathering is built to move you from where you are into who God has called you to be.",
  },
  {
    title: "Transformation",
    description:
      "We disciple believers into fully mature, world-changing sons and daughters of the Kingdom.",
  },
  {
    title: "Soul Winning",
    description:
      "Reaching Port Harcourt and beyond with the uncompromised gospel of Jesus Christ.",
  },
];

export function WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl">
              <Image
                src="/images/gallery/worship/13-7img-4176.jpg"
                alt="Congregation worshipping at NPGC"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 hidden aspect-[4/5] w-48 overflow-hidden rounded-2xl border-4 border-background shadow-2xl sm:block">
              <Image
                src="/images/gallery/prayer/2109img-7304.jpg"
                alt="A moment of prayer at NPGC"
                fill
                sizes="12rem"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Welcome to NPGC
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Your place for a shift.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The New Paradigm Global Church is a Spirit-filled community in
              Port Harcourt raising world-changers &mdash; fully mature
              disciples and vibrant servants of the gospel. Whatever season
              you&apos;re in, there is a seat for you here.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title}>
                  <div className="h-1 w-8 rounded-full bg-gold-500" />
                  <p className="mt-3 font-display text-lg font-bold text-foreground">
                    {pillar.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gold-500 transition-colors hover:text-gold-400"
            >
              Learn more about us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
