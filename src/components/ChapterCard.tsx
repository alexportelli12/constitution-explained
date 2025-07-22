import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { clsx } from "clsx";
import type { Chapter } from "../constants/chapters";

interface ChapterCardProps {
  chapter: Chapter;
  class?: string;
}

export const ChapterCard = component$<ChapterCardProps>(
  ({ chapter, class: additionalClass }) => {
    const nav = useNavigate();

    const handleCardClick = $(() => {
      nav(`/chapters/${chapter.chapter}`);
    });

    return (
      <div
        class={clsx(
          "bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group",
          additionalClass
        )}
        onClick$={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown$={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleCardClick();
          }
        }}
      >
        <div class="flex items-start space-x-4">
          <div class="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
            {chapter.icon}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              Chapter {chapter.chapter}: {chapter.title}
            </h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">
              {chapter.description}
            </p>
            <div class="flex justify-between items-center">
              <div class="flex flex-wrap gap-1">
                {chapter.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
                {chapter.tags.length > 3 && (
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{chapter.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div class="flex justify-between items-center mt-3">
              <span class="text-xs text-gray-500">
                {chapter.articleCount} article(s)
              </span>
              <span class="text-primary-600 text-sm font-medium group-hover:text-primary-800 transition-colors">
                Read Chapter →
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
