import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { clsx } from "clsx";
import type { Chapter } from "../models";
import { AnalyticsButton } from "./ui";
import {
  BuildingIcon,
  DocumentIcon,
  IdCardIcon,
  ScaleIcon,
  StarIcon,
  ReceiptIcon,
  CurrencyIcon,
  UsersIcon,
} from "./svgs";

interface ChapterCardProps {
  chapter: Chapter;
  class?: string;
}

const getChapterIcon = (chapterNumber: string) => {
  switch (chapterNumber) {
    case "1": // The Republic of Malta
      return <BuildingIcon class="w-12 h-12 text-primary-500" />;
    case "2": // Declaration of Principles
      return <DocumentIcon class="w-12 h-12 text-primary-500" />;
    case "3": // Citizenship
      return <IdCardIcon class="w-12 h-12 text-primary-500" />;
    case "4": // Fundamental Rights and Freedoms
      return <ScaleIcon class="w-12 h-12 text-primary-500" />;
    case "5": // The President of Malta
      return <StarIcon class="w-12 h-12 text-primary-500" />;
    case "6": // Parliament
      return <BuildingIcon class="w-12 h-12 text-primary-500" />;
    case "7": // Executive Power
      return <ReceiptIcon class="w-12 h-12 text-primary-500" />;
    case "8": // The Judiciary
      return <ScaleIcon class="w-12 h-12 text-primary-500" />;
    case "9": // Finance
      return <CurrencyIcon class="w-12 h-12 text-primary-500" />;
    case "10": // The Public Service
      return <UsersIcon class="w-12 h-12 text-primary-500" />;
    case "10A": // Local Councils
      return <BuildingIcon class="w-12 h-12 text-primary-500" />;
    case "11": // Miscellaneous Provisions
      return <DocumentIcon class="w-12 h-12 text-primary-500" />;
    default:
      return <DocumentIcon class="w-12 h-12 text-primary-500" />;
  }
};

export const ChapterCard = component$<ChapterCardProps>(
  ({ chapter, class: additionalClass }) => {
    const nav = useNavigate();

    const handleCardClick = $(() => {
      nav(`/chapters/${chapter.chapter}`);
    });

    return (
      <AnalyticsButton
        eventTag={`chapter-card-${chapter.chapter}`}
        onClick$={handleCardClick}
        class={clsx(
          "bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group block w-full text-left",
          additionalClass,
        )}
        onKeyDown$={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleCardClick();
          }
        }}
      >
        <div class="flex items-start space-x-4 h-full">
          <div class="flex-shrink-0 group-hover:scale-110 transition-transform">
            {getChapterIcon(chapter.chapter)}
          </div>
          <div class="flex-1 min-w-0 flex flex-col h-full">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              Chapter {chapter.chapter}: {chapter.title}
            </h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
              {chapter.description}
            </p>
            <div class="flex justify-between items-center mt-auto">
              <span class="text-xs text-gray-500">
                {chapter.articleCount} article(s)
              </span>
              <span class="text-primary-600 text-sm font-medium group-hover:text-primary-800 transition-colors">
                Read Chapter →
              </span>
            </div>
          </div>
        </div>
      </AnalyticsButton>
    );
  },
);
