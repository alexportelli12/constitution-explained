import { component$, Slot } from "@builder.io/qwik";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default component$(() => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1 bg-gray-50">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
