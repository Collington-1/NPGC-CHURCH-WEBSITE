export const siteConfig = {
  name: "The New Paradigm Global Church",
  shortName: "NPGC",
  tagline: "Your place for a shift.",
  url: "https://npgc.org",
  // TODO: confirm exact phone number, email inbox, and social handles with the client.
  address: {
    line1: "Plot 336A Peter Odili Road, Trans-Amadi",
    line2: "God'swill Towers, beside Livichun Supermarket",
    city: "Port Harcourt, Rivers State, Nigeria",
  },
  phone: "+234 000 000 0000",
  email: "info@npgc.org",
  mapsUrl: "https://maps.google.com/?q=Plot+336A+Peter+Odili+Road+Trans-Amadi+Port+Harcourt",
  social: {
    facebook: "https://facebook.com/npgchurch",
    youtube: "https://youtube.com/@npgchurch",
    instagram: "https://instagram.com/npgchurch",
  },
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
    ],
  },
  { label: "Gallery", href: "/gallery" },
];
