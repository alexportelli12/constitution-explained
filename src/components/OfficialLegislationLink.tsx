import { component$ } from "@builder.io/qwik";
import { BookOpenIcon } from "./svgs";

export const OfficialLegislationLink = component$(() => {
  return (
    <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p class="text-sm text-gray-700 flex items-center">
        <BookOpenIcon class="w-5 h-5 mr-2 text-primary-600" />
        <span>
          <strong>Want the complete text?</strong>&nbsp;Visit{""}
          <a
            href="https://legislation.mt/eli/const/eng"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:text-primary-800 underline ml-1"
          >
            legislation.mt
          </a>{" "}
          to read the full Constitution document.
        </span>
      </p>
    </div>
  );
});
