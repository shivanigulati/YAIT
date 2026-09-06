export type SubService = {
  name: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  shortLabel: string;
  tagline: string;
  icon: "MonitorPlay" | "Speaker" | "ClipboardList" | "Bot" | "BarChart3";
  subServices: SubService[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "online-operations",
    title: "Online Operations",
    shortLabel: "ONLINE OPERATIONS",
    tagline: "Technical support offered with care, for whatever your online session needs.",
    icon: "MonitorPlay",
    subServices: [
      {
        name: "Hosting",
        description:
          "We're happy to be the technical backbone of your session from start to finish — welcoming attendees in, checking that every speaker's voice is coming through clearly, managing participant control, and taking care of everything behind the scenes so it all moves smoothly.",
      },
      {
        name: "Presenting",
        description:
          "If you'd like an extra hand behind the screen, we're glad to take care of the screen-sharing and transitions, making sure your presentations and videos land the way they're meant to.",
      },
      {
        name: "Chat Moderation",
        description:
          "We can sit with the chat during your session, responding promptly and looking after participant queries as they come — so everyone feels heard and supported, while you focus on the program.",
      },
      {
        name: "Anchoring",
        description:
          "If you'd like someone to be the face and voice of the session, we're happy to guide the audience along, keep things flowing gently between segments, and keep the energy engaging from start to end.",
      },
      {
        name: "Photography",
        description:
          "We can capture the moments that matter most — taking screenshots at the right time during the online session, so you'll have something to look back on.",
      },
      {
        name: "PPT Designing",
        description:
          "If your session needs slides, we'd be glad to help — using smart tools to design polished presentations that help make the online sessions more engaging.",
      },
    ],
  },
  {
    id: "offline-tech-setup",
    title: "Offline Areas",
    shortLabel: "OFFLINE TECH SETUP",
    tagline: "Support for in-person events and gatherings.",
    icon: "Speaker",
    subServices: [
      {
        name: "Tech/Dual Monitor Setup",
        description:
          "We can help set up and test microphones beforehand, so the sound comes through clearly for everyone in the room.",
      },
      // {
      //   name: "Projector/Display",
      //   description:
      //     "We're happy to help with setting up the projector or screen, so your slides and visuals show up the way you'd like.",
      // },
      {
        name: "Anchoring (In Person)",
        description:
          "If your event needs someone to guide the program and introduce speakers in the room, we're glad to help with that too.",
      },
    ],
  },
  {
    id: "technical-guidance-planning",
    title: "Technical Guidance & Planning",
    shortLabel: "TECHNICAL GUIDANCE & PLANNING",
    tagline: "Thinking through the technical side, together.",
    icon: "ClipboardList",
    subServices: [
      {
        name: "Session Planning",
        description:
          "If you have an event coming up, we're happy to sit with you and think through the technical side together, so you feel prepared.",
      },
      {
        name: "Technical Guidance",
        description:
          "Facing a technical question or challenge? We're here to talk it through with you, in whatever way is most helpful.",
      },
      {
        name: "Workflow Automation Strategy",
        description:
          "If your department's process feels harder than it needs to be, we'd be glad to think through a simpler way forward with you — even just as a conversation, no automation required.",
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    shortLabel: "AI & AUTOMATION",
    tagline: "Making repetitive work disappear.",
    icon: "Bot",
    subServices: [
      {
        name: "Automation",
        description:
          "If there's something your department does the same way every time — like wishing people on their birthdays, or adding a large group to WhatsApp — we'd be glad to help make it happen automatically, so no one has to do it by hand.",
      },
      {
        name: "Workflow Automation",
        description:
          "If your department juggles several tools or steps for one task, we can help connect them so things flow through on their own, without needing to be pushed along manually.",
      },
      {
        name: "Chatbots & Custom GPTs",
        description:
          "Chatbots, Google Apps Script, Custom GPTs, Claude Projects, and Forms Automation are also areas we can help with — happy to talk through what might suit your department's needs.",
      },
    ],
  },
  {
    id: "data-management-visualisation",
    title: "Data Management & Visualisation",
    shortLabel: "DATA & VISUALISATION",
    tagline: "Helping departments understand and organize their own data.",
    icon: "BarChart3",
    subServices: [
      {
        name: "Google Sheets",
        description:
          "We can help set up and organize spreadsheets so your data stays clean and easy to work with.",
      },
      {
        name: "Attendance",
        description:
          "We can set up automatic attendance tracking, so it doesn't need to be done by hand.",
      },
      {
        name: "Dashboards",
        description:
          "If your department needs a simple way to see your numbers at a glance, we're happy to build one suited to what you need.",
      },
      {
        name: "Reports",
        description: "We can put together clear, ready-to-review reports from your data.",
      },
      {
        name: "Analytics",
        description:
          "We're happy to help make sense of what your numbers are showing, so decisions feel easier.",
      },
    ],
  },
];

export const galleryMoments = [
  {
    title: "INNERGY PAN India",
    caption: "Cross-department seva",
  },
  {
    title: "ELP Sessions",
    caption: "Decks & operations",
  },
  {
    title: "Automated Presentation",
    caption: "First fully automated session",
  },
  {
    title: "YA Inreach",
    caption: "Book reading sessions",
  },
  {
    title: "GDLP Support",
    caption: "Hosting & presenting",
  },
  {
    title: "Thanksgiving Day",
    caption: "Online celebration support",
  },
];

export const stats = [
  { value: 50, suffix: "+", label: "Volunteers" },
  { value: 300, suffix: "+", label: "Sessions Supported" },
  { value: 15, suffix: "+", label: "Departments Served" },
  { value: 1000, suffix: "+", label: "Volunteer Hours" },
  { value: 25, suffix: "+", label: "AI Automations" },
  { value: 12, suffix: "+", label: "Cities Covered" },
];

export const whyPoints = [
  "Dedicated volunteers",
  "Technical expertise",
  "Mission-driven service",
  "Flexible support",
  "Community-first approach",
];

export const coreValues = [
  {
    front: "Connecting Hearts Across the Globe",
    back: "We create meaningful digital experiences that foster unity, meditation, learning, and service — bringing together seekers from diverse backgrounds as one global family.",
  },
  {
    front: "Empower Volunteers to Lead with Purpose",
    back: "We build a collaborative platform where volunteers can serve selflessly, innovate creatively, and grow spiritually while using their technical skills for a higher purpose.",
  },
  {
    front: "Evolve to Stay Future Ready",
    back: "Guided by the spirit of Kaizen, we stay curious — continuously learning and adapting to new technology, treating every small improvement as a step toward deeper impact and meaningful innovation.",
  },
  {
    front: "Serving Beyond Boundaries",
    back: "Technology becomes sacred when it bridges distance and difference across a global sangat. We build tools that bring people closer — not just closer to a screen.",
  },
];

export type TimelinePhase = {
  phase: string;
  dateRange: string;
  title: string;
  subheading: string;
  bullets: string[];
  icon: "Sprout" | "Rocket" | "BookOpen" | "Star" | "Handshake";
};

export const timeline: TimelinePhase[] = [
  {
    phase: "PHASE 1",
    dateRange: "June – August 2025",
    title: "The Beginning",
    subheading: "Laying the Foundation",
    icon: "Sprout",
    bullets: [
      "The initial volunteer team took shape around Master's Day & Guru Purnima.",
      "Supported the early online events by handling technical and operational responsibilities.",
      "Built the first workflows, defined responsibilities, and identified where technology could simplify seva.",
      "August 2025 — YA IT received its official approval and was formally established.",
    ],
  },
  {
    phase: "PHASE 2",
    dateRange: "September – December 2025",
    title: "Building the Foundation",
    subheading: "Serving Through Technology",
    icon: "Rocket",
    bullets: [
      "Provided technical and operational support for numerous online programs.",
      "Thanksgiving Day celebrations.",
      "GDLP sessions.",
      "Various Young Adult online events.",
    ],
  },
  {
    phase: "PHASE 3",
    dateRange: "December 2025 – February 2026",
    title: "Empowering Volunteers",
    subheading: "Learning Before Leading",
    icon: "BookOpen",
    bullets: [
      "Planned and launched the Technical Growth & Proficiency (TGP) Series.",
      "First session conducted on 4 January 2026.",
      "Training on AI-powered productivity, effective prompting, Diagrams.net and Notion.",
      "Advanced hosting & presenting, AI for chat moderation, and online photography.",
      "AI-powered PPT creation, tech hacks, productivity extensions, dual monitor setup, cyber hygiene.",
    ],
  },
  {
    phase: "PHASE 4",
    dateRange: "March – May 2026",
    title: "A Turning Point",
    subheading: "Recognition & Expansion",
    icon: "Star",
    bullets: [
      "A comprehensive report on the TGP Series and YA IT's journey was prepared.",
      "2 May 2026 — the report was presented to His Holiness Sant Rajinder Singh Ji Maharaj.",
      "YA Inreach book reading sessions were supported from February to April.",
    ],
  },
  {
    phase: "PHASE 5",
    dateRange: "June 2026 onwards",
    title: "Beyond Young Adults",
    subheading: "Expanding Our Impact",
    icon: "Handshake",
    bullets: [
      "The team expanded rapidly from over 50 volunteers, welcoming many new members.",
      "First collaboration with another department — technical support for the Online PAN India INNERGY sessions.",
      "Began supporting daily national online sessions, Monday through Friday.",
      "Extended GDLP support to hosting, presenting, anchoring, chat moderation, and photography.",
      "Designed presentation decks and supported the English Learning Program (ELP) sessions.",
      "11 July 2026 — demonstrated the Mission's first fully automated online presentation system: waking the laptop, joining Zoom, presenting the session, ending the meeting, and shutting down — without human intervention.",
    ],
  },
];

export const volunteerSkills = [
  "Online Operations",
  "Design",
  "Photography & Videography",
  "AI & Automation",
  "Data & Google Sheets",
  "Development",
  "Event Coordination",
  "Content Writing",
];

export const availabilityOptions = [
  "Weekdays",
  "Weekends",
  "Evenings only",
  "Flexible",
  "During events only",
];
