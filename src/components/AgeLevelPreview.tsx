import { component$, $ } from "@builder.io/qwik";
import { AgeLevelToggle } from "./AgeLevelToggle";
import { AgeLevel } from "../constants";
import { useAgeLevel } from "../contexts";

export const AgeLevelPreview = component$(() => {
  const { activeLevel, setActiveLevel } = useAgeLevel();

  const sampleContent: Record<AgeLevel, string> = {
    [AgeLevel.FIVE_YEAR_OLD]:
      "Everyone in Malta has the right to say what they think and believe what they want. It's like having the freedom to choose your favorite color!",
    [AgeLevel.TEN_YEAR_OLD]:
      "All Maltese citizens have the right to freedom of expression and belief. This means you can share your opinions and practice your religion safely.",
    [AgeLevel.FIFTEEN_YEAR_OLD]:
      "The Constitution guarantees fundamental rights including freedom of expression, conscience, and religion. These rights are protected but come with responsibilities to respect others' rights too.",
    [AgeLevel.CITIZEN]:
      "Article 41 establishes the fundamental right to freedom of expression, conscience, and religion, subject to the interests of decency, public order, and the rights and freedoms of others.",
  };

  return (
    <section class="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Try Different Explanation Levels 📚
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            See how the same constitutional concept is explained for different
            age groups. Choose your level below:
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="mb-6">
            <AgeLevelToggle
              activeLevel={activeLevel}
              onLevelChange={$((level: AgeLevel) => {
                setActiveLevel(level);
              })}
            />
          </div>

          <div class="bg-gray-50 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">
              Example: Freedom of Expression (Article 41)
            </h4>
            <div class="text-gray-800 leading-relaxed">
              {activeLevel.value
                ? sampleContent[activeLevel.value]
                : sampleContent[AgeLevel.CITIZEN]}
            </div>
          </div>

          <div class="text-center mt-6">
            <a
              href="/chapters"
              class="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200"
            >
              Explore All Chapters →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
