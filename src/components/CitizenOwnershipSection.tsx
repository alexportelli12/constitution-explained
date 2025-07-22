import { component$ } from "@builder.io/qwik";

export const CitizenOwnershipSection = component$(() => {
  return (
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Your Constitution, Your Rights 👤
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            The Constitution of Malta isn't just a legal document—it's your
            personal guide to understanding your place in Maltese society and
            your power as a citizen.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-6">
              🌟 Personal Empowerment Through Knowledge
            </h3>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    Know Your Rights
                  </h4>
                  <p class="text-gray-700">
                    From freedom of expression to protection from
                    discrimination, understand what protections you have as a
                    Maltese citizen.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    Understand Your Role
                  </h4>
                  <p class="text-gray-700">
                    Learn how government works, your voting power, and how to
                    engage with democratic institutions effectively.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    Shape Your Future
                  </h4>
                  <p class="text-gray-700">
                    Constitutional knowledge gives you the tools to participate
                    meaningfully in Malta's democratic future.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8">
            <div class="text-center mb-6">
              <h4 class="text-2xl font-bold text-gray-900 mb-4">
                For Every Age Group
              </h4>
              <p class="text-gray-700 mb-6">
                Constitutional education shouldn't wait until adulthood. Our
                platform makes complex legal concepts accessible to everyone.
              </p>
            </div>

            <div class="space-y-4">
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-primary-500">
                    5 Year Olds
                  </span>
                  <span class="text-2xl">🧒</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">
                  "Rules that help everyone be fair and kind"
                </p>
              </div>

              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-primary-500">
                    10 Year Olds
                  </span>
                  <span class="text-2xl">🏫</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">
                  "Laws that protect your rights and freedoms"
                </p>
              </div>

              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-primary-500">
                    15 Year Olds
                  </span>
                  <span class="text-2xl">🎓</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">
                  "Democratic principles and civic responsibility"
                </p>
              </div>

              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-primary-500">
                    Citizens
                  </span>
                  <span class="text-2xl">👩‍⚖️</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">
                  "Clear, accessible explanations without legal jargon"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
