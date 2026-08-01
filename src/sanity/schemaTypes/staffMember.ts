import { defineField, defineType } from "sanity";

export const staffMember = defineType({
  name: "staffMember",
  title: "Leadership",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "isLeadPastor", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
