import { defineField, defineType } from "sanity";

export const galleryCategories = [
  { title: "Sunday Service", value: "sunday-service" },
  { title: "Worship", value: "worship" },
  { title: "Praise", value: "praise" },
  { title: "Choir", value: "choir" },
  { title: "Pastor", value: "pastor" },
  { title: "Children", value: "children" },
  { title: "Outreach", value: "outreach" },
  { title: "Prayer", value: "prayer" },
  { title: "Special Events", value: "special-events" },
];

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", type: "string" }),
    defineField({
      name: "category",
      type: "string",
      options: { list: galleryCategories },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "caption", subtitle: "category", media: "image" },
  },
});
