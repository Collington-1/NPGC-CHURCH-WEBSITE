import { defineField, defineType } from "sanity";

export const arkvilleRegistration = defineType({
  name: "arkvilleRegistration",
  title: "Arkville Registration",
  type: "document",
  fields: [
    defineField({ name: "parentName", type: "string" }),
    defineField({ name: "parentPhone", type: "string" }),
    defineField({ name: "parentEmail", type: "string" }),
    defineField({ name: "childName", type: "string" }),
    defineField({ name: "childAge", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "childName", subtitle: "parentName" },
  },
});
