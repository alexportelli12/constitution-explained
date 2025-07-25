import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

const STORAGE_KEY = "analytics_popup_dismissed";

export const AnalyticsNote = component$(() => {
  const isVisible = useSignal<boolean | null>(null); // null = loading, true = show, false = hide

  // useVisibleTask$ is necessary here because:
  // 1. We need to access localStorage which is only available in the browser
  // 2. We need the signal update to trigger a re-render once localStorage is checked
  // 3. useTask$ runs during SSR and doesn't properly trigger reactivity for this use case
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    isVisible.value = !dismissed; // Show if not dismissed
  });

  const handleDismiss = $(() => {
    isVisible.value = false;
    localStorage.setItem(STORAGE_KEY, "true");
  });

  // Don't render until we've checked localStorage
  if (isVisible.value !== true) {
    return null;
  }

  return (
    <div class="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-md">
      <div class="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
        <div class="flex items-center justify-between space-x-3">
          <div class="flex-1">
            <p class="text-sm text-gray-700">
              We collect anonymous usage data to help improve the site. No
              personal info is stored.
            </p>
          </div>
          <button
            onClick$={handleDismiss}
            class="flex-shrink-0 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium px-2 py-1 rounded transition-colors cursor-pointer"
            aria-label="Dismiss analytics notice"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
});
