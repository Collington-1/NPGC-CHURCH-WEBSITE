export type ProgramFallback = {
  _id: string;
  name: string;
  slug: { current: string };
  schedule: string;
  description: string;
  image: string;
};

// TODO: replace schedule/description placeholders with confirmed details,
// then manage these permanently from Sanity Studio (/studio -> Program).
export const fallbackPrograms: ProgramFallback[] = [
  {
    _id: "sunday-service",
    name: "Sunday Service",
    slug: { current: "sunday-service" },
    schedule: "Sundays — confirm time",
    description: "Our main gathering of worship, the Word, and community.",
    image: "/images/gallery/worship/13-7img-4315.jpg",
  },
  {
    _id: "holy-communion",
    name: "Holy Communion",
    slug: { current: "holy-communion" },
    schedule: "Monthly — confirm date",
    description: "Remembering the Lord's sacrifice together as one body.",
    image: "/images/gallery/congregation/p1098271-20251012.jpg",
  },
  {
    _id: "bible-study",
    name: "Bible Study",
    slug: { current: "bible-study" },
    schedule: "Weekly — confirm day/time",
    description: "Digging deeper into the Word for practical, daily living.",
    image: "/images/gallery/congregation/img-8740-20251012.jpg",
  },
  {
    _id: "prayer-meetings",
    name: "Prayer Meetings",
    slug: { current: "prayer-meetings" },
    schedule: "Weekly — confirm day/time",
    description: "Corporate prayer that positions us for breakthrough.",
    image: "/images/gallery/prayer/2109img-7350.jpg",
  },
  {
    _id: "night-vigil",
    name: "Night Vigil",
    slug: { current: "night-vigil" },
    schedule: "Monthly — confirm date",
    description: "Watching and praying through the night in God's presence.",
    image: "/images/gallery/worship/13-7img-5464.jpg",
  },
  {
    _id: "conferences",
    name: "Conferences",
    slug: { current: "conferences" },
    schedule: "Seasonal — confirm dates",
    description: "Impact-driven gatherings for growth, healing, and purpose.",
    image: "/images/gallery/special-events/img-20250417-wa0044.jpg",
  },
  {
    _id: "retreats",
    name: "Retreats",
    slug: { current: "retreats" },
    schedule: "Seasonal — confirm dates",
    description: "Stepping away to reconnect with God and one another.",
    image: "/images/gallery/special-events/img-20250417-wa0056.jpg",
  },
  {
    _id: "special-programs",
    name: "Special Programs",
    slug: { current: "special-programs" },
    schedule: "Announced periodically",
    description: "One-off events designed for a specific move of God.",
    image: "/images/gallery/special-events/img-20250417-wa0057.jpg",
  },
];
