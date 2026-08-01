import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
