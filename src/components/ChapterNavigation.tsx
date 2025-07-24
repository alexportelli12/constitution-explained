import { component$, $, useComputed$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { getPreviousChapter, getNextChapter } from "../utils";

interface ChapterNavigationProps {
  chapterID: string;
}

export const ChapterNavigation = component$<ChapterNavigationProps>(
  ({ chapterID }) => {
    const nav = useNavigate();
    const prevChapter = useComputed$(() => getPreviousChapter(chapterID));
    const nextChapter = useComputed$(() => getNextChapter(chapterID));

    const handlePrevNavigation = $(() => {
      if (prevChapter.value) {
        nav(`/chapters/${prevChapter.value.chapter}`);
      }
    });

    const handleNextNavigation = $(() => {
      if (nextChapter.value) {
        nav(`/chapters/${nextChapter.value.chapter}`);
      }
    });

    return (
      <div class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
        <div class="flex-1">
          {prevChapter.value && (
            <button
              class="flex items-center text-primary-600 hover:text-primary-800 transition-colors group cursor-pointer"
              onClick$={handlePrevNavigation}
            >
              <svg
                class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <div class="text-left">
                <div class="text-sm text-gray-500">Previous</div>
                <div class="font-medium">
                  Chapter {prevChapter.value.chapter}: {prevChapter.value.title}
                </div>
              </div>
            </button>
          )}
        </div>

        <div class="flex-1 flex justify-end">
          {nextChapter.value && (
            <button
              class="flex items-center text-primary-600 hover:text-primary-800 transition-colors group cursor-pointer"
              onClick$={handleNextNavigation}
            >
              <div class="text-right">
                <div class="text-sm text-gray-500">Next</div>
                <div class="font-medium">
                  Chapter {nextChapter.value.chapter}: {nextChapter.value.title}
                </div>
              </div>
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);
