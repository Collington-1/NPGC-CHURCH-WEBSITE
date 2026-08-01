import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/forms/contact-form";

export function ContactSection() {
  const mapQuery = encodeURIComponent(
    `${siteConfig.address.line1}, ${siteConfig.address.city}`
  );

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
          We&apos;d Love to Meet You
        </p>
        <h2 className="mt-4 text-center font-display text-4xl font-bold text-foreground sm:text-5xl">
          Get In Touch
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-border/60">
              <iframe
                title="NPGC location map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-64 w-full grayscale invert-0"
                loading="lazy"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-gold-500" />
                <p className="text-sm text-muted-foreground">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}
                </p>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-gold-500" />
                <p className="text-sm text-muted-foreground">{siteConfig.phone}</p>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold-500" />
                <p className="text-sm text-muted-foreground">{siteConfig.email}</p>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 shrink-0 text-gold-500" />
                <p className="text-sm text-muted-foreground">
                  {siteConfig.serviceTimes.map((s) => (
                    <span key={s.label} className="block">
                      {s.label}: {s.time}
                    </span>
                  ))}
                </p>
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex gap-3 transition-colors hover:text-foreground"
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-gold-500" />
                <span className="text-sm text-muted-foreground">
                  Chat with us on WhatsApp
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
