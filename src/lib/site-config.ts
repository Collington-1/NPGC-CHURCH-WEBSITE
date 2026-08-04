export const siteConfig = {
  name: "The New Paradigm Global Church",
  shortName: "NPGC",
  tagline: "Your place for a shift.",
  url: "https://thenpgc.org",
  address: {
    line1: "Plot 336A Peter Odili Road, Trans-Amadi",
    line2: "God'swill Towers, beside Livichun Supermarket",
    city: "Port Harcourt, Rivers State, Nigeria",
  },
  phone: "+234 803 626 6003",
  whatsapp: "+2348036266003",
  email: "thenewparadigmglobalchurch@gmail.com",
  mapsUrl: "https://maps.google.com/?q=Plot+336A+Peter+Odili+Road+Trans-Amadi+Port+Harcourt",
  social: {
    facebook: "https://www.facebook.com/thenpgc?mibextid=ZbWKwL",
    youtube: "https://youtube.com/@thenpgc?si=Uq5DjHpBNo7UbKTU",
    instagram: "https://www.instagram.com/the_npgc?igsh=MXIwNmt2ZmxheDVsdQ==",
  },
  // YouTube's own shortcut that redirects to whatever is currently live on
  // the channel, or the channel's live tab if nothing is live right now.
  youtubeLive: "https://www.youtube.com/@thenpgc/live",
  serviceTimes: [
    { label: "Sunday Service", time: "9:00 AM – 12:00 PM" },
    { label: "Tuesday Service", time: "5:30 PM – 8:00 PM" },
  ],
} as const;

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  {
    label: "Activities",
    href: "/activities",
    children: [
      {
        label: "Arkville",
        href: "/activities/arkville",
        description: "Children's Bible School",
      },
      {
        label: "Discipleship",
        href: "/activities/discipleship",
        description: "Growing into spiritual maturity",
      },
      {
        label: "Dinner Night",
        href: "/activities/dinner-night",
        description: "An evening of fellowship together",
      },
    ],
  },
  { label: "Gallery", href: "/gallery" },
];
