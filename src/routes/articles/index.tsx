import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Maltese Constitution Articles
      </h1>
      <div class="prose max-w-none">
        <p class="text-lg text-gray-600 mb-4">
          Explore the individual articles of the Maltese Constitution. Each article
          will be explained at different reading levels to make the Maltese Constitution
          accessible to everyone.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Articles Coming Soon
            </h3>
            <p class="text-gray-600 text-sm">
              We're preparing detailed explanations of each constitutional
              article for different age groups and reading levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Maltese Constitution Articles - Maltese Constitution Explained",
  meta: [
    {
      name: "description",
      content:
        "Explore the articles of the Maltese Constitution with explanations for all ages and reading levels.",
    },
  ],
};
