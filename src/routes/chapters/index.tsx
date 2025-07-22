import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { ChapterBrowser } from "../../components/ChapterBrowser";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Browse Constitution Chapters
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Explore all chapters of Malta's Constitution. Each chapter is
          available with age-appropriate explanations to make constitutional
          learning accessible to everyone.
        </p>
        <div class="flex justify-center">
          <Link
            href="/overview"
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Read Constitution Overview
          </Link>
        </div>
      </div>

      {/* Chapter Browser */}
      <ChapterBrowser />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Browse Constitution Chapters - Constitution of Malta Explained",
  meta: [
    {
      name: "description",
      content:
        "Explore all 12 chapters of Malta's Constitution with age-appropriate explanations. From fundamental rights and freedoms to government structure, judiciary, and public service. Constitutional education made accessible for all ages.",
    },
    {
      name: "keywords",
      content:
        "Malta Constitution chapters, constitutional law, civic education, democracy, government structure, fundamental rights, freedoms, judiciary, parliament, president, executive power, public service, local councils, citizenship, Malta law, constitutional democracy, rule of law, civil liberties, human rights, legal framework, Malta government",
    },
    {
      property: "og:title",
      content: "Browse Constitution Chapters - Constitution of Malta Explained",
    },
    {
      property: "og:description",
      content:
        "Explore all 12 chapters of Malta's Constitution with age-appropriate explanations for constitutional education.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content: "/images/valletta-skyline.png",
    },
  ],
};
