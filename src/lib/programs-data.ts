export type ProgramFallback = {
  _id: string;
  name: string;
  slug: { current: string };
  schedule: string;
  description: string;
  image: string;
};

// Manage these permanently from Sanity Studio (/studio -> Program) once the
// client wants to add or adjust a program.
export const fallbackPrograms: ProgramFallback[] = [
  {
    _id: "sunday-service",
    name: "Sunday Service",
    slug: { current: "sunday-service" },
    schedule: "Sundays, 9:00 AM – 12:00 PM",
    description: "Our main gathering of worship, the Word, and community.",
    image: "/images/gallery/worship/13-7img-4315.jpg",
  },
  {
    _id: "holy-communion",
    name: "Holy Communion",
    slug: { current: "holy-communion" },
    schedule: "Held periodically during Sunday Service",
    description: "Remembering the Lord's sacrifice together as one body.",
    image: "/images/gallery/welcome/p1098271-20251012-scaled.jpg",
  },
  {
    _id: "bible-study",
    name: "Bible Study",
    slug: { current: "bible-study" },
    schedule: "Tuesdays, 5:30 PM – 8:00 PM",
    description: "Digging deeper into the Word for practical, daily living.",
    image: "/images/gallery/ministration/img-8815-20251012-scaled.jpg",
  },
  {
    _id: "prayer-meetings",
    name: "Prayer Meetings",
    slug: { current: "prayer-meetings" },
    schedule: "Weekly",
    description: "Corporate prayer that positions us for breakthrough.",
    image: "/images/gallery/prayer/img-6290-scaled.jpg",
  },
  {
    _id: "night-vigil",
    name: "Night Vigil",
    slug: { current: "night-vigil" },
    schedule: "Announced monthly",
    description: "Watching and praying through the night in God's presence.",
    image: "/images/gallery/prayer/img-9853-20260712.jpg",
  },
  {
    _id: "conferences",
    name: "Conferences",
    slug: { current: "conferences" },
    schedule: "Seasonal",
    description: "Impact-driven gatherings for growth, healing, and purpose.",
    image: "/images/gallery/special-events/img-20250417-wa0044.jpg",
  },
  {
    _id: "retreats",
    name: "Retreats",
    slug: { current: "retreats" },
    schedule: "Seasonal",
    description: "Stepping away to reconnect with God and one another.",
    image: "/images/gallery/special-events/img-20250417-wa0056.jpg",
  },
  {
    _id: "special-programs",
    name: "Special Programs",
    slug: { current: "special-programs" },
    schedule: "Announced periodically",
    description: "One-off events designed for a specific move of God.",
    image: "/images/gallery/programs/489041454-18061555856044343-2359327884408875482-n.jpg",
  },
];
