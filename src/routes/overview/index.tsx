import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ContentPage } from "../../components";
import { fetchOverviewContent } from "../../lib";
import type { OverviewContent } from "../../models";
import type { AgeLevel } from "../../constants";
import { useAgeLevel } from "../../contexts";

export default component$(() => {
  const { activeLevel, handleLevelChange } = useAgeLevel();
  const content = useSignal<OverviewContent | null>(null);

  const loadContent = $(async (level: AgeLevel) => {
    content.value = null; // Clear content to show loading state
    const result = await fetchOverviewContent(level);
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
      title: "Understanding Malta's Constitution",
      description:
        "Learn about Malta's Constitution at your level. Choose an explanation that works for you.",
    },
    dynamicNotePrefix: "Explain the Constitution of Malta to me like I'm",
    exploreMoreTitle: "Explore More",
    exploreMoreDescription:
      "Continue your constitutional journey with our comprehensive resources",
    exploreLinks: [
      {
        href: "/history",
        title: "Constitutional History",
        description:
          "Discover Malta's journey from British colonial rule to independence and republic",
        svgType: "clock",
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
  title: "Constitution Overview - Constitution of Malta Explained",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive overview of Malta's Constitution with age-appropriate explanations for all ages. Learn about Malta's fundamental law, democratic principles, and constitutional foundations from 5 year old to citizen level.",
    },
    {
      name: "keywords",
      content:
        "Constitution of Malta overview, constitutional law, civic education, democracy, Malta government, constitutional principles, fundamental law, democratic governance, constitutional literacy, Malta legal framework, rule of law, constitutional democracy, civic learning",
    },
    {
      property: "og:title",
      content: "Constitution Overview - Constitution of Malta Explained",
    },
    {
      property: "og:description",
      content:
        "Comprehensive overview of Malta's Constitution with age-appropriate explanations for all ages.",
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
      content: "Constitutional Education",
    },
  ],
};
