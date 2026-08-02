// Real copy, written for NPGC. Two things still need the church's input —
// see the TODOs below — everything else here is final content, not filler.

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
    "The New Paradigm Global Church (NPGC) was raised as a prophetic, teaching ministry with one conviction at its core: that ordinary people, filled with the Word and the Spirit, become world-changers. Under the leadership of Pastor Victor Eforuoku, what began as a gathering of believers in Trans-Amadi, Port Harcourt has grown into a family devoted to sound teaching, unashamed worship, and a praying community — a house where people come as they are and leave carrying a fresh sense of who God made them to be.\n\nWe describe ourselves simply as your place for a shift — because that is what we've watched happen again and again: people walk in stuck, and walk out shifted in their thinking, their identity, and their expectation of God. From Sunday worship to our Arkville children's ministry and our Discipleship pathway for growing believers, every part of NPGC exists to move people from where they are into who God says they are.",
  vision:
    "To raise a generation of world-changers — men and women so filled with God's Word and presence that they carry influence into every sphere of society: the home, the marketplace, government, and beyond.",
  mission:
    "To build a Spirit-filled community where people encounter God through the Word and prayer, grow into spiritual maturity through discipleship, and are sent out to shine as lights wherever they are planted.",
  coreValues: [
    { title: "The Word", description: "We hold Scripture as our final authority — every message, every value, and every decision is shaped by sound, uncompromised biblical teaching." },
    { title: "Prayer", description: "We are a praying church before we are anything else. Prayer is how we posture ourselves for the breakthroughs we believe God for." },
    { title: "Excellence", description: "From how we prepare a service to how we treat a first-time visitor, we do everything as unto the Lord — with care, order, and heart." },
    { title: "Family", description: "NPGC is built to feel like family, not a crowd. Authentic community, honest discipleship, and real relationships are how we grow together." },
    { title: "Impact", description: "We measure success by transformation — fully mature disciples and vibrant servants of the gospel, shining as lights in every sphere of life." },
  ],
  // Placed here at the client's explicit direction: NPGC's 2026 "Shining
  // Light" confession, used in place of a traditional doctrinal statement.
  statementOfFaith:
    "Christ is my Light and my Salvation.\nI blaze through darkness, systems, and limitations.\nI'm unstoppable!\nI'm well positioned; visible for the world to see.\nI cannot be ignored, overlooked, nor sidelined.\nEverywhere I enter, I shine, I glow, I radiate.\n2026, let there be LIGHT.\nHallelujah.",
  // TODO: only the founding year is confirmed so far — the years in between
  // are still open. Add real milestone years via Sanity Studio (/studio ->
  // About Page Content -> timeline) whenever the client shares them.
  timeline: [
    { year: "2020", event: "The New Paradigm Global Church was founded in Trans-Amadi, Port Harcourt, as a company of believers gathered around the Word, prayer, and the pursuit of God's presence, under the leadership of Pastor Victor Eforuoku." },
    { year: "Raising Disciples", event: "As the church grew, Arkville and Discipleship were established to walk believers — young and old — from their first encounter with God into lasting spiritual maturity." },
    { year: "2026", event: "NPGC steps into a new season with the declaration \"2026, Let There Be Light\" — believing God for greater visibility, breakthrough, and shift in every sphere of life." },
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
    photo: "/images/gallery/pastor/img-6415-scaled.jpg",
    isLeadPastor: true,
  },
  {
    _id: "pastor-nonye",
    name: "Pastor Nonye Eforuoku",
    role: "Pastor",
    bio: "Pastor Nonye Eforuoku serves alongside Pastor Victor Eforuoku in shepherding The New Paradigm Global Church, ministering the Word and providing pastoral care and support across the church community.",
    photo: "/images/gallery/pastors-wife/13-7img-5961-scaled.jpg",
  },
];
