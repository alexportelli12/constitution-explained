# CLAUDE.md — Maltese Constitution Explained (Qwik)

## 🧠 **Context & Workflow Expectations**

This file governs how Claude and developers should operate within the Maltese Constitution Explained codebase.

### ✅ Before You Start

- **Read [`PLANNING.md`](./.context/PLANNING.md)** for architecture, features, and route structure.
- **Review [`TASK.md`](./.context/TASK.md)**:
  - If your task isn’t listed, add it with today’s date.
  - Mark tasks complete when done.
  - Log blockers or discoveries under “Discovered During Work.”

---

## 🔧 Development Commands

| Task                  | Command               |
| --------------------- | --------------------- |
| Start dev server      | `npm start`           |
| Build (dev)           | `npm run build`       |
| Preview build locally | `npm run preview`     |
| Type check            | `npm run build.types` |
| Format with Prettier  | `npm run fmt`         |
| Check format          | `npm run fmt.check`   |
| Lint TypeScript files | `npm run lint`        |
| Add integrations      | `npm run qwik add`    |
| Deploy to Firebase    | `firebase deploy`     |

---

## 📎 Style & Code Conventions

These standards must be followed:

### 🔤 TypeScript & Code Style

- **TypeScript**: strict mode enabled
- **JSX**: configured for Qwik (`@builder.io/qwik`)
- **Format**: use Prettier + ESLint
- **Utilities**: use `clsx` for conditional classes
- File size: split components over 500 lines

### 🗂️ Component Organization

- **Index File**: Always maintain `src/components/index.ts` with re-exports of all components
- **Import Style**: Use centralized imports: `import { Header, Footer } from "../components"`
- **Export Pattern**: Use `export * from "./ComponentName"` for re-exports, no default exports for components
- **File Structure**: Keep related components in subdirectories when they have multiple files

### 🚫 Anti-Patterns & Best Practices

#### ❌ Never Use setTimeout for State Management

```typescript
// ❌ BAD: Using setTimeout to coordinate UI state
onClick$={() => {
  setTimeout(() => {
    someState.value = false;
  }, 100);
}}

// ✅ GOOD: Use proper event handling and navigation
const handleAction = $((path: string) => {
  someState.value = false;
  navigate(path);
});
```

**Why:** `setTimeout` creates race conditions, unpredictable behavior, and makes code harder to test and debug. Always use proper event handling, lifecycle hooks, or navigation APIs instead.

#### ❌ Never Use Inline Styles

```typescript
// ❌ BAD: Using inline styles
<div
  class="fixed inset-0 z-[60]"
  style="background-color: rgba(207, 20, 43, 0.75);"
/>

// ✅ GOOD: Create custom CSS classes for complex styling
// In global.css:
.bg-primary-overlay {
  background-color: rgba(207, 20, 43, 0.75);
}

// In component:
<div class="fixed inset-0 bg-primary-overlay z-[60]" />
```

**Why:** Inline styles break the design system, are harder to maintain, override CSS specificity, and prevent consistent theming. When Tailwind utilities don't work properly (like opacity modifiers), create semantic custom CSS classes instead of resorting to inline styles.

### 🧱 Architecture

> See [`PLANNING.md`](./.context/PLANNING.md#architecture-overview) for full rationale.

- **Routing**: File-based via `src/routes/` (QwikCity)
- **Components**: Use `component$()` for all Qwik components
- **Component Organization**: Centralized exports via `src/components/index.ts` for clean imports
- **Data Fetching**: Markdown content is served as static assets from the public folder and parsed client-side
- **UI Logic**: Toggle components manage which age-level explanation is shown
- **Markdown**: Each Maltese Constitution article stored in its own `.md` file with structured `##` sections (original, explain_5, explain_10, etc.)

---

## 🧪 Testing Guidelines

Testing is encouraged for all utility functions and logic-heavy components.

### 🔍 Coverage Expectations

- ✅ Normal use case
- ⚠️ Edge case
- ❌ Failure scenario

> Test strategy and patterns will be added to [`PLANNING.md`](./.context/PLANNING.md#testing-strategy)

---

## 📚 Documentation Rules

- **Update `README.md`** when dependencies, features, or setup changes
- Use `// Reason:` inline comments for complex logic
- Maintain clear folder structure
- Write clean and modular code

---

## 🧠 AI Behavior Rules

For Claude, GPT, or other agents:

- ❌ Never assume context — ask for clarification
- ❌ Don't invent APIs or code — stick to actual project structure
- ✅ Confirm file/module paths before using
- ❌ Never delete/refactor outside the task list unless explicitly told
- ❌ **Never use `setTimeout` as a solution** — always implement proper event handling, lifecycle management, or navigation APIs
- ✅ **Code quality over quick fixes** — take time to implement clean, maintainable solutions

---

## 📌 Final Notes

- All major plans and decisions are documented in [`PLANNING.md`](./.context/PLANNING.md)
- Static assets in the public folder house Maltese Constitution article Markdown files
- Content is pulled client-side and rendered with age-level toggle
- Mobile-first design is a priority
- Open-source collaboration is encouraged
