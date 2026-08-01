import Image from "next/image";
import Link from "next/link";

import { givingImage } from "@/lib/curated-images";
import { Button } from "@/components/ui/button";

export function GivingCta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Image
        src={givingImage}
        alt="Giving at NPGC"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
          Sow &amp; Support the Vision
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
          Give Cheerfully, Give Faithfully
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
          Your tithes, offerings, and seeds fund ministry, missions, and the
          building of God&apos;s house. Thank you for sowing into the
          Kingdom with us.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-gold-500 px-10 text-base font-semibold text-primary-foreground hover:bg-gold-400"
        >
          <Link href="/give">Give Now</Link>
        </Button>
      </div>
    </section>
  );
}
