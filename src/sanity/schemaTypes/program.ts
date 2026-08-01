import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "schedule", type: "string", description: "e.g. Sundays, 8am & 10am" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "schedule", media: "image" },
  },
});
