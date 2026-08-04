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
    { title: "Love", description: "We lead with genuine love for God and for one another — the truest mark of a disciple, and the foundation everything else at NPGC is built on." },
    { title: "Character", description: "We pursue integrity and Christlike character in private and in public, believing who we become matters as much as what we accomplish." },
    { title: "Excellence", description: "From how we prepare a service to how we treat a first-time visitor, we do everything as unto the Lord — with care, order, and heart." },
    { title: "Anointing", description: "We contend for the tangible presence and power of the Holy Spirit, believing His anointing is what makes ministry effective and lives truly transformed." },
  ],
  // Placed here at the client's explicit direction: NPGC's 2026 "Shining
  // Light" confession, used in place of a traditional doctrinal statement.
  statementOfFaith:
    "Christ is my Light and my Salvation.\nI blaze through darkness, systems, and limitations.\nI'm unstoppable!\nI'm well positioned; visible for the world to see.\nI cannot be ignored, overlooked, nor sidelined.\nEverywhere I enter, I shine, I glow, I radiate.\n2026, let there be LIGHT.\nHallelujah.",
  // TODO: only the founding year is confirmed so far — the years in between
  // are still open. Add real milestone years via Sanity Studio ("About Page
  // Content" -> timeline) whenever the client shares them.
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
    bio: "Victor Eforuoku is the visionary Lead Pastor of The New Paradigm Global Church, a dynamic and growing ministry with a powerful presence in Port Harcourt, Rivers State, Nigeria. He is a distinguished man of God, a sought-after teacher, and a spiritual father to many, whose life and ministry continue to leave an indelible mark on this generation.\n\nThe major driving force in his life was born from a profound and transformative encounter with the Holy Spirit many years ago. In that moment, the foundational truth of the Christian faith was etched into his spirit: that the basis for a truly successful and impactful Christian life is absolute and total reliance on the Spirit of God. This non-negotiable truth is the bedrock upon which he has built everything he does. It fuels his unwavering faith, knowing that God can be trusted beyond all measures and that He has never, and will never, fail.\n\nPastor Victor is more than a preacher; he is a trailblazer and a paradigm-shifter, called to awaken the Church to a deeper dimension of spiritual reality. His life is a testament to the faithfulness of God, and his ministry is marked by a rare depth of wisdom, clarity of insight, and a tangible presence of the Holy Spirit. With the heart of a true shepherd and the mantle of a prophet to this age, he continues to guide countless lives into their God-given purpose, proving that when a man fully depends on the Spirit, nothing is impossible.",
    photo: "/images/gallery/pastor/img-4663-20260118-scaled.jpg",
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
