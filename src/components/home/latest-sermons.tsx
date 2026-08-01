import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/site-config";

type Sermon = {
  _id: string;
  title: string;
  speaker?: string;
  date?: string;
  youtubeUrl: string;
  thumbnail?: { asset: { _ref: string } } | null;
};

const fallbackSermons: Sermon[] = [
  {
    _id: "1",
    title: "Ministration: Understanding Spiritual Gifts",
    speaker: "Pastor Victor Eforuoku",
    youtubeUrl: siteConfig.social.youtube,
    thumbnail: null,
  },
  {
    _id: "2",
    title: "Sunday Holy Communion Service",
    speaker: "Pastor Victor Eforuoku",
    youtubeUrl: siteConfig.social.youtube,
    thumbnail: null,
  },
  {
    _id: "3",
    title: "Sunday Service: Walking Towards Your Destiny",
    speaker: "Pastor Victor Eforuoku",
    youtubeUrl: siteConfig.social.youtube,
    thumbnail: null,
  },
];

const fallbackImages = [
  "/images/gallery/pastor/img-8425-20251005.jpg",
  "/images/gallery/pastor/img-8482-20251005.jpg",
  "/images/gallery/pastor/img-8505-20251005.jpg",
];

const query = `*[_type == "sermon"] | order(date desc)[0...3]{
  _id, title, speaker, date, youtubeUrl, thumbnail
}`;

export async function LatestSermons() {
  const sermons = await sanityFetch<Sermon[]>(query, {}, fallbackSermons);

  return (
    <section className="bg-[#0c0906] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              Recent Message
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Latest Sermons
            </h2>
          </div>
          <Link
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-gold-400 hover:text-gold-300"
          >
            View all on YouTube
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {sermons.map((sermon, i) => (
            <Link
              key={sermon._id}
              href={sermon.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-2xl border border-border/60 bg-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={
                    sermon.thumbnail
                      ? urlForImage(sermon.thumbnail as never).width(600).height(340).url()
                      : fallbackImages[i % fallbackImages.length]
                  }
                  alt={sermon.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <PlayCircle className="h-14 w-14 text-white" />
                </div>
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-bold leading-snug text-foreground">
                  {sermon.title}
                </p>
                {sermon.speaker && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {sermon.speaker}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
