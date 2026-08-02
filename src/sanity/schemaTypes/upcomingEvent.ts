import { defineField, defineType } from "sanity";

// Covers annual conferences / anniversaries / special programs that need
// their own promo info and, optionally, a registration form. Day-to-day
// recurring programs (Sunday Service, Bible Study, etc.) stay in `program`.
export const upcomingEvent = defineType({
  name: "upcomingEvent",
  title: "Upcoming Program",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "startDate", type: "datetime" }),
    defineField({ name: "endDate", type: "datetime" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "registrationEnabled",
      title: "Accept registrations",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPublished",
      title: "Show on site",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Start date", name: "startDateAsc", by: [{ field: "startDate", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
