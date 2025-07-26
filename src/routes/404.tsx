import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BookOpenIcon, HomeIcon, SearchIcon } from "../components";

export default component$(() => {
  return (
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full text-center">
        {/* Icon */}
        <BookOpenIcon class="w-24 h-24 mx-auto text-primary-500 mb-8" />
        
        {/* Heading */}
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        {/* Description */}
        <p class="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist. Let's get you back to learning about Malta's Constitution.
        </p>
        
        {/* CTAs */}
        <div class="space-y-4">
          <a
            href="/"
            class="w-full flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            <HomeIcon class="w-5 h-5 mr-2" />
            Go Home
          </a>
          
          <a
            href="/chapters"
            class="w-full flex items-center justify-center px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            <SearchIcon class="w-5 h-5 mr-2" />
            Browse Chapters
          </a>
          
          <a
            href="/overview"
            class="w-full flex items-center justify-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Learn About the Constitution
          </a>
        </div>
        
        {/* Help text */}
        <p class="text-sm text-gray-500 mt-8">
          Looking for something specific? Try starting from our{" "}
          <a href="/chapters" class="text-primary-500 hover:underline">
            chapter browser
          </a>{" "}
          or{" "}
          <a href="/overview" class="text-primary-500 hover:underline">
            constitution overview
          </a>
          .
        </p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Page Not Found - Malta Constitution",
  meta: [
    {
      name: "description",
      content: "Page not found. Return to Malta Constitution learning.",
    },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ],
};