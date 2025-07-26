# Browse Articles & Chapter Pages PRP — Constitution Explained (Qwik + Static Markdown)

## Purpose

Complete implementation of the Browse Articles Page at `/articles` route and individual Chapter Pages at `/articles/[chapter]` using Qwik. This PRP provides comprehensive context for AI agents to implement a searchable chapter browser with card-based layout and dedicated chapter viewing pages in a single pass.

## Core Principles

1. **Context is King** – all existing patterns and code references included
2. **Validation Loops** – real validation commands provided
3. **Pattern Consistency** – matches existing codebase conventions from overview route
4. **Progressive Success** – build constants → utils → components → validation
5. **One-Pass Mindset** – complete feature implementation with error handling

---

## 🥅 Goal

Create a comprehensive Browse Articles Page with card-based chapter display and dedicated Chapter Pages that allow users to browse and read the Constitution with age-level explanations dynamically.

## 💡 Why

- Enable discovery of constitutional chapters through visual card interface
- Provide dedicated reading experience for each chapter
- Maintain consistent UX with overview page patterns
- Leverage existing static markdown structure for performance
- Clean up existing markdown files to remove embedded images

## 📐 What

Transform the placeholder `/articles` route and create new chapter routes with:

- Constants file for chapter metadata (titles, descriptions, icons, hero images)
- Card-based chapter browser with visual chapter representation
- Individual chapter pages at `/articles/[chapter]` with hero images and content
- Search/filter functionality using JavaScript (no external libraries)
- Age-level toggle integration on chapter pages matching overview page UX
- Image cleanup task for all existing chapter markdown files
- Navigation between browse and chapter pages

### ✅ Success Criteria

- [ ] Chapter cards display with title, icon, description, and article count
- [ ] Search filters by title, description, and tags
- [ ] Card click navigation to individual chapter pages works
- [ ] Chapter pages have hero images and age-level toggle
- [ ] Individual chapters fetch and render with age-level switching
- [ ] All chapter markdown files cleaned of embedded images
- [ ] Fallback handling for missing chapters or fetch errors
- [ ] Mobile-first responsive design matches site patterns
- [ ] URL parameter handling for deep linking to specific levels
- [ ] Performance: chapter browse loads instantly, content on chapter pages

---

## 📚 All Needed Context

### 📄 Documentation & References

```yaml
- file: src/routes/articles/index.tsx
  why: Current placeholder route that needs full implementation

- file: src/routes/overview/index.tsx
  why: Perfect reference for age-level toggle, URL param handling, useSignal patterns

- file: src/components/AgeLevelToggle.tsx
  why: Existing component for age-level switching (reuse exactly)

- file: src/components/MarkdownRenderer.tsx
  why: Existing markdown renderer with error handling (reuse exactly)

- file: src/lib/fetchMarkdown.ts
  why: Pattern for static content fetching (extend for chapters)

- file: public/constitution/chapters/10-year-old/1.md
  why: Example chapter structure and formatting

- file: CLAUDE.md
  why: Code conventions, anti-patterns (no setTimeout, no inline styles)

- url: https://qwik.dev/docs/routing/
  why: URL parameter handling and navigation patterns

- url: https://qwikui.com/docs/headless/accordion/
  why: Accordion component patterns (or build custom if not available)
```

---

### 🗂️ Current Codebase Tree (relevant parts)

```bash
src/
├── components/
│   ├── AgeLevelToggle.tsx      # EXISTING: Reuse for chapter pages
│   ├── MarkdownRenderer.tsx    # EXISTING: Reuse with error handling
│   ├── HeroImage.tsx          # EXISTING: Reuse for chapter hero images
│   └── index.ts               # EXISTING: Add new components to exports
├── lib/
│   └── fetchMarkdown.ts       # EXISTING: Extend for chapter fetching
├── routes/
│   ├── articles/
│   │   └── index.tsx         # EXISTING: Replace with card browser
│   │   └── [chapter]/        # NEW: Individual chapter routes
│   │       └── index.tsx     # NEW: Chapter page with hero + content
│   └── overview/
│       └── index.tsx         # EXISTING: Pattern reference for implementation
public/
├── images/                   # EXISTING: Hero images for chapters
└── constitution/chapters/
    ├── 5-year-old/
    │   ├── 1.md, 2.md, ..., 11.md  # NEEDS CLEANUP: Remove embedded images
    ├── 10-year-old/
    │   ├── 1.md, 2.md, ..., 11.md  # NEEDS CLEANUP: Remove embedded images
    ├── 15-year-old/
    │   ├── 1.md, 2.md, ..., 11.md  # NEEDS CLEANUP: Remove embedded images
    ├── citizen/
    │   ├── 1.md, 2.md, ..., 11.md  # NEEDS CLEANUP: Remove embedded images
    └── 1.md, 2.md, ..., 11.md      # Root: NEEDS CLEANUP
```

---

### 🔭 Desired Codebase Tree After Feature

```bash
src/
├── constants/
│   └── chapters.ts            # NEW: Chapter metadata with icons and hero images
├── components/
│   ├── ChapterBrowser.tsx     # NEW: Card-based chapter browser with search
│   ├── ChapterCard.tsx        # NEW: Individual chapter card component
│   └── ChapterPage.tsx        # NEW: Chapter content page with hero + toggle
├── routes/articles/
│   ├── index.tsx             # UPDATED: Card-based chapter browser
│   └── [chapter]/
│       └── index.tsx         # NEW: Individual chapter page route
├── lib/
│   └── fetchMarkdown.ts      # UPDATED: Add fetchChapterContent function
public/constitution/chapters/
└── **/*.md                   # CLEANED: All image references removed
```

---

### ⚠️ Known Gotchas

```ts
// GOTCHA: Chapter files use mixed naming: "1.md", "10a.md" (not "10A.md")
// GOTCHA: Age level folders are "5-year-old", "10-year-old", "15-year-old", "citizen"
// GOTCHA: Must handle missing chapters gracefully (some may not exist for all levels)
// GOTCHA: Search should be case-insensitive and include partial matches
// GOTCHA: Use exact same URL parameter pattern as overview route: ?level=citizen
// GOTCHA: Qwik signals require proper reactivity - use useVisibleTask$ for side effects
// GOTCHA: Never use setTimeout - use proper navigation and event handling
// GOTCHA: Follow existing AgeLevelToggle interface exactly
// GOTCHA: Static asset paths are relative to public: "/constitution/chapters/..."
```

---

## 🛠️ Implementation Blueprint

### 📦 Component Architecture

```ts
// Constants provide instant metadata for cards and pages
export const CHAPTERS = [
  {
    chapter: "1",
    title: "The Republic of Malta",
    description: "Malta as a democratic republic and national values",
    tags: ["democracy", "republic", "sovereignty", "neutrality"],
    icon: "🏛️", // Emoji icon for card display
    heroImage: "/images/malta-island-constitution.webp",
    articleCount: 6, // Number of sections in the chapter
  },
  // ... all 11 chapters with complete metadata
];

// ChapterBrowser: Grid of chapter cards with search functionality
// ChapterCard: Individual card with icon, title, description, article count
// ChapterPage: Full chapter reader with hero image and age toggle
// MarkdownRenderer: Reuse existing component for content display
```

---

### 📋 Task List (Ordered Implementation)

```yaml
Task 1: CLEANUP - Clean all chapter markdown files
  - Search for all image references in public/constitution/chapters/**/*.md
  - Remove ![image](...) patterns and <img> tags
  - Remove legislation.mt link blocks (📚 You can read the full constitution...)
  - Keep only text content in markdown files
  - Preserve existing heading structure and formatting

Task 2: CREATE src/constants/chapters.ts
  - Define complete CHAPTERS array with all 11 chapters
  - Include titles, descriptions, tags, icons, heroImage paths, articleCount
  - Export type definitions for TypeScript

Task 3: UPDATE src/lib/fetchMarkdown.ts
  - Add fetchChapterContent function following existing pattern
  - Handle age-level path construction: "/constitution/chapters/{level}/{chapter}.md"
  - Include proper error handling and return types

Task 4: CREATE src/components/ChapterCard.tsx
  - Card component with icon, title, description, article count
  - Click handler for navigation to chapter page
  - Responsive design matching site patterns

Task 5: CREATE src/components/ChapterBrowser.tsx
  - Search input with filter logic (title, description, tags)
  - Grid layout of ChapterCard components
  - No age toggle (only needed on individual chapter pages)

Task 6: CREATE src/routes/articles/[chapter]/index.tsx
  - Dynamic route for individual chapters
  - HeroImage component integration
  - AgeLevelToggle and MarkdownRenderer integration
  - URL parameter handling for age level
  - Navigation back to articles browse

Task 7: UPDATE src/routes/articles/index.tsx
  - Replace placeholder with ChapterBrowser component
  - Proper DocumentHead setup

Task 8: UPDATE src/components/index.ts
  - Export new components following existing pattern

Task 9: VALIDATION
  - Test card navigation to chapter pages
  - Test search functionality on browse page
  - Verify age-level switching on chapter pages
  - Check error handling for missing chapters
  - Mobile responsiveness check
```

---

### 🔁 Pseudocode (Key Functions)

```ts
// fetchChapterContent function
const fetchChapterContent = async (chapter: string, level: string) => {
  const response = await fetch(`/constitution/chapters/${level}/${chapter}.md`);
  if (!response.ok) {
    return {
      content: "",
      error: `Chapter ${chapter} not available for ${level} level`,
    };
  }
  const content = await response.text();
  return { content, level };
};

// Search filter logic for chapter browser
const filteredChapters = CHAPTERS.filter((chapter) => {
  const searchTerm = searchInput.value.toLowerCase();
  return (
    chapter.title.toLowerCase().includes(searchTerm) ||
    chapter.description.toLowerCase().includes(searchTerm) ||
    chapter.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
    chapter.chapter.includes(searchTerm)
  );
});

// Card click navigation
const handleCardClick = $((chapterId: string) => {
  navigate(`/articles/${chapterId}`);
});

// Chapter page initialization
const handleChapterPage = $(async (chapterId: string, level: string) => {
  const chapterMeta = CHAPTERS.find((ch) => ch.chapter === chapterId);
  const content = await fetchChapterContent(chapterId, level);
  return { meta: chapterMeta, content };
});

// Content cleanup regex patterns
const cleanupPatterns = [
  /!\[.*?\]\(.*?\)/g, // ![alt](src) markdown images
  /<img[^>]*>/gi, // <img> HTML tags
  /\[.*?\]:\s*.*?\.(png|jpg|jpeg|gif|svg)/gi, // Reference-style links to images
  />\s*📚.*?legislation\.mt.*?\.$/gm, // legislation.mt link blocks
];
```

---

## 🔌 Integration Points

```yaml
EXISTING COMPONENTS:
  - AgeLevelToggle: Use on chapter pages only (not browse page)
  - MarkdownRenderer: Use for chapter content display
  - HeroImage: Use for chapter page headers

NAVIGATION:
  - Browse page: /articles (card grid)
  - Chapter pages: /articles/[chapter] (individual reading)
  - Back navigation from chapter to browse

STATIC CONTENT:
  - Chapter markdown: /constitution/chapters/{level}/{chapter}.md
  - Hero images: /images/*.webp (defined in constants)
  - Fallback to citizen level if specific level missing

URL HANDLING:
  - Browse page: /articles?search=term (optional search persistence)
  - Chapter pages: /articles/1?level=citizen (level parameter)
  - Dynamic routing: [chapter] parameter for chapter ID

RESPONSIVE DESIGN:
  - Browse page: Grid of cards (1 col mobile, 2-3 cols desktop)
  - Chapter pages: Single column with hero and content
  - Search input responsive on browse page
```

---

## 🎨 UI/UX Patterns to Follow

```ts
// Browse Page - Search Bar (similar to sticky controls)
<div class="mb-6 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-gray-100">
  <input
    type="search"
    placeholder="Search chapters by title, description, or topics..."
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
  />
</div>

// Chapter Card Pattern
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
  <div class="flex items-start space-x-4">
    <div class="text-4xl">{chapter.icon}</div>
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{chapter.title}</h3>
      <p class="text-gray-600 text-sm mb-3">{chapter.description}</p>
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-500">{chapter.articleCount} articles</span>
        <span class="text-primary-600 text-sm">Read Chapter →</span>
      </div>
    </div>
  </div>
</div>

// Chapter Page - Hero + Toggle (from overview route pattern)
<HeroImage src={chapterMeta.heroImage} alt={chapterMeta.title} />
<div class="sticky top-20 z-40 py-4">
  <div class="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 p-3">
    <AgeLevelToggle activeLevel={activeLevel} onLevelChange={handleLevelChange} />
  </div>
</div>

// Back Navigation
<div class="mb-6">
  <button class="flex items-center text-primary-600 hover:text-primary-800">
    ← Back to Articles
  </button>
</div>

// Dynamic note for chapters
<div class="mb-4 p-3 bg-red-50 border-l-4 border-primary-500 rounded-r-lg">
  <p class="text-sm text-primary-700">
    Reading Chapter {chapterMeta.chapter}: <strong>{chapterMeta.title}</strong> at
    <strong>{activeLevel.value}</strong> level
  </p>
</div>

// Official legislation link (moved from markdown to page template)
<div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
  <p class="text-sm text-gray-700">
    📚 <strong>Want the complete text?</strong> Visit
    <a href="https://legislation.mt/eli/const/eng" target="_blank" rel="noopener noreferrer"
       class="text-primary-600 hover:text-primary-800 underline">
      legislation.mt
    </a> to read the full Constitution document.
  </p>
</div>
```

---

## ✅ Validation Loop

### Level 1: Development Testing

```bash
npm start
# Navigate to /articles
# Test search functionality
# Test age level switching
# Test chapter expansion/collapse
# Test error scenarios (disconnect network, invalid URLs)
```

### Level 2: Build Validation

```bash
npm run build
npm run build.types
npm run lint
npm run fmt.check
npm run preview
```

### Level 3: Manual Feature Testing

```bash
# URL Navigation Tests:
# /articles -> should show card grid with search
# /articles?search=democracy -> should filter cards by search term
# /articles/1 -> should show Chapter 1 page with citizen level
# /articles/1?level=5-year-old -> should show Chapter 1 at 5-year-old level

# Search Tests on Browse Page:
# "democracy" -> should show chapters 1, 2 cards
# "courts" -> should show chapter 10A card
# "1" -> should show chapter 1 card
# "invalid" -> should show "no results" state

# Card Navigation Tests:
# Click any chapter card -> should navigate to /articles/[chapter]
# Back button on chapter page -> should return to /articles

# Chapter Page Tests:
# Age level toggle -> should switch content without losing chapter
# Invalid chapter ID -> should show 404 or error state
# Missing chapter for level -> should show appropriate error

# Content Cleanup Validation:
# All chapter markdown files should have no ![image]() references
# All chapter markdown files should have no <img> tags
# All chapter markdown files should have no legislation.mt link blocks
# Content should display properly without broken image references
# Legislation link should appear on chapter pages (not in markdown)
```

---

## 📋 Final Validation Checklist

- [ ] All chapter markdown files cleaned of images and legislation.mt links
- [ ] Chapter cards display with title, icon, description, and article count
- [ ] Card click navigation to individual chapter pages works correctly
- [ ] Search filters all metadata fields correctly on browse page
- [ ] Chapter pages display hero images from constants (not markdown)
- [ ] Age level switching works properly on chapter pages
- [ ] Back navigation from chapter pages to browse works
- [ ] URL parameters sync properly with component state
- [ ] Missing chapters show helpful error messages
- [ ] Mobile layout works for both card grid and chapter pages
- [ ] All validation commands pass: build, types, lint, format
- [ ] Performance: browse page loads instantly, chapter content on-demand
- [ ] Accessibility: keyboard navigation works for cards and controls
- [ ] Official legislation.mt link present on chapter pages

---

## 🚫 Anti-Patterns to Avoid

- ❌ Using setTimeout for state coordination (per CLAUDE.md)
- ❌ Inline styles instead of Tailwind classes (per CLAUDE.md)
- ❌ Creating new components without adding to index.ts exports
- ❌ Hardcoding chapter list instead of using constants
- ❌ Loading all chapter content upfront (should be on-demand for chapter pages)
- ❌ Not handling URL parameters for deep linking
- ❌ Assuming all chapters exist for all age levels
- ❌ Heavy search libraries when simple JavaScript filtering suffices
- ❌ Breaking responsive design patterns established in overview route
- ❌ Leaving embedded images or legislation.mt links in markdown files after cleanup
- ❌ Using accordion/collapsible patterns when card navigation is specified
- ❌ Adding age toggle to browse page (only belongs on chapter pages)

---

## 🔥 Confidence Rating: 9/10

This PRP provides comprehensive context from actual codebase analysis, follows established patterns from the overview route, includes proper error handling, and provides step-by-step validation including image cleanup tasks. An AI agent should be able to implement this complete feature (browse + chapter pages + cleanup) successfully in a single pass with minimal clarification needed.

The implementation is well-scoped with clear separation between browse (cards) and chapter (reading) experiences, matching modern content discovery patterns.
