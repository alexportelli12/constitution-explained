## FEATURE:

Create the Browse Articles Page at route `/articles` using Qwik. This page will allow users to browse the Constitution by chapter and article, switching between simplified versions written for different age levels.

Markdown content is located in:
`public/constitution/chapters/{age-level}/{chapter}.md`

### Age levels (folder names):

- `5-year-old`
- `10-year-old`
- `15-year-old`
- `citizen`

### Chapter filenames:

- Example: `1.md`, `10A.md`, `11.md`, etc.

---

## DOCUMENTATION:

- Qwik Routing: https://qwik.dev/docs/routing/
- Tailwind Grid and Typography: https://tailwindcss.com/docs
- QwikUI Headless Accordion (for chapter/article list): https://qwikui.com/docs/headless/accordion/
- Markdown rendering: https://marked.js.org/ (already an existing component for rendering markdown - MarkdownRenderer.tsx)

---

## OTHER CONSIDERATIONS:

- Use an `AgeLevelToggle` component to allow switching between age versions
- Create a constant object in `src/constants/chapters.ts` that contains:
  - `chapter`: string or number
  - `title`: string
  - `description`: string
  - `tags`: array of keywords (strings)

This constant will be used for filtering/searching the content by keyword and title without having to parse the Markdown text for each search.

- Fetch the appropriate markdown based on selected age level and chapter number
- When viewing an individual chapter, display:

  - Chapter title
  - Markdown content
  - Searchable tags
  - A static note:
    > “Want to read the full Constitution? Visit [legislation.mt](https://legislation.mt) to view or download the complete PDF.”

- Use QwikUI accordion or collapsible structure for chapters/articles list
- Content should load quickly and display clearly on all screen sizes
- Graceful fallback if markdown is missing or fetch fails
- Preload titles and descriptions from the constant to make search snappy

---

## Example Markdown File Path:

`public/constitution/chapters/10-year-old/1.md`

---

## Search UX Goals:

- Minimalistic input field
- Filters by tags, titles, and chapter numbers
- Responsive and accessible
- No client-heavy search libraries

---

## Placeholder Example for Constant:

```ts
export const CHAPTERS = [
  {
    chapter: "1",
    title: "The Republic of Malta",
    description:
      "Describes Malta as a democratic republic and defines national values.",
    tags: ["democracy", "republic", "sovereignty"],
  },
  {
    chapter: "10A",
    title: "The Judiciary",
    description:
      "Outlines the structure and independence of Malta’s judiciary.",
    tags: ["courts", "judges", "justice", "law"],
  },
];
```

---

## Summary:

Build a mobile-first article/chapter browsing page using:

- Static markdown per age level
- Constant metadata list for indexing
- Simple but effective search
- AgeLevelToggle for content switching
- A clear and respectful tone, linking to official documents for full legal access
