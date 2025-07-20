## FEATURE:

Create the Home / Landing Page at the root route (`/`) using Qwik.

The page should include:

- A short welcome and introduction to the website's mission
- A relevant quote on democracy or civic awareness
- A brief explanation that the purpose of the site is to make the Maltese Constitution easier to understand by removing legal jargon
- A simple call to action (e.g., a button that links to `/overview` or `/articles`)

The design must be clean, mobile-first, and styled with Tailwind CSS. Use QwikUI headless components where applicable (e.g., headings, buttons).

## DOCUMENTATION:

- Qwik Routing: https://qwik.dev/docs/routing/
- Tailwind CSS Typography: https://tailwindcss.com/docs/typography-plugin
- QwikUI Headless Elements: https://qwikui.com/docs/headless/introduction/
- Sample quotes: https://www.goodreads.com/quotes/tag/democracy

## OTHER CONSIDERATIONS:

- Use `component$()` with functional composition (keep logic and layout clean)
- Include visually distinct sections (quote, intro text, CTA)
- Hero content should scale well on all screen sizes
- Do not hardcode page height — layout should be fluid
- Typography should emphasize readability and civic tone
- If using a quote, prefer something like:
  > “The most important political office is that of the private citizen.” — Louis Brandeis
- Avoid clutter or overdesign — clarity and calmness are priorities
