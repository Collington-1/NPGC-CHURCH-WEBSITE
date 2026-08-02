import type { Metadata } from "next";
import Image from "next/image";
import { Download, FileText, PlayCircle } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { PageHero } from "@/components/layout/page-hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extractYoutubeId } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Watch video ministrations, listen to audio messages, and download Pastor Victor Eforuoku's books and church documents.",
  alternates: { canonical: "/resources" },
};

type VideoItem = {
  _id: string;
  title: string;
  speaker?: string;
  description?: string;
  source: "youtube" | "file";
  youtubeUrl?: string;
  fileUrl?: string;
  thumbnail?: string;
};
type AudioItem = { _id: string; title: string; speaker?: string; fileUrl: string; coverUrl?: string };
type BookItem = { _id: string; title: string; author?: string; description?: string; isFree?: boolean; fileUrl: string; coverUrl?: string };
type DocItem = { _id: string; title: string; category?: string; description?: string; fileUrl: string };

const videosQuery = `*[_type == "ministrationVideo"] | order(date desc){ _id, title, speaker, description, source, youtubeUrl, "fileUrl": file.asset->url, "thumbnail": thumbnail.asset->url }`;
const audioQuery = `*[_type == "audioMinistration"] | order(date desc){ _id, title, speaker, "fileUrl": file.asset->url, "coverUrl": coverImage.asset->url }`;
const booksQuery = `*[_type == "pastorBook"]{ _id, title, author, description, isFree, "fileUrl": file.asset->url, "coverUrl": coverImage.asset->url }`;
const docsQuery = `*[_type == "libraryDocument"]{ _id, title, category, description, "fileUrl": file.asset->url }`;

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 px-8 py-16 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

export default async function ResourcesPage() {
  const [videos, audios, books, docs] = await Promise.all([
    sanityFetch<VideoItem[]>(videosQuery, {}, []),
    sanityFetch<AudioItem[]>(audioQuery, {}, []),
    sanityFetch<BookItem[]>(booksQuery, {}, []),
    sanityFetch<DocItem[]>(docsQuery, {}, []),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Grow"
        title="Resources"
        description="Video and audio ministrations, books, and documents to help you grow between services."
        image="/images/gallery/ministration/img-8815-20251012-scaled.jpg"
      />

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Tabs defaultValue="videos">
            <TabsList className="mx-auto flex h-auto w-fit flex-wrap gap-1 bg-card p-1">
              <TabsTrigger value="videos" className="px-4 py-2">Videos</TabsTrigger>
              <TabsTrigger value="audio" className="px-4 py-2">Audio</TabsTrigger>
              <TabsTrigger value="books" className="px-4 py-2">Books</TabsTrigger>
              <TabsTrigger value="documents" className="px-4 py-2">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="mt-10">
              {videos.length === 0 ? (
                <EmptyState text="No videos uploaded yet — check back soon." />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {videos.map((v) => {
                    const ytId = v.source === "youtube" && v.youtubeUrl ? extractYoutubeId(v.youtubeUrl) : null;
                    return (
                      <div key={v._id} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                        <div className="relative aspect-video bg-black">
                          {ytId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}`}
                              title={v.title}
                              loading="lazy"
                              allowFullScreen
                              className="absolute inset-0 h-full w-full border-0"
                            />
                          ) : v.fileUrl ? (
                            <video controls className="absolute inset-0 h-full w-full object-cover" src={v.fileUrl} />
                          ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                              <PlayCircle className="h-10 w-10" />
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <p className="font-display text-lg font-bold text-foreground">{v.title}</p>
                          {v.speaker && <p className="mt-1 text-xs uppercase tracking-wide text-gold-400">{v.speaker}</p>}
                          {v.description && <p className="mt-3 text-sm text-muted-foreground">{v.description}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="audio" className="mt-10">
              {audios.length === 0 ? (
                <EmptyState text="No audio messages uploaded yet — check back soon." />
              ) : (
                <div className="grid gap-4">
                  {audios.map((a) => (
                    <div key={a._id} className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 sm:flex-row sm:items-center">
                      {a.coverUrl && (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image src={a.coverUrl} alt={a.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-display text-base font-bold text-foreground">{a.title}</p>
                        {a.speaker && <p className="text-xs uppercase tracking-wide text-gold-400">{a.speaker}</p>}
                      </div>
                      <audio controls src={a.fileUrl} className="w-full sm:w-72" />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="books" className="mt-10">
              {books.length === 0 ? (
                <EmptyState text="No books uploaded yet — check back soon." />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {books.map((b) => (
                    <div key={b._id} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                      <div className="relative aspect-[3/4] bg-black/40">
                        {b.coverUrl ? (
                          <Image src={b.coverUrl} alt={b.title} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted-foreground">
                            <FileText className="h-10 w-10" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="font-display text-lg font-bold text-foreground">{b.title}</p>
                        {b.author && <p className="mt-1 text-xs uppercase tracking-wide text-gold-400">{b.author}</p>}
                        {b.description && <p className="mt-3 text-sm text-muted-foreground">{b.description}</p>}
                        <a
                          href={b.fileUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400"
                        >
                          <Download className="h-4 w-4" /> {b.isFree === false ? "Download" : "Free Download"}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents" className="mt-10">
              {docs.length === 0 ? (
                <EmptyState text="No documents uploaded yet — check back soon." />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {docs.map((d) => (
                    <a
                      key={d._id}
                      href={d.fileUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-gold-500/60"
                    >
                      <FileText className="h-8 w-8 shrink-0 text-gold-500" />
                      <div>
                        <p className="font-semibold text-foreground">{d.title}</p>
                        {d.category && <p className="text-xs uppercase tracking-wide text-muted-foreground">{d.category}</p>}
                      </div>
                      <Download className="ml-auto h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
