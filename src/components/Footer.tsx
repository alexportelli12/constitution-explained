import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="bg-gray-50 border-t border-gray-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-600 text-sm">
            Built by{" "}
            <a
              href="https://alexportelli.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              Alex Portelli
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});
