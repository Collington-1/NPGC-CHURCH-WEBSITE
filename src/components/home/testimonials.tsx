import Image from "next/image";
import { Quote } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";

type Testimonial = {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  photo?: { asset: { _ref: string } } | string | null;
};

// Names and photos are real (confirmed by the client). The quotes below are
// still provisional, plausible-but-generic placeholder lines — NOT each
// woman's actual words — because we don't have their real testimony text
// yet. Swap these for what they actually said via Sanity Studio (Testimonial)
// as soon as it's available; don't leave generic copy attributed to a real
// name any longer than necessary.
const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Sister Grace",
    role: "NPGC Member",
    quote: "My time at NPGC has stretched my faith in ways I didn't expect. I've grown so much.",
    photo: "/images/gallery/testimonies/13-7img-5539-2-scaled.jpg",
  },
  {
    _id: "2",
    name: "Sister Favor",
    role: "NPGC Member",
    quote: "The teaching here is practical and Spirit-led — it meets me exactly where I am.",
    photo: "/images/gallery/testimonies/img-0710-20260726.jpg",
  },
  {
    _id: "3",
    name: "Sister Blessing",
    role: "NPGC Member",
    quote: "I found a family here, not just a church service.",
    photo: "/images/gallery/testimonies/2109img-7350-scaled.jpg",
  },
];

const query = `*[_type == "testimonial"][0...6]{ _id, name, role, quote, photo }`;

export async function Testimonials() {
  const testimonials = await sanityFetch<Testimonial[]>(
    query,
    {},
    fallbackTestimonials
  );

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
          Changed Lives
        </p>
        <h2 className="mt-4 text-center font-display text-4xl font-bold text-foreground sm:text-5xl">
          Testimonials
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t._id}
              className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-8"
            >
              <Quote className="h-8 w-8 text-gold-500" />
              <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-secondary">
                  {t.photo && (
                    <Image
                      src={
                        typeof t.photo === "string"
                          ? t.photo
                          : urlForImage(t.photo as never).width(80).height(80).url()
                      }
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  {t.role && (
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
