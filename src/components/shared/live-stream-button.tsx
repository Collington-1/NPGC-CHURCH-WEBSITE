"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";

import { getActiveScheduledWindow } from "@/lib/live-schedule";
import { siteConfig } from "@/lib/site-config";
import { client } from "@/sanity/lib/client";

const overrideQuery = `*[_type == "liveStatus"][0]{ isLiveOverride, label, youtubeUrl }`;

type Override = { isLiveOverride?: boolean; label?: string; youtubeUrl?: string } | null;

export function LiveStreamButton() {
  const [scheduleLabel, setScheduleLabel] = useState<string | null>(null);
  const [override, setOverride] = useState<Override>(null);

  useEffect(() => {
    const check = () => setScheduleLabel(getActiveScheduledWindow()?.label ?? null);
    check();
    const id = setInterval(check, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const sanity = client;
    if (!sanity) return;
    let cancelled = false;
    const fetchOverride = () => {
      sanity
        .fetch<Override>(overrideQuery)
        .then((data) => !cancelled && setOverride(data))
        .catch(() => {});
    };
    fetchOverride();
    const id = setInterval(fetchOverride, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const isOverrideLive = Boolean(override?.isLiveOverride);
  const isLive = Boolean(scheduleLabel) || isOverrideLive;
  if (!isLive) return null;

  const label = isOverrideLive && override?.label ? override.label : scheduleLabel;
  const href = (isOverrideLive && override?.youtubeUrl) || siteConfig.youtubeLive;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/40 transition-transform hover:scale-105"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      <Radio className="h-4 w-4" />
      {label ? `Live: ${label}` : "Follow Livestream"}
    </a>
  );
}
