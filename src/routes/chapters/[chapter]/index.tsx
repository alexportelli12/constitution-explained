import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import type { DocumentHead, RequestHandler, StaticGenerateHandler } from "@builder.io/qwik-city";
import { useLocation, useNavigate, routeLoader$ } from "@builder.io/qwik-city";
import {
  AgeLevelToggle,
  MarkdownRenderer,
  HeroImage,
} from "../../../components";
import {
  fetchChapterContent,
  type ChapterContent,
} from "../../../lib/fetchMarkdown";
import { getChapterById, getChapterTitle, CHAPTERS } from "../../../constants/chapters";

export const useChapterLoader = routeLoader$(async (requestEvent) => {
  const chapterId = requestEvent.params.chapter;
  return {
    chapterId,
    chapterMeta: getChapterById(chapterId),
  };
});

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const chapterData = useChapterLoader();

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
  const content = useSignal<ChapterContent | null>(null);

  const loadContent = $(async (level: string, chapterId: string) => {
    content.value = null; // Clear content to show loading state
    const result = await fetchChapterContent(chapterId, level);
    content.value = result;
  });

  const handleLevelChange = $((level: string) => {
    activeLevel.value = level;
    // Update URL with new level parameter
    const newUrl = new URL(loc.url);
    newUrl.searchParams.set("level", level);
    nav(newUrl.pathname + newUrl.search, { scroll: false });
  });

  const handleBackToChapters = $(() => {
    nav("/chapters");
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
    await loadContent(level, chapterData.value.chapterId);
  });

  const chapterMeta = chapterData.value.chapterMeta;

  // Show error if chapter not found
  if (!chapterMeta) {
    return (
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <div class="text-6xl mb-4">📚</div>
          <h1 class="text-2xl font-bold text-gray-900 mb-4">
            Chapter Not Found
          </h1>
          <p class="text-gray-600 mb-6">
            Chapter "{chapterData.value.chapterId}" could not be found.
          </p>
          <button
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            onClick$={handleBackToChapters}
          >
            ← Back to Chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div class="mb-6">
        <button
          class="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
          onClick$={handleBackToChapters}
        >
          <svg
            class="w-4 h-4 mr-2"
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
          Back to Chapters
        </button>
      </div>

      {/* Hero Section */}
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Chapter {chapterMeta.chapter}: {chapterMeta.title}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {chapterMeta.description}
        </p>
        <div class="flex flex-wrap justify-center gap-2 mt-4">
          {chapterMeta.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      <HeroImage
        src={chapterMeta.heroImage}
        alt={`Chapter ${chapterMeta.chapter}: ${chapterMeta.title}`}
        fallbackIcon={chapterMeta.icon}
        fallbackText={`Chapter ${chapterMeta.chapter} Hero Image`}
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
          Reading Chapter {chapterMeta.chapter}:{" "}
          <strong>{chapterMeta.title}</strong> at{" "}
          <strong>{getLevelDescription(activeLevel.value)}</strong> level
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
      <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p class="text-sm text-gray-700">
          📚 <strong>Want the complete text?</strong> Visit{" "}
          <a
            href="https://legislation.mt/eli/const/eng"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:text-primary-800 underline"
          >
            legislation.mt
          </a>{" "}
          to read the full Constitution document.
        </p>
      </div>

      {/* Chapter Navigation */}
      <div class="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <p class="text-sm text-primary-700">
          💡 <strong class="text-primary-900">Tip:</strong> Each chapter is
          available at different reading levels. Try switching levels to see how
          the same content is explained for different ages!
        </p>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const chapterData = resolveValue(useChapterLoader);
  const chapterTitle = chapterData.chapterMeta
    ? chapterData.chapterMeta.title
    : getChapterTitle(params.chapter);

  return {
    title: `Chapter ${params.chapter}: ${chapterTitle} - Malta's Constitution`,
    meta: [
      {
        name: "description",
        content: chapterData.chapterMeta
          ? chapterData.chapterMeta.description
          : `Learn about Chapter ${params.chapter} of Malta's Constitution with age-appropriate explanations.`,
      },
      {
        name: "keywords",
        content: `Malta Constitution, Chapter ${params.chapter}, ${chapterData.chapterMeta?.tags.join(", ") || "constitutional law, civic education"}`,
      },
    ],
  };
};

// Handle 404 for invalid chapters
export const onGet: RequestHandler = async ({ params, error }) => {
  const chapterMeta = getChapterById(params.chapter);
  if (!chapterMeta) {
    throw error(404, `Chapter ${params.chapter} not found`);
  }
};

// Static generation for all chapters
export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: CHAPTERS.map((chapter) => ({
      chapter: chapter.chapter,
    })),
  };
};
