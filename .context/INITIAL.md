## FEATURE:

Improve and standardize the UX, UI, and file structure of the `Chapters`, `Chapter`, and `Overview` routes. Refactor components, styling, search logic, and reusable models/utilities to match updated best practices, align with the landing page styling, and optimize for SEO. These changes aim to improve visual consistency, search accuracy, component modularity, and developer clarity.

## DOCUMENTATION:

- https://qwik.dev/docs/components/rendering/
- https://qwik.dev/docs/routing/overview/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
- https://tailwindcss.com/docs/installation
- `src/routes/chapters/index.tsx`
- `src/routes/chapters/[chapter]/index.tsx`
- `src/routes/overview/index.tsx`
- `src/constants/chapter.ts`
- `src/components/ChapterCard.tsx`
- `src/components/AgeLevelToggle.tsx`
- Current production site: https://constitution-explained.firebaseapp.com

## OTHER CONSIDERATIONS:

### ✅ Functional/UI Improvements

- Replace emojis in chapter cards with consistent icons (e.g., Lucide) that visually match the header/sidebar style.
- Ensure all chapter cards display the “Read Chapter” CTA in the same vertical position.
- Fix `+X` tag count logic in chapter cards (only count tags not visibly shown).
- Add "Previous Chapter" / "Next Chapter" buttons to the bottom of each chapter page.
- Make the search bar in the Chapters route sticky when scrolling.
- Update `chapter.constant.ts` with significantly more search tags:
  - Include institutions (e.g., President, Prime Minister, Parliament)
  - Include key themes or legal concepts in each chapter
  - Do **not** display tags in UI; use them strictly for search matching

### 🛠 Refactoring

- Move `Chapter` and `ChapterContent` interfaces into `src/models/chapter.model.ts`.
- Move helper methods from `constants/chapter.ts` into `src/utils/chapter.utils.ts`.
- Rename `constants/chapter.ts` to `constants/chapter.constant.ts` (update all imports).
- Create a new file: `src/constants/age-levels.constant.ts`
  - Move all age level constants and types into this file.
  - Reuse these constants in `ChapterContent` types and anywhere else level labels are duplicated.

### 🧩 Cross-Component Consistency

- Add a clear link from the `Overview` page to the `Chapters` page (CTA or nav link).
- Ensure all pages updated follow visual conventions and spacing of the updated landing page.
- Improve semantic HTML structure and `<meta>` tags for SEO performance.
- Improve page titles and headings to reflect SEO keywords (e.g., "Malta Constitution - Chapter 5 Overview for Age 15").

### 📚 Documentation Notes

- Document these new structural conventions in the repo:
  - Where to place models (`src/models`)
  - Where to define reusable constants (`src/constants`)
  - Where to write reusable utilities (`src/utils`)
  - Guidance for when to use tags for search vs. display

### ✨ SEO Considerations

- Use heading tags (h1/h2) with keywords on all routes.
- Improve `<title>` and `<meta description>` tags in route entries (for each main route).
- Ensure all content is crawlable and semantically structured.
