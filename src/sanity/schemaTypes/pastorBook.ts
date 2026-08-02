import { defineField, defineType } from "sanity";

export const pastorBook = defineType({
  name: "pastorBook",
  title: "Book (PDF)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "author", type: "string", initialValue: "Pastor Victor Eforuoku" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "file",
      title: "PDF file",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "isFree", title: "Free download", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "coverImage" },
  },
});
