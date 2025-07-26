import { component$ } from "@builder.io/qwik";

export const OpenSourceSection = component$(() => {
  return (
    <section class="py-12 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Open Source & Collaborative 🤝
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            This platform is built by the community, for the community.
            Constitutional knowledge should be transparent, accessible, and
            continuously improved through collaboration.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">
              🌟 Contribute to Democracy
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              Help improve constitutional explanations, fix errors, add content,
              or enhance the platform. Every contribution makes Malta's
              democracy more accessible.
            </p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <span class="text-green-700 font-semibold">✓</span>
                <span class="text-gray-700">
                  Add explanations for new age groups
                </span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-green-700 font-semibold">✓</span>
                <span class="text-gray-700">
                  Improve translations and clarity
                </span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-green-700 font-semibold">✓</span>
                <span class="text-gray-700">
                  Report issues and suggest features
                </span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-xl p-8">
            <div class="text-center mb-6">
              <div class="text-4xl mb-4">📊</div>
              <h4 class="text-xl font-semibold text-gray-900 mb-2">
                Project Stats
              </h4>
              <p class="text-gray-600">
                Building constitutional literacy together
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-700">Constitution Chapters</span>
                <span class="font-semibold text-primary-500">12</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Age Levels Supported</span>
                <span class="font-semibold text-primary-500">4</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Open Source</span>
                <span class="font-semibold text-green-700">100%</span>
              </div>
            </div>

            <div class="mt-6">
              <a
                href="https://github.com/alexportelli12/constitution-explained"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-block text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
