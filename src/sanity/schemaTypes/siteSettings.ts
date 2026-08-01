import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "The New Paradigm Global Church" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "addressLine1", type: "string" }),
    defineField({ name: "addressLine2", type: "string" }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "mapsUrl", type: "url" }),
    defineField({ name: "youtubeUrl", type: "url" }),
    defineField({ name: "facebookUrl", type: "url" }),
    defineField({ name: "instagramUrl", type: "url" }),
    defineField({
      name: "serviceTimes",
      title: "Service Times",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "time", type: "string" },
          ],
        },
      ],
    }),
  ],
});
