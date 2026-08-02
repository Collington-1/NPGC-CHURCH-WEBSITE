import { defineField, defineType } from "sanity";

// Singleton. The site normally figures out "are we live" from the weekly
// schedule (src/lib/live-schedule.ts). This document exists purely for the
// "and any other program that is streamed live" case — an admin flips
// isLiveOverride on for an unscheduled stream, and the floating button lights
// up regardless of the weekly schedule.
export const liveStatus = defineType({
  name: "liveStatus",
  title: "Live Stream Status",
  type: "document",
  fields: [
    defineField({
      name: "isLiveOverride",
      title: "Manually mark as LIVE now",
      type: "boolean",
      initialValue: false,
      description:
        "Turn this on for an unscheduled livestream (e.g. a special program). Turn it off when the stream ends. Scheduled services (morning prayer, Sunday, Tuesday Bible study) go live automatically without needing this.",
    }),
    defineField({
      name: "label",
      title: "What's streaming",
      type: "string",
      description: "Shown on the floating button, e.g. \"Watch Live: Anniversary Service\"",
    }),
    defineField({
      name: "youtubeUrl",
      title: "Livestream link override",
      type: "url",
      description: "Leave blank to use the channel's default /live link.",
    }),
  ],
});
