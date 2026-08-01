import { defineField, defineType } from "sanity";

export const discipleshipRegistration = defineType({
  name: "discipleshipRegistration",
  title: "Discipleship Registration",
  type: "document",
  fields: [
    defineField({ name: "fullName", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({
      name: "stage",
      type: "string",
      options: {
        list: [
          { title: "New Believer", value: "new-believer" },
          { title: "Growing", value: "growing" },
          { title: "Leadership Track", value: "leadership" },
        ],
      },
    }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "stage" },
  },
});
