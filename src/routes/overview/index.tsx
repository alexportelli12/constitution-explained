import { component$, useSignal, useTask$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { AgeLevelToggle, MarkdownRenderer } from "../../components";
import {
  fetchOverviewContent,
  type OverviewContent,
} from "../../lib/fetchMarkdown";

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  
  // Get initial level from URL or default to "citizen"
  const getInitialLevel = $(() => {
    const levelParam = loc.url.searchParams.get('level');
    const validLevels = ['5-year-old', '10-year-old', '15-year-old', 'citizen'];
    return validLevels.includes(levelParam || '') ? levelParam! : 'citizen';
  });
  
  // Initialize with URL parameter or default to "citizen"
  const levelParam = loc.url.searchParams.get('level');
  const validLevels = ['5-year-old', '10-year-old', '15-year-old', 'citizen'];
  const initialLevel = validLevels.includes(levelParam || '') ? levelParam! : 'citizen';
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
    newUrl.searchParams.set('level', level);
    nav(newUrl.pathname + newUrl.search);
  });

  // Watch for URL changes (back/forward navigation, direct links)
  useTask$(async ({ track }) => {
    track(() => loc.url.searchParams.get('level'));
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

      {/* Placeholder Hero Image */}
      <div class="w-full h-48 bg-gradient-to-r from-red-100 to-red-50 rounded-lg mb-8 flex items-center justify-center">
        <img
          src="/placeholder-hero.jpg"
          alt="Malta Constitution Hero"
          class="w-full h-full object-cover rounded-lg"
          onError$={(event) => {
            // Fallback to gradient background
            const target = event.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <div class="text-gray-500 text-center">
          <div class="text-2xl mb-2">📜</div>
          <p>Constitution Hero Image</p>
        </div>
      </div>

      {/* Age Level Toggle */}
      <AgeLevelToggle
        activeLevel={activeLevel}
        onLevelChange={handleLevelChange}
      />

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
      <div class="mt-8 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Each explanation covers the same topics but
          uses different language appropriate for different ages. Try switching
          between levels to see the difference!
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
