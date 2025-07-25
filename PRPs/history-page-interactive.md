# Interactive History Page PRP — Constitution Explained (Qwik + Static Markdown)

## Purpose

Create an interactive "History" page that traces Malta's journey from colonial rule to republic using age-level toggles, reusing existing patterns from overview and chapter pages, with timeline-style visual presentation.

## Core Principles

1. **Context is King** – leverage existing AgeLevelToggle, fetchMarkdown patterns, and route structures
2. **Validation Loops** – enable real validation with build/preview commands
3. **Pattern Consistency** – mirror `/overview` and `/chapters/[chapter]` implementations exactly
4. **Progressive Success** – route → content fetching → rendering → styling
5. **One-Pass Mindset** – comprehensive implementation following established codebase patterns

---

## 🥅 Goal

Create an interactive `/history` route that educates users about Malta's constitutional evolution from British colonial rule to independence (1964) to republic (1974), with age-appropriate explanations and timeline-style visual presentation.

## 💡 Why

- Complete the constitutional education experience by explaining the historical context
- Provide age-appropriate historical content matching the app's educational mission
- Reuse existing architectural patterns for consistency and maintainability
- Enable users to understand how Malta's constitution evolved over time

## 📐 What

Create a new `/history` route that:

- Loads markdown content from `public/history/` directory per age level
- Uses existing `AgeLevelToggle` component for content switching
- Displays content in timeline/card format similar to existing pages
- Handles loading states and error fallbacks consistently
- Includes proper SEO meta tags and responsive design

### ✅ Success Criteria

- [ ] `/history` route renders correctly with age-level content switching
- [ ] Markdown content loaded from `public/history/{level}.md` files
- [ ] `AgeLevelToggle` works identically to overview/chapter pages
- [ ] Timeline-style visual presentation with sections/cards
- [ ] Loading states and error handling match existing patterns
- [ ] Responsive design works on all device sizes
- [ ] SEO meta tags configured appropriately
- [ ] Build passes: `npm run build`, `npm run build.types`, `npm run lint`

---

## 📚 All Needed Context

### 📄 Documentation & References

```yaml
- file: src/routes/overview/index.tsx
  why: Pattern for age-level content loading and rendering with AgeLevelToggle

- file: src/routes/chapters/[chapter]/index.tsx
  why: Advanced patterns for content loading, error handling, and navigation

- file: src/components/AgeLevelToggle.tsx
  why: Reusable toggle component - use exactly as implemented

- file: src/lib/fetchMarkdown.ts
  why: Functions for fetching markdown content - mirror fetchOverviewContent pattern

- file: src/contexts/AgeLevelContext.tsx (via index.ts)
  why: Context hook useAgeLevel() for managing active level state

- file: src/constants/age-levels.constant.ts
  why: AgeLevel enum and constants for type safety

- file: public/history/source.md
  why: Raw historical content that needs to be adapted for age levels

- url: https://qwik.dev/docs/components/overview/
  why: Qwik component$() and useSignal() patterns
```

---

### 🗂️ Current Codebase Tree (relevant part)

```bash
src/
├── lib/
│   └── fetchMarkdown.ts          # fetchOverviewContent, fetchChapterContent patterns
├── components/
│   ├── AgeLevelToggle.tsx        # Reusable toggle component
│   ├── MarkdownRenderer.tsx      # Content rendering
│   ├── HeroImage.tsx            # Visual components
│   └── index.ts                 # Component exports
├── routes/
│   ├── overview/index.tsx       # Pattern to mirror for history page
│   └── chapters/[chapter]/index.tsx  # Advanced patterns reference
├── contexts/
│   └── AgeLevelContext.tsx      # useAgeLevel() hook
├── constants/
│   └── age-levels.constant.ts   # AgeLevel types
└── utils/
    └── index.ts                 # getLevelDescription helper

public/
├── constitution/
│   └── overview/                # Existing content structure
└── history/
    └── source.md               # Raw content to adapt
```

---

### 🔭 Desired Codebase Tree After Feature

```bash
src/routes/
├── history/
│   └── index.tsx               # NEW: History page component

public/history/
├── 5-year-old.md              # NEW: Age 5 historical content
├── 10-year-old.md             # NEW: Age 10 historical content
├── 15-year-old.md             # NEW: Age 15 historical content
├── citizen.md                 # NEW: Adult-level historical content
└── source.md                  # EXISTING: Raw research content
```

---

### ⚠️ Known Gotchas

```ts
// GOTCHA: Mirror fetchOverviewContent pattern exactly in fetchMarkdown.ts
const response = await fetch(`/history/${level}.md`);

// GOTCHA: Use useAgeLevel() context hook, don't create new state
const { activeLevel, handleLevelChange } = useAgeLevel();

// GOTCHA: Follow useVisibleTask$ pattern from overview page exactly
// eslint-disable-next-line qwik/no-use-visible-task
useVisibleTask$(async ({ track }) => {
  const level = track(() => activeLevel.value);
  await loadContent(level);
});

// GOTCHA: Use clsx for conditional CSS classes like existing components
import { clsx } from "clsx";

// GOTCHA: Error handling should return content with error field like fetchChapterContent
return { level, content: "", error: "Failed to load history content." };

// GOTCHA: Follow existing DocumentHead pattern for SEO meta tags exactly
```

---

## 🛠️ Implementation Blueprint

### 📦 Component or Utility Additions

```ts
// ADD to src/lib/fetchMarkdown.ts
export const fetchHistoryContent = async (
  level: AgeLevel,
): Promise<HistoryContent> => {
  try {
    const response = await fetch(`/history/${level}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status}`);
    }
    const content = await response.text();
    return { level, content };
  } catch (error) {
    return {
      level,
      content: "",
      error: `Failed to load ${level} history content. Please try again later.`,
    };
  }
};

// ADD to src/models/index.ts (if needed)
export interface HistoryContent {
  level: AgeLevel;
  content: string;
  error?: string;
}
```

---

### 📋 Task List (Ordered)

```yaml
Task 1: Create fetchHistoryContent function
  - ADD fetchHistoryContent to src/lib/fetchMarkdown.ts
  - Mirror fetchOverviewContent pattern exactly
  - Include proper error handling and typing

Task 2: Create history route component
  - CREATE src/routes/history/index.tsx
  - Copy structure from src/routes/overview/index.tsx
  - Adapt hero section, content loading, and meta tags
  - Use timeline-style layout for content presentation

Task 3: Create age-level markdown content files
  - CREATE public/history/5-year-old.md
  - CREATE public/history/10-year-old.md
  - CREATE public/history/15-year-old.md
  - CREATE public/history/citizen.md
  - Adapt content from source.md for each age level

Task 4: Add timeline-style visual presentation
  - Style content as cards/sections with dates
  - Use existing Tailwind patterns from other pages
  - Ensure responsive design matches app standards

Task 5: Test and validate implementation
  - Test all age levels load correctly
  - Verify error states work properly
  - Run build/lint/type checks
  - Test responsive design
```

---

### 🔁 Pseudocode (Per Task)

```ts
// Task 1: fetchHistoryContent function
const fetchHistoryContent = async (level: AgeLevel) => {
  const response = await fetch(`/history/${level}.md`);
  return response.ok ? { level, content: await response.text() }
                     : { level, content: '', error: 'Load failed' };
};

// Task 2: History page component structure
export default component$(() => {
  const { activeLevel, handleLevelChange } = useAgeLevel();
  const content = useSignal<HistoryContent | null>(null);

  const loadContent = $(async (level: AgeLevel) => {
    content.value = null;
    const result = await fetchHistoryContent(level);
    content.value = result;
  });

  useVisibleTask$(async ({ track }) => {
    const level = track(() => activeLevel.value);
    await loadContent(level);
  });

  return (
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      {/* AgeLevelToggle */}
      {/* Timeline Content */}
      {/* Footer Components */}
    </div>
  );
});

// Task 3: Content structure per markdown file
## When Malta Was Ruled by Others
Content for this age level...

## The Fight for Independence
Content for this age level...

## A New Constitution
Content for this age level...

## How We Became a Republic
Content for this age level...
```

---

## 🔌 Integration Points

```yaml
STATIC CONTENT:
  - Markdown files in public/history/ directory
  - Fetched using same pattern as overview content
  - Static hosting compatible (no server-side processing)

UI COMPONENTS:
  - AgeLevelToggle.tsx - reused exactly as-is
  - MarkdownRenderer.tsx - handles content display and errors
  - HeroImage.tsx - if hero image needed for timeline
  - ReadingLevelsTip.tsx - educational tips component

CONTEXT:
  - useAgeLevel() hook manages active level state
  - Shared state across entire app consistently

ROUTING:
  - /history route matches QwikCity file-based routing
  - No dynamic parameters needed (unlike /chapters/[chapter])

STYLING:
  - Timeline cards using existing Tailwind utility classes
  - Responsive design matching overview and chapter pages
  - Consistent spacing, typography, and color scheme
```

---

## ✅ Validation Loop

### Level 1: Manual and Visual Checks

```bash
npm start
# Navigate to /history
# Test each age level toggle
# Verify timeline visual presentation
# Check responsive design
# Test error states (rename .md file temporarily)
```

### Level 2: Build and Type Checks

```bash
npm run build
npm run build.types
npm run lint
npm run fmt.check
```

### Level 3: Content Validation

```bash
# Check each markdown file renders properly
# Verify age-appropriate content tone
# Ensure historical accuracy maintained
# Test loading states and error fallbacks
```

---

## 📋 Final Validation Checklist

- [ ] History page loads at /history route correctly
- [ ] All 4 age levels load unique content successfully
- [ ] AgeLevelToggle works identically to other pages
- [ ] Timeline-style visual presentation implemented
- [ ] Loading states show while content fetches
- [ ] Error states display when content fails to load
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] SEO meta tags configured appropriately
- [ ] Build passes: `npm run build && npm run build.types && npm run lint`
- [ ] Code follows CLAUDE.md conventions exactly
- [ ] No setTimeout used - proper event handling only
- [ ] TypeScript strict mode compliance

---

## 🚫 Anti-Patterns to Avoid

- ❌ Creating new age level state - use existing useAgeLevel() context
- ❌ Hardcoding content in components - must load from markdown files
- ❌ Using setTimeout for state coordination - use proper event handling
- ❌ Deviating from existing fetchMarkdown patterns
- ❌ Creating new markdown parsing logic - use MarkdownRenderer
- ❌ Inline styles - use Tailwind classes and custom CSS classes only
- ❌ Using 'any' types - maintain strict TypeScript typing
- ❌ Breaking responsive design - follow mobile-first approach

---

## 🎯 Existing Code Patterns to Mirror

### AgeLevelToggle Integration (from overview/index.tsx:69-77)

```tsx
<div class="sticky top-20 z-40 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2">
  <div class="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 px-3 py-2">
    <AgeLevelToggle
      activeLevel={activeLevel}
      onLevelChange={handleLevelChange}
    />
  </div>
</div>
```

### Content Loading Pattern (from overview/index.tsx:20-33)

```tsx
const loadContent = $(async (level: AgeLevel) => {
  content.value = null; // Clear content to show loading state
  const result = await fetchOverviewContent(level);
  content.value = result;
});

useVisibleTask$(async ({ track }) => {
  const level = track(() => activeLevel.value);
  await loadContent(level);
});
```

### Error/Loading Rendering (from overview/index.tsx:88-97)

```tsx
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  {!content.value ? (
    <MarkdownRenderer content="" />
  ) : (
    <MarkdownRenderer
      content={content.value.content}
      error={content.value.error}
    />
  )}
</div>
```

### DocumentHead Pattern (from chapters/[chapter]/index.tsx:203-243)

```tsx
export const head: DocumentHead = {
  title: "Malta's Constitutional History | Constitution of Malta Explained",
  meta: [
    {
      name: "description",
      content:
        "Learn about Malta's journey from British colonial rule to independence and republic with age-appropriate historical explanations.",
    },
    // ... additional meta tags following existing pattern
  ],
};
```

---

## 🧠 Confidence Rating

**9/10** - High confidence based on:

✅ **Established Patterns**: All major patterns (routing, content loading, AgeLevelToggle, error handling) already exist and work
✅ **Clear Content Source**: Source material available and content structure defined
✅ **Reusable Components**: AgeLevelToggle, MarkdownRenderer, and other components ready to use
✅ **Validation Commands**: Build/lint/type commands specified for validation
✅ **Comprehensive Context**: All necessary code examples and integration points provided

**Potential Risk**: Content adaptation from source.md to age-appropriate levels requires careful editing to maintain historical accuracy while making it accessible.

---

## 📝 Content Creation Guidelines

Based on `context/INITIAL.md` requirements, each age-level markdown file should include:

### Section Structure (consistent across all levels):

```markdown
## When Malta Was Ruled by Others

[Content adapted for age level]

## The Fight for Independence

[Content adapted for age level]

## A New Constitution

[Content adapted for age level]

## How We Became a Republic

[Content adapted for age level]

## How the Constitution Changed Over Time

[Content adapted for age level]
```

### Age-Level Tone Guidelines:

- **5-year-old.md**: Simple sentences, storytelling approach, basic concepts
- **10-year-old.md**: Slightly more detail, introduce key dates and figures
- **15-year-old.md**: Historical context, cause-and-effect relationships
- **citizen.md**: Full historical detail, political nuance, comprehensive timeline

### Key Historical Milestones to Cover:

- British colonial period and governance
- Language question (Italian vs English vs Maltese)
- 1964 Independence and first Constitution
- 1974 Republic transformation
- Notable constitutional amendments (1987, 2004, 2020-2025)
- Key figures: George Borg Olivier, Dom Mintoff, Mikiel Anton Vassalli
