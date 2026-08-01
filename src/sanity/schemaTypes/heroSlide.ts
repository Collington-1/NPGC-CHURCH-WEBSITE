import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subheading", type: "text", rows: 2 }),
    defineField({ name: "ctaPrimaryLabel", type: "string" }),
    defineField({ name: "ctaPrimaryHref", type: "string" }),
    defineField({ name: "ctaSecondaryLabel", type: "string" }),
    defineField({ name: "ctaSecondaryHref", type: "string" }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "heading", media: "image" },
  },
});
