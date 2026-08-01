import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { mainNav, siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { FacebookIcon, YoutubeIcon, InstagramIcon } from "@/components/icons/social-icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-[#0c0906]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-xl font-bold text-foreground">
              {siteConfig.shortName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} A Spirit-filled community raising
              world-changers in Port Harcourt, Nigeria.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
                { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              Quick Links
            </p>
            <ul className="mt-4 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/give"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Give
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              Contact
            </p>
            <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-foreground">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              Stay Connected
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Get sermon updates, program dates, and church news in your
              inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with love for the Kingdom.</p>
        </div>
      </div>
    </footer>
  );
}
