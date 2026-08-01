import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", description: "e.g. Member since 2019" }),
    defineField({ name: "quote", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "videoUrl", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "quote", media: "photo" },
  },
});
