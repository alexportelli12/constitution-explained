import { component$ } from "@builder.io/qwik";

export const CivicEducationSection = component$(() => {
  return (
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Protecting Democracy Through Education 🏛️
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            A strong democracy requires informed citizens. Understanding your
            constitution is not just a right—it's a responsibility that protects
            our republic for future generations.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-5xl mb-4">⚖️</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Rule of Law
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Understanding constitutional principles helps maintain the balance
              of power and protects individual rights against potential
              government overreach.
            </p>
          </div>

          <div class="text-center">
            <div class="text-5xl mb-4">🗳️</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Democratic Participation
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Informed citizens make better voting decisions and can more
              effectively hold their representatives accountable to
              constitutional values.
            </p>
          </div>

          <div class="text-center">
            <div class="text-5xl mb-4">🛡️</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Rights Protection
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Knowledge of constitutional rights empowers citizens to recognize
              and resist violations, preserving freedom for themselves and
              others.
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <div class="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
            <p class="text-lg text-gray-800 italic leading-relaxed">
              "The price of freedom is eternal vigilance. Constitutional
              literacy is not just academic knowledge—it's the foundation of
              civic duty and democratic resilience."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
