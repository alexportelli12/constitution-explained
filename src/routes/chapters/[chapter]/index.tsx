import {
  component$,
  useSignal,
  useVisibleTask$,
  useComputed$,
  $,
} from "@builder.io/qwik";
import type {
  DocumentHead,
  RequestHandler,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { useNavigate, routeLoader$ } from "@builder.io/qwik-city";
import {
  AgeLevelToggle,
  MarkdownRenderer,
  HeroImage,
  ChapterNavigation,
  ReadingLevelsTip,
  OfficialLegislationLink,
  BookOpenIcon,
  ChevronLeftIcon,
} from "../../../components";
import { fetchChapterContent } from "../../../lib";
import type { ChapterContent } from "../../../models";
import {
  getChapterById,
  getChapterTitle,
  getLevelDescription,
} from "../../../utils";
import { AgeLevel, CHAPTERS } from "../../../constants";
import { useAgeLevel } from "../../../contexts";

export const useChapterLoader = routeLoader$(async (requestEvent) => {
  const chapterId = requestEvent.params.chapter;
  return {
    chapterId,
    chapterMeta: getChapterById(chapterId),
  };
});

export default component$(() => {
  const nav = useNavigate();
  const chapterData = useChapterLoader();
  const { activeLevel, handleLevelChange } = useAgeLevel();
  const content = useSignal<ChapterContent | null>(null);

  const loadContent = $(async (level: AgeLevel, chapterId: string) => {
    content.value = null; // Clear content to show loading state
    const result = await fetchChapterContent(chapterId, level);
    content.value = result;
  });

  const handleBackToChapters = $(() => {
    nav("/chapters");
  });

  // Reason: useVisibleTask$ is required to load chapter content when component becomes visible
  // and when activeLevel or chapterId changes. We need the DOM to be ready for proper content loading.
  // useTask$ would execute too early and could cause content loading issues.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    const level = track(() => activeLevel.value);
    const chapterId = track(() => chapterData.value.chapterId); // Track chapter ID changes
    await loadContent(level, chapterId);
  });

  const chapterMeta = useComputed$(() =>
    getChapterById(chapterData.value.chapterId)
  );

  const chapterDisplayTitle = useComputed$(
    () => `Chapter ${chapterMeta.value?.chapter}: ${chapterMeta.value?.title}`
  );

  // Show error if chapter not found
  if (!chapterMeta.value) {
    return (
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <BookOpenIcon class="w-24 h-24 mx-auto text-gray-400 mb-4" />
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
          class="flex items-center text-primary-600 hover:text-primary-800 transition-colors cursor-pointer"
          onClick$={handleBackToChapters}
        >
          <ChevronLeftIcon class="w-4 h-4 mr-2" />
          Back to Chapters
        </button>
      </div>

      {/* Hero Section */}
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {chapterDisplayTitle.value}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {chapterMeta.value?.description}
        </p>
      </div>

      {/* Hero Image */}
      <HeroImage
        key={`hero-${chapterData.value.chapterId}`}
        src={chapterMeta.value?.heroImage}
        alt={`Chapter ${chapterMeta.value?.chapter}: ${chapterMeta.value?.title}`}
        fallbackText={`Chapter ${chapterMeta.value?.chapter} Hero Image`}
      />

      {/* Age Level Toggle */}
      <div class="sticky top-20 z-40 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2">
        <div class="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 px-3 py-2">
          <AgeLevelToggle
            activeLevel={activeLevel}
            onLevelChange={handleLevelChange}
          />
        </div>
      </div>

      {/* Dynamic Note */}
      <div class="mb-4 p-3 bg-red-50 border-l-4 border-primary-500 rounded-r-lg">
        <p class="text-sm text-primary-700">
          Reading <strong>{chapterDisplayTitle.value}</strong> at{" "}
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

      {/* Chapter Navigation */}
      <ChapterNavigation chapterID={chapterData.value.chapterId} />

      {/* Official legislation link */}
      <OfficialLegislationLink />

      {/* Tips Section */}
      <ReadingLevelsTip />
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const chapterData = resolveValue(useChapterLoader);
  const chapterTitle = chapterData.chapterMeta
    ? chapterData.chapterMeta.title
    : getChapterTitle(params.chapter);

  const chapterDescription = chapterData.chapterMeta
    ? `${chapterData.chapterMeta.description} Learn about this constitutional chapter with age-appropriate explanations for 5-year-olds, 10-year-olds, 15-year-olds, and citizens.`
    : `Learn about Chapter ${params.chapter} of Malta's Constitution with age-appropriate explanations for all ages.`;

  return {
    title: `Chapter ${params.chapter}: ${chapterTitle} | Malta Constitution Explained`,
    meta: [
      {
        name: "description",
        content: chapterDescription,
      },
      {
        name: "keywords",
        content: `Malta Constitution, Chapter ${params.chapter}, ${chapterTitle}, ${chapterData.chapterMeta?.tags.join(", ") || "constitutional law, civic education"}, Malta law, constitutional democracy, civic education, age-appropriate learning, constitutional literacy`,
      },
      {
        property: "og:title",
        content: `Chapter ${params.chapter}: ${chapterTitle} | Malta Constitution`,
      },
      {
        property: "og:description",
        content:
          chapterData.chapterMeta?.description ||
          `Learn about Chapter ${params.chapter} of Malta's Constitution with age-appropriate explanations.`,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:image",
        content: `https://constitutionofmalta.com${chapterData.chapterMeta?.heroImage || "/images/valletta-skyline.webp"}`,
      },
      {
        name: "article:section",
        content: "Constitutional Law",
      },
      {
        name: "article:tag",
        content:
          chapterData.chapterMeta?.tags.slice(0, 5).join(", ") ||
          "Malta Constitution",
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
