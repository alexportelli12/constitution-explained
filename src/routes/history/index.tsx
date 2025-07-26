import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ContentPage } from "../../components";
import { fetchHistoryContent } from "../../lib";
import type { HistoryContent } from "../../models";
import type { AgeLevel } from "../../constants";
import { useAgeLevel } from "../../contexts";

export default component$(() => {
  const { activeLevel, handleLevelChange } = useAgeLevel();
  const content = useSignal<HistoryContent | null>(null);

  const loadContent = $(async (level: AgeLevel) => {
    content.value = null; // Clear content to show loading state
    const result = await fetchHistoryContent(level);
    content.value = result;
  });

  // Reason: useVisibleTask$ is needed here to load content when component becomes visible
  // and when the activeLevel changes. useTask$ would run too early before DOM is ready.
  // This ensures content loads only when user can see the component.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    const level = track(() => activeLevel.value);
    await loadContent(level);
  });

  const pageConfig = {
    hero: {
      title: "Malta's Constitutional History",
      description:
        "Discover how Malta's Constitution evolved from British colonial rule to independence and republic. Learn about our constitutional journey at your level.",
    },
    dynamicNotePrefix: "Explain Malta's constitutional history to me like I'm",
    exploreMoreTitle: "Explore More",
    exploreMoreDescription:
      "Deepen your understanding of Malta's Constitution with our comprehensive resources",
    exploreLinks: [
      {
        href: "/overview",
        title: "Constitution Overview",
        description:
          "Get a comprehensive understanding of Malta's Constitution and its key principles",
        svgType: "document",
      },
      {
        href: "/chapters",
        title: "Browse Chapters",
        description:
          "Explore detailed explanations of each constitutional chapter at your reading level",
        svgType: "book",
      },
    ],
  };

  return (
    <ContentPage
      config={pageConfig}
      activeLevel={activeLevel}
      onLevelChange={handleLevelChange}
      content={content}
    />
  );
});

export const head: DocumentHead = {
  title: "Malta's Constitutional History - Explained",
  meta: [
    {
      name: "description",
      content:
        "Learn about Malta's journey from British colonial rule to independence and republic with age-appropriate historical explanations. Discover how Malta's Constitution evolved over time.",
    },
    {
      name: "keywords",
      content:
        "Malta constitutional history, Malta independence 1964, Malta republic 1974, British colonial rule, Malta Constitution timeline, constitutional evolution, Malta historical development, George Borg Olivier, Dom Mintoff, constitutional amendments, Malta democracy",
    },
    {
      property: "og:title",
      content:
        "Malta's Constitutional History | Constitution of Malta Explained",
    },
    {
      property: "og:description",
      content:
        "Learn about Malta's journey from British colonial rule to independence and republic with age-appropriate historical explanations.",
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
      name: "article:section",
      content: "Constitutional History",
    },
  ],
};
