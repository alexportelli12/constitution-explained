import { component$, $, useComputed$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { getPreviousChapter, getNextChapter } from "../utils";
import { ChevronLeftIcon, ChevronRightIcon } from "./svgs";

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
              <ChevronLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
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
              <ChevronRightIcon class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    );
  },
);
