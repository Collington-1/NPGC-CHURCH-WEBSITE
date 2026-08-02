import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { EventRegistrationDialog } from "@/components/forms/event-registration-dialog";

type UpcomingEvent = {
  _id: string;
  title: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  registrationEnabled?: boolean;
};

const query = `*[_type == "upcomingEvent" && isPublished == true] | order(startDate asc)[0]{
  _id, title, "image": image.asset->url, startDate, endDate, location, description, registrationEnabled
}`;

function formatRange(start?: string, end?: string) {
  if (!start) return null;
  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  const startStr = new Date(start).toLocaleDateString("en-US", opts);
  if (!end) return startStr;
  const endStr = new Date(end).toLocaleDateString("en-US", opts);
  return startStr === endStr ? startStr : `${startStr} – ${endStr}`;
}

export async function UpcomingProgramBanner() {
  const event = await sanityFetch<UpcomingEvent | null>(query, {}, null);
  if (!event) return null;

  const dateLabel = formatRange(event.startDate, event.endDate);

  return (
    <section className="bg-[#0c0906] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-gold-500/20 bg-card lg:grid-cols-2">
          {event.image && (
            <div className="relative min-h-[16rem]">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
            </div>
          )}
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Upcoming Program
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              {event.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {dateLabel && (
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gold-500" /> {dateLabel}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold-500" /> {event.location}
                </span>
              )}
            </div>
            {event.description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            )}
            {event.registrationEnabled && (
              <div className="mt-6">
                <EventRegistrationDialog eventId={event._id} eventTitle={event.title} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
