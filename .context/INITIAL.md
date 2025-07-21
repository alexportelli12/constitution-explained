## FEATURE:

Create the Overview Page at route `/overview` using Qwik. This page will serve as a high-level, simplified introduction to the Maltese Constitution, presented in different reading levels.

There are four overview documents stored in the following static markdown files located in `constitution/overview/`:

- `5-year-old.md`
- `10-year-old.md`
- `15-year-old.md`
- `adult.md`

The user should be able to toggle between these different versions using a simple UI. Each version should be rendered from its respective markdown file and styled to appear clean, readable, and familiar to content creators — as if they were editing in markdown.

## DOCUMENTATION:

- Markdown Rendering in Qwik: https://qwik.dev/docs/integrations/markdown/
- QwikUI Headless Tabs (optional for toggles): https://qwikui.com/docs/headless/tabs/
- Tailwind Typography Plugin: https://tailwindcss.com/docs/typography-plugin
- Markdown to HTML Conversion (if not SSR’d): Use `marked`, `remark`, or similar

## OTHER CONSIDERATIONS:

- Create a component that fetches and renders the markdown files from `/constitution/overview/*.md`
- Apply Tailwind typography classes (e.g., `prose`) to style the content for readability
- Use placeholders for:
  - A **hero image** section at the top of the page
  - One or more **inline images** embedded within the markdown content
- Markdown structure may include headings, paragraphs, bullet lists, numbered lists and image references (use `<img src="/placeholder.jpg" />` for now)
- Ensure the content block is mobile-first, fluid, and accessible
- The toggle between versions should be clear and easily reachable
- Files should be easy to update in the future without code changes — emphasize markdown friendliness

Example markdown layout:

```md
# What is the Constitution?

![hero](/placeholder-hero.jpg)

The Constitution is a set of rules...

![illustration](/placeholder-inline.jpg)
```

- No Firebase usage — files are statically served
- Fallback UI should show if a file fails to load or is malformed
