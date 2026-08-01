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

// Demo quotes (clearly not real — swap for genuine member testimonials via
// Sanity Studio at /studio -> Testimonial). Photos are real members captured
// mid-testimony/mic-in-hand, per the client's note that testimonial photos
// specifically should show a member holding a microphone.
const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "A Member's Story",
    role: "Demo testimonial — replace with a real one",
    quote:
      "Since joining NPGC, I've experienced real growth in my walk with God. (Demo text — replace with a genuine member testimonial in Sanity Studio.)",
    photo: "/images/gallery/congregation/img-8746-20251012.jpg",
  },
  {
    _id: "2",
    name: "A Member's Story",
    role: "Demo testimonial — replace with a real one",
    quote:
      "The teaching here is practical and Spirit-led. (Demo text — replace with a genuine member testimonial in Sanity Studio.)",
    photo: "/images/gallery/congregation/img-8747-20251012.jpg",
  },
  {
    _id: "3",
    name: "A Member's Story",
    role: "Demo testimonial — replace with a real one",
    quote:
      "I found a family here, not just a church service. (Demo text — replace with a genuine member testimonial in Sanity Studio.)",
    photo: "/images/gallery/congregation/img-8746-20251012.jpg",
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
