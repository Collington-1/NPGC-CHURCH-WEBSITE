import { defineField, defineType } from "sanity";

export const newsletterSubmission = defineType({
  name: "newsletterSubmission",
  title: "Newsletter Signup",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "email" },
  },
});
