// Extracts the video ID from a YouTube Shorts/watch/youtu.be URL so it can be
// dropped into an embed src. Returns null for anything unrecognized rather
// than guessing.
export function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const shortsMatch = u.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{6,})/);
    if (shortsMatch) return shortsMatch[1];
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "") || null;
    }
    const v = u.searchParams.get("v");
    if (v) return v;
    return null;
  } catch {
    return null;
  }
}
