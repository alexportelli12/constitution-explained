import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  BuildingIcon,
  StarIcon,
  GlobeIcon,
  ClockIcon,
  ArrowRightIcon,
} from "./svgs";

export const HistorySection = component$(() => {
  return (
    <section class="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">
            Malta's Constitutional Journey
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Malta evolved from British colonial rule to
            independence in 1964 and became a republic in 1974. Learn about the
            key events, figures, and milestones that shaped our nation's
            constitutional development.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <BuildingIcon class="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Colonial Era to Self-Government
                </h3>
                <p class="text-gray-600">
                  From British colonial rule beginning in 1800, through the
                  struggle for autonomy and the evolution of democratic
                  institutions.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <StarIcon class="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Independence Achievement
                </h3>
                <p class="text-gray-600">
                  The milestone of September 21, 1964, when Malta gained
                  independence and established its first democratic
                  constitution.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <GlobeIcon class="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Republic Transformation
                </h3>
                <p class="text-gray-600">
                  The transition to a republic in 1974, establishing Malta as a
                  fully sovereign nation with its own President and
                  constitutional framework.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-primary-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <ClockIcon class="w-10 h-10 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                Explore Our Constitutional History
              </h3>
              <p class="text-gray-600 mb-8">
                Learn about Malta's fascinating constitutional journey through
                age-appropriate explanations that make history accessible to
                everyone.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-700">
                  Key Historical Periods
                </span>
                <span class="text-2xl font-bold text-primary-600">4</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-700">
                  Age-Appropriate Levels
                </span>
                <span class="text-2xl font-bold text-primary-600">4</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-700">
                  Years of Constitutional Development
                </span>
                <span class="text-2xl font-bold text-primary-600">200+</span>
              </div>
            </div>

            <Link
              href="/history"
              class="mt-8 w-full bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center group"
            >
              <span>Discover Malta's History</span>
              <ArrowRightIcon class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});
