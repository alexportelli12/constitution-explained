import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">
          V2 Welcome to Maltese Constitution Explained 🇲🇹
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Making the Constitution of Malta accessible to everyone through
          age-appropriate explanations.
        </p>
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <a
            href="/overview"
            class="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Learn About the Constitution
          </a>
          <a
            href="/articles"
            class="inline-block border border-primary-500 text-primary-500 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            Browse Articles
          </a>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Maltese Constitution Explained - Home",
  meta: [
    {
      name: "description",
      content:
        "Learn about the Constitution of Malta with age-appropriate explanations for everyone.",
    },
  ],
};
