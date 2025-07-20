import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { AgeLevelToggle, MarkdownRenderer, HeroImage } from "../../components";
import {
  fetchOverviewContent,
  type OverviewContent,
} from "../../lib/fetchMarkdown";

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  // Get initial level from URL or default to "citizen"
  const getInitialLevel = $(() => {
    const levelParam = loc.url.searchParams.get("level");
    const validLevels = ["5-year-old", "10-year-old", "15-year-old", "citizen"];
    return validLevels.includes(levelParam || "") ? levelParam! : "citizen";
  });

  // Initialize with URL parameter or default to "citizen"
  const levelParam = loc.url.searchParams.get("level");
  const validLevels = ["5-year-old", "10-year-old", "15-year-old", "citizen"];
  const initialLevel = validLevels.includes(levelParam || "")
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
          🇲🇹 Understanding Malta's Constitution
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn about Malta's Constitution at your level. Choose an explanation
          that works for you:
        </p>
      </div>

      {/* Hero Image */}
      <HeroImage
        src="/images/constitution.png"
        alt="Malta Constitution - Legal Document and Justice Symbols"
        fallbackIcon="📜"
        fallbackText="Constitution Hero Image"
      />

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
          Explain the Maltese constitution to me like I'm{" "}
          <strong>
            {getLevelDescription(activeLevel.value)}
          </strong>
          .
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

      {/* Additional Info */}
      <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p class="text-sm text-gray-700">
          💡 <strong class="text-gray-900">Tip:</strong> Each explanation covers
          the same topics but uses different language appropriate for different
          ages. Try switching between levels to see the difference!
        </p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Constitution Overview - Understanding Malta's Constitution",
  meta: [
    {
      name: "description",
      content:
        "Learn about Malta's Constitution with age-appropriate explanations. Choose from 5-year-old to adult level explanations of Malta's fundamental law.",
    },
    {
      name: "keywords",
      content:
        "Malta Constitution, constitutional law, civic education, democracy, Malta government",
    },
  ],
};
