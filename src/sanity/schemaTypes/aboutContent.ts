import { defineField, defineType } from "sanity";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "About Page Content",
  type: "document",
  fields: [
    defineField({ name: "story", type: "text", rows: 6, title: "Church Story" }),
    defineField({ name: "vision", type: "text", rows: 3 }),
    defineField({ name: "mission", type: "text", rows: 3 }),
    defineField({
      name: "coreValues",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
    defineField({ name: "statementOfFaith", type: "text", rows: 10 }),
    defineField({
      name: "timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", type: "string" },
            { name: "event", type: "string" },
          ],
        },
      ],
    }),
  ],
});
