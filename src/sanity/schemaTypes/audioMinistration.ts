import { defineField, defineType } from "sanity";

export const audioMinistration = defineType({
  name: "audioMinistration",
  title: "Audio (MP3)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "speaker", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({
      name: "file",
      title: "MP3 file",
      type: "file",
      options: { accept: "audio/*" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
  ],
  orderings: [
    { title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "speaker", media: "coverImage" },
  },
});
