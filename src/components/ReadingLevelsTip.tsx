import { component$ } from "@builder.io/qwik";
import { LightbulbIcon } from "./svgs";

export const ReadingLevelsTip = component$(() => {
  return (
    <div class="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
      <p class="text-sm text-primary-700 flex items-center">
        <LightbulbIcon class="w-6 h-6 mr-3 text-primary-600" />
        Each chapter is available at different reading levels. Try switching
        levels to see how the same content is explained for different ages!
      </p>
    </div>
  );
});
