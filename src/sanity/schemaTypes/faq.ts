import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "group",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Arkville", value: "arkville" },
          { title: "Discipleship", value: "discipleship" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: {
    select: { title: "question", subtitle: "group" },
  },
});
