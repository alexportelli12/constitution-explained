import { component$ } from "@builder.io/qwik";

export const ReadingLevelsTip = component$(() => {
  return (
    <div class="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
      <p class="text-sm text-primary-700 flex items-center">
        <svg 
          class="w-6 h-6 mr-3 text-primary-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width={2} 
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
          />
        </svg>
        Each chapter is available at different reading levels. Try switching levels to see how the same content is explained for different ages!
      </p>
    </div>
  );
});