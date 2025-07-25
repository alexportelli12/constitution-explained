import { component$ } from "@builder.io/qwik";

export const WhyConstitutionSection = component$(() => {
  return (
    <section class="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Why Should I Learn About the Constitution? 🇲🇹
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
            Despite its small size, Malta's path to self-governance is
            remarkable. Our constitution protects fundamental rights and
            empowers every citizen to participate in democracy.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="text-center">
            <div class="text-5xl mb-4">🛡️</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Protect Your Rights
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Freedom of speech, right to life, equal protection—knowing your
              constitutional rights empowers you to recognize when they're not
              being upheld.
            </p>
          </div>

          <div class="text-center">
            <div class="text-5xl mb-4">🏛️</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Understand Your Government
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Malta's institutions—the President, Parliament, Courts—exist
              because of this foundational document. Deepen your understanding
              of democratic systems.
            </p>
          </div>

          <div class="text-center">
            <div class="text-5xl mb-4">🗳️</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Participate Better
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Constitutional knowledge fosters better civic participation and
              helps you make more informed decisions as a citizen.
            </p>
          </div>
        </div>

        <div class="text-center">
          <div class="bg-white rounded-xl p-8 max-w-3xl mx-auto shadow-sm">
            <p class="text-lg text-gray-800 leading-relaxed">
              <strong class="text-primary-500">Every citizen deserves</strong>{" "}
              to understand the document that shapes their daily life, protects
              their freedoms, and defines their relationship with government.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
