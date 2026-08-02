import { defineField, defineType } from "sanity";

export const youtubeShort = defineType({
  name: "youtubeShort",
  title: "YouTube Short",
  type: "document",
  fields: [
    defineField({
      name: "url",
      title: "YouTube Shorts URL",
      type: "url",
      description: "Paste the full link, e.g. https://www.youtube.com/shorts/XXXXXXXXXXX",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "url" },
  },
});
