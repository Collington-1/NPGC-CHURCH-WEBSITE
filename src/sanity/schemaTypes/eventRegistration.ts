import { defineField, defineType } from "sanity";

export const eventRegistration = defineType({
  name: "eventRegistration",
  title: "Program Registration",
  type: "document",
  fields: [
    defineField({ name: "event", type: "reference", to: [{ type: "upcomingEvent" }] }),
    defineField({ name: "fullName", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "message", type: "text", rows: 3 }),
    defineField({ name: "createdAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "email" },
  },
});
