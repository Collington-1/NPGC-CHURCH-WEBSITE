import { defineField, defineType } from "sanity";

export const galleryCategories = [
  { title: "Welcome", value: "welcome" },
  { title: "Celebration", value: "happy" },
  { title: "Prayer", value: "prayer" },
  { title: "Ministration", value: "ministration" },
  { title: "Pastor", value: "pastor" },
  { title: "Pastor's Wife", value: "pastors-wife" },
  { title: "Programs", value: "programs" },
  { title: "Testimonies", value: "testimonies" },
  { title: "Worship", value: "worship" },
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
