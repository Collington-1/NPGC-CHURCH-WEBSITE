import { sanityFetch } from "@/sanity/lib/fetch";
import { extractYoutubeId } from "@/lib/youtube";
import { siteConfig } from "@/lib/site-config";

type YoutubeShort = { _id: string; url: string; title?: string };

const query = `*[_type == "youtubeShort"] | order(order asc){ _id, url, title }`;

// No real Shorts URLs have been provided yet, so this intentionally starts
// empty rather than embedding placeholder/unrelated videos. Add real ones
// via Sanity Studio (/studio -> Media Library -> YouTube Short) and this
// section fills in automatically, up to 18 (3 columns x 6 rows).
const fallbackShorts: YoutubeShort[] = [];

export async function ShortsGrid() {
  const shorts = await sanityFetch<YoutubeShort[]>(query, {}, fallbackShorts);
  if (shorts.length === 0) return null;

  const visible = shorts.slice(0, 18);

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
              On YouTube
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
              Shorts
            </h2>
          </div>
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-semibold text-gold-500 hover:text-gold-400"
          >
            More on YouTube →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          {visible.map((short) => {
            const id = extractYoutubeId(short.url);
            if (!id) return null;
            return (
              <div
                key={short._id}
                className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-card"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={short.title ?? "NPGC Short"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
