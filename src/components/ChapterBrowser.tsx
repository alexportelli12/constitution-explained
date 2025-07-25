import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import { clsx } from "clsx";
import { CHAPTERS } from "../constants";
import { searchChapters } from "../utils";
import { ChapterCard } from "./ChapterCard";
import { SearchIcon } from "./svgs";

interface ChapterBrowserProps {
  class?: string;
}

export const ChapterBrowser = component$<ChapterBrowserProps>(
  ({ class: additionalClass }) => {
    const searchQuery = useSignal("");

    const filteredChapters = useComputed$(() => {
      return searchChapters(searchQuery.value);
    });

    return (
      <div class={clsx("w-full", additionalClass)}>
        {/* Search Bar - Sticky */}
        <div class="sticky top-20 z-40 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2">
          <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div class="relative">
              <input
                type="search"
                placeholder="Search chapters by title, description, or topics..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                value={searchQuery.value}
                onInput$={(event) => {
                  const { value } = event.target as HTMLInputElement;
                  searchQuery.value = value;
                }}
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {searchQuery.value && (
          <div class="mb-4 px-1">
            <p class="text-sm text-gray-600">
              {filteredChapters.value.length === 0 ? (
                <>
                  No chapters found for "<strong>{searchQuery.value}</strong>"
                </>
              ) : (
                <>
                  {filteredChapters.value.length} chapter(s) found for "
                  <strong>{searchQuery.value}</strong>"
                </>
              )}
            </p>
          </div>
        )}

        {/* Chapter Cards Grid */}
        {filteredChapters.value.length === 0 ? (
          <div class="text-center py-12">
            <div class="text-gray-400 text-6xl mb-4">📚</div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              No chapters found
            </h3>
            <p class="text-gray-500 max-w-sm mx-auto">
              {searchQuery.value
                ? `Try adjusting your search term or browse all available chapters.`
                : `No chapters are available at this time.`}
            </p>
            {searchQuery.value && (
              <button
                class="mt-4 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
                onClick$={() => {
                  searchQuery.value = "";
                }}
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredChapters.value.map((chapter) => (
              <ChapterCard
                key={chapter.chapter}
                chapter={chapter}
                class="h-full"
              />
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!searchQuery.value && (
          <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Browse all <strong>{CHAPTERS.length} chapters</strong> of the
                Constitution of Malta
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Each chapter is available at different reading levels for all
                ages
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
