import { defineField, defineType } from "sanity";

export const sermon = defineType({
  name: "sermon",
  title: "Sermon",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "speaker", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "youtubeUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
  orderings: [
    { title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "speaker", media: "thumbnail" },
  },
});
