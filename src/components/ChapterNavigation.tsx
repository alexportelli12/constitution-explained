import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { getPreviousChapter, getNextChapter } from "../utils/chapter.utils";

interface ChapterNavigationProps {
  chapterID: string;
}

export const ChapterNavigation = component$<ChapterNavigationProps>(
  ({ chapterID }) => {
    const nav = useNavigate();
    const prevChapter = getPreviousChapter(chapterID);
    const nextChapter = getNextChapter(chapterID);

    const handlePrevNavigation = $(() => {
      if (prevChapter) {
        nav(`/chapters/${prevChapter.chapter}`);
      }
    });

    const handleNextNavigation = $(() => {
      if (nextChapter) {
        nav(`/chapters/${nextChapter.chapter}`);
      }
    });

    return (
      <div class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
        <div class="flex-1">
          {prevChapter && (
            <button
              class="flex items-center text-primary-600 hover:text-primary-800 transition-colors group"
              onClick$={handlePrevNavigation}
            >
              <svg 
                class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div class="text-left">
                <div class="text-sm text-gray-500">Previous</div>
                <div class="font-medium">
                  Chapter {prevChapter.chapter}: {prevChapter.title}
                </div>
              </div>
            </button>
          )}
        </div>
        
        <div class="flex-1 text-right">
          {nextChapter && (
            <button
              class="flex items-center justify-end text-primary-600 hover:text-primary-800 transition-colors group"
              onClick$={handleNextNavigation}
            >
              <div class="text-right">
                <div class="text-sm text-gray-500">Next</div>
                <div class="font-medium">
                  Chapter {nextChapter.chapter}: {nextChapter.title}
                </div>
              </div>
              <svg 
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);