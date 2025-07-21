// Chapter metadata for the Maltese Constitution
export interface Chapter {
  chapter: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  heroImage: string;
  articleCount: number;
}

export const CHAPTERS: Chapter[] = [
  {
    chapter: "1",
    title: "The Republic of Malta",
    description:
      "Malta's core identity as a peaceful, independent republic built on democratic values and Catholic heritage",
    tags: [
      "democracy",
      "republic",
      "sovereignty",
      "neutrality",
      "religion",
      "symbols",
    ],
    icon: "🏛️",
    heroImage: "/images/malta-island-constitution.png",
    articleCount: 6,
  },
  {
    chapter: "2",
    title: "Declaration of Principles",
    description:
      "Malta's social commitments and guiding principles that shape policies and future laws",
    tags: [
      "principles",
      "social",
      "work",
      "employment",
      "equality",
      "sustainability",
    ],
    icon: "📜",
    heroImage: "/images/maltese-flag.png",
    articleCount: 15,
  },
  {
    chapter: "3",
    title: "Citizenship",
    description:
      "How Maltese citizenship is regulated and treatment of Commonwealth and Irish citizens",
    tags: [
      "citizenship",
      "nationality",
      "commonwealth",
      "immigration",
      "legal status",
    ],
    icon: "🆔",
    heroImage: "/images/malta-citizenship.png",
    articleCount: 4,
  },
  {
    chapter: "4",
    title: "Fundamental Rights and Freedoms",
    description:
      "The cornerstone of Malta's constitutional democracy guaranteeing civil liberties and basic freedoms",
    tags: [
      "rights",
      "freedoms",
      "liberty",
      "civil rights",
      "human rights",
      "democracy",
    ],
    icon: "⚖️",
    heroImage: "/images/scales-justice.png",
    articleCount: 16,
  },
  {
    chapter: "5",
    title: "The President of Malta",
    description:
      "The office of the President, appointment process, duties and constitutional role in democratic functions",
    tags: ["president", "head of state", "appointment", "ceremonial", "unity"],
    icon: "🎖️",
    heroImage: "/images/maltese-president.png",
    articleCount: 8,
  },
  {
    chapter: "6",
    title: "Parliament",
    description:
      "The legislative branch of government, parliamentary procedures and democratic representation",
    tags: [
      "parliament",
      "legislative",
      "democracy",
      "representation",
      "elections",
    ],
    icon: "🏛️",
    heroImage: "/images/maltese-parliament.png",
    articleCount: 12,
  },
  {
    chapter: "7",
    title: "Executive Power",
    description:
      "How executive authority is exercised through symbolic leadership, practical governance and legal accountability",
    tags: [
      "executive",
      "government",
      "prime minister",
      "cabinet",
      "governance",
    ],
    icon: "🏢",
    heroImage: "/images/auberge-de-castille.png",
    articleCount: 10,
  },
  {
    chapter: "8",
    title: "The Judiciary",
    description:
      "A pillar of democratic governance ensuring judicial independence, accountability and fairness",
    tags: [
      "judiciary",
      "courts",
      "judges",
      "justice",
      "independence",
      "rule of law",
    ],
    icon: "⚖️",
    heroImage: "/images/malta-courts.png",
    articleCount: 8,
  },
  {
    chapter: "9",
    title: "Finance",
    description:
      "Managing public funds transparently through constitutional controls and parliamentary oversight",
    tags: ["finance", "budget", "public funds", "transparency", "oversight"],
    icon: "💰",
    heroImage: "/images/central-bank-malta.png",
    articleCount: 6,
  },
  {
    chapter: "10",
    title: "The Public Service",
    description:
      "Appointment, oversight and pension rights for Malta's civil service and public sector employees",
    tags: [
      "public service",
      "civil service",
      "employment",
      "pensions",
      "oversight",
    ],
    icon: "👔",
    heroImage: "/images/public-service.png",
    articleCount: 5,
  },
  {
    chapter: "10a",
    title: "Local Councils",
    description:
      "Local government structure and the role of councils in Malta's democratic governance",
    tags: ["local government", "councils", "municipalities", "local democracy"],
    icon: "🏘️",
    heroImage: "/images/malta-local-councils.png",
    articleCount: 4,
  },
  {
    chapter: "11",
    title: "Miscellaneous Provisions",
    description:
      "Additional constitutional provisions covering various aspects of Malta's legal framework",
    tags: ["miscellaneous", "provisions", "legal framework", "constitutional"],
    icon: "📋",
    heroImage: "/images/constitution-book.png",
    articleCount: 6,
  },
];

// Helper functions for working with chapters
export const getChapterById = (chapterId: string): Chapter | undefined => {
  return CHAPTERS.find((chapter) => chapter.chapter === chapterId);
};

export const getChapterTitle = (chapterId: string): string => {
  const chapter = getChapterById(chapterId);
  return chapter ? chapter.title : `Chapter ${chapterId}`;
};

export const searchChapters = (searchTerm: string): Chapter[] => {
  if (!searchTerm.trim()) return CHAPTERS;

  const term = searchTerm.toLowerCase();
  return CHAPTERS.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(term) ||
      chapter.description.toLowerCase().includes(term) ||
      chapter.tags.some((tag) => tag.toLowerCase().includes(term)) ||
      chapter.chapter.includes(term),
  );
};

// Age level mappings for content fetching
export const AGE_LEVELS = [
  "5-year-old",
  "10-year-old",
  "15-year-old",
  "citizen",
] as const;

export type AgeLevel = (typeof AGE_LEVELS)[number];

export const AGE_LEVEL_LABELS: Record<AgeLevel, string> = {
  "5-year-old": "5 Year Old",
  "10-year-old": "10 Year Old",
  "15-year-old": "15 Year Old",
  citizen: "Citizen",
};
