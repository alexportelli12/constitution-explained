import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section class="text-center mb-16">
        <h1 class="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Maltese Constitution Explained 🇲🇹
        </h1>
        <p class="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Making the Constitution of Malta accessible to everyone through
          age-appropriate explanations.
        </p>
      </section>

      {/* Inspirational Quote Section */}
      <section class="mb-16">
        <div class="bg-white rounded-xl shadow-lg p-8 sm:p-12 max-w-4xl mx-auto">
          <blockquote class="text-center">
            <p class="text-2xl sm:text-3xl font-medium text-gray-800 mb-6 italic leading-relaxed">
              "The most important political office is that of the private
              citizen."
            </p>
            <cite class="text-lg text-primary-500 font-semibold not-italic">
              — Louis Brandeis
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Mission Section */}
      <section class="mb-16">
        <div class="text-center max-w-4xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            The Mission
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
            Complex legal language shouldn't prevent citizens from understanding
            their rights and responsibilities. Constitutional knowledge belongs to
            everyone, not just lawyers and academics.
          </p>
          <p class="text-lg sm:text-xl text-gray-600 leading-relaxed">
            This platform simplifies the Constitution of Malta into clear,
            age-appropriate explanations that help citizens of all backgrounds
            engage meaningfully with their democracy.
          </p>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section class="text-center">
        <div class="space-y-6 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
          <a
            href="/overview"
            class="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Learn About the Constitution
          </a>
          <a
            href="/articles"
            class="inline-block border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Articles
          </a>
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Maltese Constitution Explained",
  meta: [
    {
      name: "description",
      content:
        "Making the Constitution of Malta accessible to everyone through clear, age-appropriate explanations. Understand your rights and democracy without complex legal jargon.",
    },
  ],
};
