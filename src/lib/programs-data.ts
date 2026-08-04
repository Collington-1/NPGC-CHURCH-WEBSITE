export type ProgramFallback = {
  _id: string;
  name: string;
  slug: { current: string };
  schedule: string;
  description: string;
  image: string;
};

// Manage these permanently from Sanity Studio (Program) once the client
// wants to add or adjust a program. Per the client: NPGC's programs are
// specifically Beyond Borders and Kingdom Business Summit (day-to-day
// recurring gatherings like Sunday Service / Bible Study live in
// src/lib/site-config.ts's serviceTimes instead).
export const fallbackPrograms: ProgramFallback[] = [
  {
    _id: "beyond-borders",
    name: "Beyond Borders",
    slug: { current: "beyond-borders" },
    schedule: "Annual",
    description:
      "A powerful gathering focused on breaking limitations and stepping into God's expansive plans — reaching beyond every border holding you back.",
    image: "/images/gallery/programs/beyond-borders.jpg",
  },
  {
    _id: "kingdom-business-summit",
    name: "Kingdom Business Summit",
    slug: { current: "kingdom-business-summit" },
    schedule: "Annual",
    description:
      "Equipping business owners and marketplace leaders to run their businesses with Kingdom principles, purpose, and impact.",
    image: "/images/gallery/programs/kingdom-business-summit.jpg",
  },
];
