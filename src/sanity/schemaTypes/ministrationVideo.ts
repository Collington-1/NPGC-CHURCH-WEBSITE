import { defineField, defineType } from "sanity";

export const ministrationVideo = defineType({
  name: "ministrationVideo",
  title: "Video (Ministration/Clip)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "speaker", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "source",
      title: "Video source",
      type: "string",
      options: { list: [{ title: "YouTube link", value: "youtube" }, { title: "Uploaded file", value: "file" }] },
      initialValue: "youtube",
    }),
    defineField({
      name: "youtubeUrl",
      type: "url",
      hidden: ({ parent }) => parent?.source !== "youtube",
    }),
    defineField({
      name: "file",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.source !== "file",
    }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
  ],
  orderings: [
    { title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "speaker", media: "thumbnail" },
  },
});
