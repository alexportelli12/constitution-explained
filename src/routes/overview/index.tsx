import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation, useNavigate, Link } from "@builder.io/qwik-city";
import {
  AgeLevelToggle,
  MarkdownRenderer,
  ReadingLevelsTip,
  OfficialLegislationLink,
} from "../../components";
import { fetchOverviewContent } from "../../lib/fetchMarkdown";
import type { OverviewContent } from "../../models/chapter.model";
import { AGE_LEVELS } from "../../constants/age-levels.constant";

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  // Get initial level from URL or default to "citizen"
  const getInitialLevel = $(() => {
    const levelParam = loc.url.searchParams.get("level");
    return AGE_LEVELS.includes(levelParam as any) ? levelParam! : "citizen";
  });

  // Initialize with URL parameter or default to "citizen"
  const levelParam = loc.url.searchParams.get("level");
  const initialLevel = AGE_LEVELS.includes(levelParam as any)
    ? levelParam!
    : "citizen";
  const activeLevel = useSignal<string>(initialLevel);
  const content = useSignal<OverviewContent | null>(null);

  const loadContent = $(async (level: string) => {
    content.value = null; // Clear content to show loading state
    const result = await fetchOverviewContent(level);
    content.value = result;
  });

  const handleLevelChange = $((level: string) => {
    activeLevel.value = level;
    // Update URL with new level parameter
    const newUrl = new URL(loc.url);
    newUrl.searchParams.set("level", level);
    nav(newUrl.pathname + newUrl.search, { scroll: false });
  });

  const getLevelDescription = $((level: string) => {
    switch (level) {
      case "5-year-old":
        return "5 years old";
      case "10-year-old":
        return "10 years old";
      case "15-year-old":
        return "15 years old";
      default:
        return "an adult citizen";
    }
  });

  // Watch for URL changes (back/forward navigation, direct links)
  useTask$(async ({ track }) => {
    track(() => loc.url.searchParams.get("level"));
    const newLevel = await getInitialLevel();
    if (newLevel !== activeLevel.value) {
      activeLevel.value = newLevel;
    }
  });

  useVisibleTask$(async ({ track }) => {
    const level = track(() => activeLevel.value);
    await loadContent(level);
  });

  return (
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Understanding Malta's Constitution
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Learn about Malta's Constitution at your level. Choose an explanation
          that works for you:
        </p>
        <div class="flex justify-center">
          <Link
            href="/chapters"
            class="inline-flex items-center px-6 py-3 border border-primary-500 text-primary-600 font-medium rounded-xl hover:bg-primary-50 transition-colors"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Browse All Chapters
          </Link>
        </div>
      </div>

      {/* Age Level Toggle */}
      <div class="sticky top-20 z-40 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2">
        <div class="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 p-3">
          <AgeLevelToggle
            activeLevel={activeLevel}
            onLevelChange={handleLevelChange}
          />
        </div>
      </div>

      {/* Dynamic Note */}
      <div class="mb-4 p-3 bg-red-50 border-l-4 border-primary-500 rounded-r-lg">
        <p class="text-sm text-primary-700">
          Explain the Constitution of Malta to me like I'm{" "}
          <strong>{getLevelDescription(activeLevel.value)}</strong>.
        </p>
      </div>

      {/* Content Area */}
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!content.value ? (
          <MarkdownRenderer content="" />
        ) : (
          <MarkdownRenderer
            content={content.value.content}
            error={content.value.error}
          />
        )}
      </div>

      {/* Official legislation link */}
      <OfficialLegislationLink />

      {/* Additional Info */}
      <ReadingLevelsTip />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Constitution Overview - Constitution of Malta Explained",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive overview of Malta's Constitution with age-appropriate explanations for all ages. Learn about Malta's fundamental law, democratic principles, and constitutional foundations from 5 year old to citizen level.",
    },
    {
      name: "keywords",
      content:
        "Malta Constitution overview, constitutional law, civic education, democracy, Malta government, constitutional principles, fundamental law, democratic governance, constitutional literacy, Malta legal framework, rule of law, constitutional democracy, civic learning",
    },
    {
      property: "og:title",
      content: "Constitution Overview - Constitution of Malta Explained",
    },
    {
      property: "og:description",
      content:
        "Comprehensive overview of Malta's Constitution with age-appropriate explanations for all ages.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "article:section",
      content: "Constitutional Education",
    },
  ],
};
