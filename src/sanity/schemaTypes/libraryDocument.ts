import { defineField, defineType } from "sanity";

export const libraryDocument = defineType({
  name: "libraryDocument",
  title: "Library Document",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", description: "e.g. Bible Study Notes, Forms, Devotionals" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "file",
      title: "Document file",
      type: "file",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
