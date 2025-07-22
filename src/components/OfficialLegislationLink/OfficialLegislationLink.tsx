import { component$ } from "@builder.io/qwik";

export const OfficialLegislationLink = component$(() => {
  return (
    <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p class="text-sm text-gray-700 flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <strong>Want the complete text?</strong>&nbsp;Visit{" "}
        <a
          href="https://legislation.mt/eli/const/eng"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:text-primary-800 underline ml-1"
        >
          legislation.mt
        </a>{" "}
        &nbsp;to read the full Constitution document.
      </p>
    </div>
  );
});
