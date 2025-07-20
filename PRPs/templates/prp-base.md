# Base PRP Template v2 — Constitution Explained (Qwik + Static Markdown)

## Purpose

This template is optimized for AI agents or developers to implement Qwik features with full context and **self-validation**. It ensures the result can be executed, tested, and iteratively improved with minimal external intervention.

## Core Principles

1. **Context is King** – include all code references and documentation
2. **Validation Loops** – enable real validation, not assumptions
3. **Pattern Consistency** – match `CLAUDE.md` conventions
4. **Progressive Success** – build small → validate → extend
5. **One-Pass Mindset** – make success possible in a single, well-planned execution

---

## 🥅 Goal

[Describe the feature or fix: e.g., Render Markdown article and toggle explanation by age group]

## 💡 Why

- Improve user understanding of the Maltese Constitution
- Reduce friction for content access and readability
- Leverage static hosting for performance and simplicity

## 📐 What

[Describe the exact changes to be made: component creation, fetch logic, rendering logic, toggles, etc.]

### ✅ Success Criteria

- [ ] Feature behaves as described with correct UI rendering
- [ ] Markdown is parsed into correct age-level sections
- [ ] All age toggles work and update display
- [ ] Fallback message shown on missing file or fetch error
- [ ] No dynamic server calls — uses static assets only

---

## 📚 All Needed Context

### 📄 Documentation & References

```yaml
- file: src/lib/fetchMarkdown.ts
  why: Utility function to fetch markdown from public/articles/*.md

- file: src/components/ExplanationToggle.tsx
  why: Controls which age-level explanation to display

- file: src/routes/article/[id]/index.tsx
  why: Route to display each article's content dynamically

- file: public/articles/article_1.md
  why: Example static Markdown file with age-level sections

- url: https://qwik.dev/docs
  why: Qwik SSR and component best practices
```

---

### 🗂️ Current Codebase Tree (relevant part)

```bash
src/
├── lib/
│   └── fetchMarkdown.ts
├── components/
│   └── ExplanationToggle.tsx
├── routes/
│   └── article/
│       └── [id]/index.tsx
public/
└── articles/
    ├── article_1.md
    └── article_2.md
```

---

### 🔭 Desired Codebase Tree After Feature

```bash
src/
├── components/
│   └── MarkdownArticle.tsx        # NEW: Parses markdown and renders correct section
```

---

### ⚠️ Known Gotchas

```ts
// GOTCHA: Static markdown fetch must use fetch('/articles/article_1.md')
// GOTCHA: Use Qwik signals (useSignal()) for toggle state
// GOTCHA: Ensure age-level sections are well-formatted and case-consistent
// GOTCHA: Qwik component files must use component$()
// GOTCHA: Markdown parsing should be fail-safe if section missing
```

---

## 🛠️ Implementation Blueprint

### 📦 Component or Utility Additions

```ts
// Create MarkdownArticle component
// Parse markdown by sections ## original, ## explain_5, etc.
```

---

### 📋 Task List (Ordered)

```yaml
Task 1:
CREATE src/components/MarkdownArticle.tsx
  - Accepts articleId and current level as props
  - Fetches from `/articles/${id}.md`
  - Parses and displays correct section

Task 2:
UPDATE src/routes/article/[id]/index.tsx
  - Use useSignal() to store toggle state
  - Render ExplanationToggle and MarkdownArticle

Task 3:
CREATE src/components/ExplanationToggle.tsx
  - Renders age level buttons and updates selected level

Task 4:
ADD fallback UI for missing articles or malformed markdown
```

---

### 🔁 Pseudocode (Per Task)

```ts
// MarkdownArticle.tsx
const content = await fetch("/articles/article_1.md").then((res) => res.text());
const section = parseMarkdownSection(content, "explain_5");
```

---

## 🔌 Integration Points

```yaml
STATIC CONTENT:
  - All markdown files live in public/articles/
  - Fetched using static relative paths

UI:
  - ExplanationToggle.tsx controls which section of markdown to show

PARSER:
  - Markdown parsing logic needs to split by ## explain_* headings
```

---

## ✅ Validation Loop

### Level 1: Manual and Visual Checks

```bash
npm run preview
```

### Level 2: Build Check

```bash
npm run build
npm run build.types
npm run lint
```

---

## 📋 Final Validation Checklist

- [ ] Markdown renders correctly for each age level
- [ ] Fallback shown for missing or broken files
- [ ] Toggle updates explanation section correctly
- [ ] Build passes: `npm run build`
- [ ] Code respects structure in CLAUDE.md

---

## 🚫 Anti-Patterns to Avoid

- ❌ Using dynamic Firebase fetches — all content must be local
- ❌ Hardcoding UI content instead of reading from markdown
- ❌ Parsing logic that assumes perfect markdown formatting
- ❌ Failing to show fallback UI when content is missing
