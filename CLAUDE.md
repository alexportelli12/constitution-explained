# CLAUDE.md — Maltese Constitution Explained (Qwik)

## 🧠 **Context & Workflow Expectations**

This file governs how Claude and developers should operate within the Maltese Constitution Explained codebase.

### 📝 **Terminology**

- **PRP**: **Product Requirement Prompt** - Detailed implementation specifications stored in the `PRPs/` directory that outline feature requirements, component structure, and step-by-step implementation instructions for developers and AI agents.

### ✅ Before You Start

- **Read [`PLANNING.md`](./context/PLANNING.md)** for architecture, features, and route structure.
- **Review [`TASK.md`](./context/TASK.md)**:
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
- **File Structure**: Keep components at root level of `src/components/` unless they are complex composite components with multiple files
- **Component Naming**: Use PascalCase for all component files (e.g., `RouterHead.tsx`, not `router-head.tsx`)

### 📁 Directory Index Files

- **Required**: All TypeScript directories must have an `index.ts` file for clean imports
- **Pattern**: Use `export * from "./filename"` for re-exports
- **Coverage**: Apply to `src/constants/`, `src/lib/`, `src/models/`, `src/utils/`, `src/hooks/`, etc.
- **Import Style**: Always use index imports: `import { CHAPTERS } from "../constants"` not `import { CHAPTERS } from "../constants/chapters.constant"`

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

#### ❌ Never Use the `any` Type

```typescript
// ❌ BAD: Using 'any' type defeats TypeScript's purpose
interface BadExample {
  content: any;
  handler: any;
  data: any[];
}

// ✅ GOOD: Use specific types for type safety
interface GoodExample {
  content: Signal<ContentType | null>;
  handler: QRL<(level: string) => void>;
  data: ContentType[];
}

// ❌ BAD: Casting to 'any' to bypass type checks
const result = response as any;

// ✅ GOOD: Design functions with proper types from the start
interface ApiResponse {
  data: ContentType;
  status: number;
}

const fetchContent = (): Promise<ApiResponse> => {
  // Return properly typed data
};

// ✅ ACCEPTABLE: Use 'unknown' for truly unknown data, then narrow
const result = response as unknown;
if (isValidResponse(result)) {
  // TypeScript now knows the proper type
}
```

**Why:** The `any` type eliminates TypeScript's type safety, making code prone to runtime errors, harder to refactor, and prevents IDE intellisense. Always use specific types, unions, generics, or `unknown` when the type is truly unknown. ESLint rule `@typescript-eslint/no-explicit-any` is set to "error" to enforce this practice.

#### ❌ Minimize Type Casting (as/angle brackets)

```typescript
// ❌ BAD: Unnecessary type casting bypasses type safety
const getUserLevel = (level: string) => {
  return descriptions[level as AgeLevel] || descriptions.citizen;
};

// ✅ GOOD: Use proper parameter types from the start
const getUserLevel = (level: AgeLevel) => {
  return descriptions[level] || descriptions.citizen;
};

// ❌ BAD: Casting DOM events unnecessarily
const handleClick = (e: Event) => {
  const target = e.target as HTMLElement;
  // ...
};

// ✅ GOOD: Use proper event types
const handleClick = (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    // TypeScript now knows target is HTMLElement
  }
};

// ✅ ACCEPTABLE: When type casting is legitimately needed
const htmlContent = marked.parse(content) as string; // Library returns string | Promise<string>
const inputValue = (event.target as HTMLInputElement).value; // DOM events need casting
```

**Why:** Type casting should only be used when absolutely necessary (e.g., DOM events, library type issues). Prefer designing functions with correct parameter types from the start rather than casting inside the function. This maintains type safety and prevents runtime errors.

### ✨ SVG Component Standards

**All SVG icons must use the centralized component system located in `src/components/svgs/`.**

#### 🔧 Creating New SVG Components

```typescript
// ✅ GOOD: Create reusable SVG component with proper abstractions
import { component$ } from "@builder.io/qwik";
import { BaseSvg, type BaseSvgProps } from "./BaseSvg";

export interface NewIconProps extends Omit<BaseSvgProps, "children"> {}

export const NewIcon = component$<NewIconProps>((props) => {
  return (
    <BaseSvg {...props}>
      <path d="SVG_PATH_DATA_HERE" />
    </BaseSvg>
  );
});
```

#### 📦 SVG Component Usage

```typescript
// ✅ GOOD: Import and use SVG components
import { HomeIcon, ClockIcon } from "../components/svgs";

// Usage with customizable properties
<HomeIcon
  class="w-6 h-6 text-primary-600"
  color="currentColor"
  strokeWidth={2}
/>

// ❌ BAD: Never use inline SVGs
<svg class="w-6 h-6" viewBox="0 0 24 24">
  <path d="M3 12l2-2m0 0l7-7 7 7..." />
</svg>
```

#### 🎯 SVG Component Props

All SVG components support these standardized props:

- `class?: string` - CSS classes for styling
- `width?: string | number` - Icon width (default: 24)
- `height?: string | number` - Icon height (default: 24)
- `color?: string` - Icon color (default: "currentColor")
- `strokeWidth?: number` - Stroke width (default: 2 for UI icons, 1.5 for chapter icons)
- `viewBox?: string` - SVG viewBox (default: "0 0 24 24")

#### 📂 File Organization

```
src/components/svgs/
├── index.ts              # Central exports
├── BaseSvg.tsx          # Base component with common props
├── HomeIcon.tsx         # Individual icon components
├── ClockIcon.tsx
└── ...
```

#### 🚀 Benefits of This System

- **Consistency**: All icons follow the same prop interface
- **Maintainability**: Central management of all SVG assets
- **Type Safety**: Full TypeScript support with proper interfaces
- **Performance**: Reduced code duplication and better tree-shaking
- **Customization**: Easy color, size, and styling modifications
- **Accessibility**: Built-in support for screen readers and themes

#### ❌ Anti-Patterns

```typescript
// ❌ BAD: Inline SVGs scattered throughout components
const BadComponent = component$(() => (
  <svg viewBox="0 0 24 24">
    <path d="..." />
  </svg>
));

// ❌ BAD: Hardcoded colors and sizes
<HomeIcon style="color: #ff0000; width: 24px;" />

// ✅ GOOD: Use design system classes and currentColor
<HomeIcon class="w-6 h-6 text-primary-600" />
```

### 🧱 Architecture

> See [`PLANNING.md`](./context/PLANNING.md#architecture-overview) for full rationale.

- **Routing**: File-based via `src/routes/` (QwikCity)
- **Components**: Use `component$()` for all Qwik components
- **Component Organization**: Centralized exports via `src/components/index.ts` for clean imports
- **SVG Icons**: Centralized SVG component system in `src/components/svgs/` with standardized props and interfaces
- **Data Fetching**: Markdown content is served as static assets from the public folder and parsed client-side
- **UI Logic**: Toggle components manage which age-level explanation is shown
- **Markdown**: Each Maltese Constitution chapter stored in its own `.md` file with structured `##` sections (original, explain_5, explain_10, etc.)

---

## 🧪 Testing Guidelines

Testing is encouraged for all utility functions and logic-heavy components.

### 🔍 Coverage Expectations

- ✅ Normal use case
- ⚠️ Edge case
- ❌ Failure scenario

> Test strategy and patterns will be added to [`PLANNING.md`](./context/PLANNING.md#testing-strategy)

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

- All major plans and decisions are documented in [`PLANNING.md`](./context/PLANNING.md)
- Static assets in the public folder house Maltese Constitution chapter Markdown files
- Content is pulled client-side and rendered with age-level toggle
- Mobile-first design is a priority
- Open-source collaboration is encouraged
