import { defineField, defineType } from "sanity";

export const giveConfirmation = defineType({
  name: "giveConfirmation",
  title: "Giving Confirmation",
  type: "document",
  fields: [
    defineField({ name: "fullName", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "amount", type: "string" }),
    defineField({
      name: "purpose",
      type: "string",
      options: {
        list: [
          "Tithe",
          "Offering",
          "Project Giving",
          "Building Fund",
          "Mission Support",
          "Special Seed",
        ].map((v) => ({ title: v, value: v })),
      },
    }),
    defineField({ name: "reference", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "submittedAt", type: "datetime" }),
    defineField({
      name: "method",
      type: "string",
      options: { list: ["Bank Transfer", "Card"] },
      initialValue: "Bank Transfer",
    }),
    defineField({ name: "currency", type: "string" }),
    defineField({ name: "flwTransactionId", type: "string" }),
    defineField({ name: "flwTxRef", type: "string" }),
    defineField({ name: "verified", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "purpose" },
  },
});
