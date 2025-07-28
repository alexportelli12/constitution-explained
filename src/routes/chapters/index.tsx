import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ContentPage, ChapterBrowser } from "../../components";

export default component$(() => {
  const pageConfig = {
    hero: {
      title: "Browse Constitution Chapters",
      description:
        "Explore all chapters of Malta's Constitution. Each chapter is available with age-appropriate explanations to make constitutional learning accessible to everyone.",
    },
    dynamicNotePrefix: "",
    exploreMoreTitle: "Learn More About Malta's Constitution",
    exploreMoreDescription:
      "Gain deeper insights into Malta's constitutional framework and history",
    exploreLinks: [
      {
        href: "/overview",
        title: "Constitution Overview",
        description:
          "Get a comprehensive understanding of Malta's Constitution and its key principles",
        svgType: "document",
      },
      {
        href: "/history",
        title: "Constitutional History",
        description:
          "Discover Malta's journey from British colonial rule to independence and republic",
        svgType: "clock",
      },
    ],
    showAgeLevelToggle: false,
    showOfficialLink: false,
    showReadingTip: false,
    maxWidth: "7xl" as const,
  };

  return (
    <ContentPage config={pageConfig}>
      <ChapterBrowser />
    </ContentPage>
  );
});

export const head: DocumentHead = {
  title: "Browse Constitution of Malta Chapters",
  meta: [
    {
      name: "description",
      content:
        "Explore all 12 chapters of Malta's Constitution with age-appropriate explanations. From fundamental rights and freedoms to government structure, judiciary, and public service. Constitutional education made accessible for all ages.",
    },
    {
      name: "keywords",
      content:
        "Constitution of Malta chapters, constitutional law, civic education, democracy, government structure, fundamental rights, freedoms, judiciary, parliament, president, executive power, public service, local councils, citizenship, Malta law, constitutional democracy, rule of law, civil liberties, human rights, legal framework, Malta government",
    },
    {
      property: "og:title",
      content: "Browse Constitution Chapters - Constitution of Malta Explained",
    },
    {
      property: "og:description",
      content:
        "Explore all 12 chapters of Malta's Constitution with age-appropriate explanations for constitutional education.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content: "https://constitutionofmalta.com/images/valletta-skyline.webp",
    },
  ],
};
