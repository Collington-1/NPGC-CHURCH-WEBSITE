import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

const routes = [
  "",
  "/about",
  "/programs",
  "/activities",
  "/activities/arkville",
  "/activities/discipleship",
  "/activities/dinner-night",
  "/gallery",
  "/give",
  "/resources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
