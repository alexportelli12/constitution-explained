import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  HeroImage,
  OpenSourceSection,
  CivicEducationSection,
  CitizenOwnershipSection,
  AgeLevelPreview,
  WhyConstitutionSection,
  HistorySection,
} from "../components";

export default component$(() => {
  return (
    <div class="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section class="relative bg-gradient-to-br from-primary-50 to-white flex items-center">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                🇲🇹 Constitution of Malta{" "}
                <span class="text-primary-500">Explained</span>
              </h1>
              <p class="text-xl text-gray-600 mb-6 leading-relaxed">
                Empowering every Maltese citizen with constitutional knowledge.
                From 5 year olds to legal scholars—democracy belongs to
                everyone.
              </p>
              <p class="text-lg text-gray-700 mb-8 leading-relaxed">
                Transform complex legal language into clear, age-appropriate
                explanations. Understand your rights, your government, and your
                power as a citizen.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a
                  href="/overview"
                  class="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                >
                  Start Learning →
                </a>
                <a
                  href="/chapters"
                  class="inline-block border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                >
                  Browse Chapters
                </a>
              </div>
            </div>
            <div class="relative">
              <HeroImage
                src="/images/valletta-skyline.webp"
                alt="Valletta Skyline - Malta's Historic Capital"
                fallbackText="Malta's Constitutional Heritage"
                gradientColors="from-blue-100 to-blue-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Add civic engagement section after hero */}
      <WhyConstitutionSection />

      {/* UNCHANGED: Keep existing sections in order */}
      <CivicEducationSection />
      <CitizenOwnershipSection />
      <AgeLevelPreview />

      {/* NEW: History Section */}
      <HistorySection />

      {/* Inspirational Quote Section */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-xl shadow-lg p-8 sm:p-12">
            <blockquote class="text-center">
              <p class="text-2xl sm:text-3xl font-medium text-gray-800 mb-6 italic leading-relaxed">
                "A man that knows what self-respect is will never ask in
                pleading tones for what he is entitled to."
              </p>
              <cite class="text-lg text-primary-500 font-semibold not-italic">
                — Manwel Dimech
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* MOVED: Open Source section now above footer */}
      <OpenSourceSection />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Constitution of Malta Explained - For All Ages",
  meta: [
    {
      name: "description",
      content:
        "Learn Malta's Constitution through age-appropriate explanations. Open-source platform making constitutional education accessible to citizens of all ages.",
    },
    {
      name: "keywords",
      content:
        "Constitution of Malta, constitutional education, civic education, democracy, constitutional rights, open source",
    },
    {
      property: "og:title",
      content: "Constitution of Malta Explained",
    },
    {
      property: "og:description",
      content:
        "Making the Constitution of Malta accessible through clear, age-appropriate explanations",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content: "https://constitutionofmalta.com/images/valletta-skyline.webp",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};
