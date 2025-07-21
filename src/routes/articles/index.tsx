import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ChapterBrowser } from "../../components/ChapterBrowser";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          🇲🇹 Browse Constitution Chapters
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the chapters of Malta's Constitution. Each chapter is
          available with age-appropriate explanations to make constitutional
          learning accessible to everyone.
        </p>
      </div>

      {/* Chapter Browser */}
      <ChapterBrowser />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Browse Constitution Chapters - Maltese Constitution Explained",
  meta: [
    {
      name: "description",
      content:
        "Browse all chapters of Malta's Constitution with age-appropriate explanations. From foundations and rights to government structure and public service.",
    },
    {
      name: "keywords",
      content:
        "Malta Constitution chapters, constitutional law, civic education, democracy, government structure, Malta chapters",
    },
  ],
};
