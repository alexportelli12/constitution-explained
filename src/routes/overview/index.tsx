import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Maltese Constitution Overview
      </h1>
      <div class="prose max-w-none">
        <p class="text-lg text-gray-600 mb-4">
          Welcome to the Maltese Constitution Overview page. This section will provide a
          comprehensive overview of the Maltese Constitution, its structure, and
          key principles.
        </p>
        <p class="text-gray-600">Content coming soon...</p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Maltese Constitution Overview - Maltese Constitution Explained",
  meta: [
    {
      name: "description",
      content:
        "Overview of the Maltese Constitution, its structure and key principles explained for all ages.",
    },
  ],
};
