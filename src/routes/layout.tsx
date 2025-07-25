import { component$, Slot } from "@builder.io/qwik";
import { Header, Footer, AnalyticsNote } from "../components";
import { AgeLevelProvider, AnalyticsProvider } from "../contexts";

export default component$(() => {
  return (
    <AgeLevelProvider>
      <AnalyticsProvider>
        <div class="min-h-screen flex flex-col">
          <Header />
          <main class="flex-1 bg-gray-50">
            <Slot />
          </main>
          <Footer />
          <AnalyticsNote />
        </div>
      </AnalyticsProvider>
    </AgeLevelProvider>
  );
});
