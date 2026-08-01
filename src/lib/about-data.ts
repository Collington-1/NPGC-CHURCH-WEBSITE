// TODO: everything here is placeholder copy. Replace via Sanity Studio
// (/studio -> "About Page Content" and "Leadership") once the client confirms
// the real story, vision/mission wording, values, statement of faith,
// timeline, and leadership bios.

export type AboutContent = {
  story: string;
  vision: string;
  mission: string;
  coreValues: { title: string; description: string }[];
  statementOfFaith: string;
  timeline: { year: string; event: string }[];
};

export const fallbackAboutContent: AboutContent = {
  story:
    "[Placeholder] The New Paradigm Global Church began as a gathering of believers committed to raising world-changers in Port Harcourt. Replace this paragraph with the confirmed church story.",
  vision:
    "[Placeholder] To raise a generation of world-changers who carry God's presence and power into every sphere of society.",
  mission:
    "[Placeholder] To disciple believers into spiritual maturity through the Word, prayer, and authentic community.",
  coreValues: [
    { title: "The Word", description: "[Placeholder] Sound, uncompromised biblical teaching." },
    { title: "Prayer", description: "[Placeholder] A lifestyle of prayer and dependence on God." },
    { title: "Excellence", description: "[Placeholder] Doing all things as unto the Lord." },
    { title: "Family", description: "[Placeholder] Authentic community and discipleship." },
    { title: "Impact", description: "[Placeholder] Raising world-changers for every sphere of life." },
  ],
  statementOfFaith:
    "[Placeholder] Add the church's full statement of faith here — Scripture, the Trinity, salvation, the Church, and last things.",
  timeline: [
    { year: "20XX", event: "[Placeholder] Church founded by Pastor Victor Eforuoku." },
    { year: "20XX", event: "[Placeholder] Moved into the current Trans-Amadi location." },
    { year: "20XX", event: "[Placeholder] Launched Arkville and Discipleship programs." },
  ],
};

export type StaffMemberFallback = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  isLeadPastor?: boolean;
};

export const fallbackStaff: StaffMemberFallback[] = [
  {
    _id: "pastor-victor",
    name: "Pastor Victor Eforuoku",
    role: "Lead Pastor",
    bio: "Pastor Victor Eforuoku is the Founder and Lead Pastor of The New Paradigm Global Church (NPGC), a prophetic teaching ministry dedicated to raising influential people for global impact. He oversees a vibrant community of believers focused on spiritual growth, prayer, and the transformation of lives by the Word of God.",
    photo: "/images/gallery/pastor/img-6181.jpg",
    isLeadPastor: true,
  },
];
