# Global Layout and Navigation PRP — Constitution Explained (Qwik)

## Purpose

This PRP provides complete context for implementing a global layout system with navigation for the Constitution Explained platform using Qwik and QwikCity conventions.

## Core Principles

1. **Mobile-First Design** – navigation must work excellently on mobile devices
2. **SSR-Safe Components** – all navigation must work with QwikCity file-based routing
3. **Minimal Layout Shift** – header should not cause CLS issues
4. **Qwik Conventions** – use `component$()` and follow established patterns

---

## 🥅 Goal

Create a global layout component (`src/routes/layout.tsx`) that wraps all pages with a consistent header containing navigation links. The header component should be responsive, mobile-first, and include navigation to Home, Overview, and Articles pages.

## 💡 Why

- Provide consistent navigation across all pages
- Establish visual brand identity for the platform
- Ensure mobile-friendly navigation experience
- Enable easy site-wide UI updates through shared layout

## 📐 What

1. Create `src/routes/layout.tsx` with `<Slot />` to wrap all routes
2. Create `src/components/Header.tsx` with navigation links
3. Implement responsive design using Tailwind CSS
4. Add active route highlighting if feasible
5. Ensure navigation works with QwikCity SSR

### ✅ Success Criteria

- [ ] Layout wraps all routes automatically using `<Slot />`
- [ ] Header displays correctly on mobile and desktop
- [ ] Navigation links route to correct pages: `/`, `/overview`, `/articles`
- [ ] Header uses mobile-first responsive design
- [ ] No layout shift or CLS issues during page load
- [ ] Active route highlighting (optional/nice-to-have)

---

## 📚 All Needed Context

### 📄 Documentation & References

```yaml
- url: https://qwik.dev/docs/layout/
  why: QwikCity layout patterns and Slot component usage

- url: https://qwik.dev/docs/routing
  why: File-based routing and navigation best practices

- url: https://tailwindcss.com/docs
  why: Mobile-first responsive design patterns

- file: src/root.tsx
  why: Current app structure with QwikCityProvider and RouterOutlet

- file: src/routes/index.tsx
  why: Example of existing route structure and component patterns

- file: CLAUDE.md
  why: Project conventions for TypeScript, formatting, and component patterns
```

---

### 🗂️ Current Codebase Tree (relevant parts)

```bash
src/
├── components/
│   └── router-head/
│       └── router-head.tsx     # Existing head component
├── routes/
│   └── index.tsx               # Home page route
├── root.tsx                    # App root with QwikCityProvider
└── global.css                  # Global styles
```

### 🔍 Existing Patterns Analysis

```typescript
// From src/root.tsx - QwikCity structure
export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />  // This is where layout.tsx will wrap content
      </body>
    </QwikCityProvider>
  );
});

// From src/routes/index.tsx - Component pattern
export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>Content here</div>
    </>
  );
});
```

### 📦 Dependencies Available

```typescript
// From package.json
"@builder.io/qwik": "^1.14.1"
"@builder.io/qwik-city": "^1.14.1"
"tailwindcss": "^4.1.11"
"clsx": "^2.1.1"
```

---

### 🔭 Desired Codebase Tree After Feature

```bash
src/
├── components/
│   ├── router-head/
│   │   └── router-head.tsx
│   └── Header.tsx              # NEW: Navigation header component
├── routes/
│   ├── layout.tsx              # NEW: Global layout wrapper
│   ├── index.tsx               # Home page
│   ├── overview/
│   │   └── index.tsx           # NEW: Overview page (stub)
│   └── articles/
│       └── index.tsx           # NEW: Articles list page (stub)
```

---

### ⚠️ Known Gotchas

```typescript
// GOTCHA: layout.tsx must be in src/routes/ to be picked up by QwikCity
// GOTCHA: Use <Slot /> component for rendering child routes
// GOTCHA: Navigation links should use <Link> from @builder.io/qwik-city for SPA routing
// GOTCHA: Responsive design should use Tailwind's mobile-first breakpoints (sm:, md:, lg:)
// GOTCHA: component$() is required for all Qwik components
// GOTCHA: useLocation() can be used for active route detection
```

---

## 🛠️ Implementation Blueprint

### 📦 Component Specifications

#### Header Component (`src/components/Header.tsx`)

```typescript
// Purpose: Reusable navigation header
// Props: None (uses useLocation for active state)
// Features:
//   - Mobile-first responsive design
//   - Links to /, /overview, /articles
//   - Optional active state highlighting
//   - Tailwind CSS styling
```

#### Layout Component (`src/routes/layout.tsx`)

```typescript
// Purpose: Global wrapper for all routes
// Features:
//   - Renders Header component
//   - Uses <Slot /> for route content
//   - Minimal, clean structure
```

---

### 📋 Task List (Ordered)

```yaml
Task 1: CREATE src/components/Header.tsx
  - Import component$, Link from qwik-city
  - Create responsive navigation with mobile-first design
  - Add links to /, /overview, /articles
  - Style with Tailwind CSS
  - Optional: Add active route highlighting using useLocation()

Task 2: CREATE src/routes/layout.tsx
  - Import component$, Slot from qwik
  - Import Header component
  - Create layout structure with Header and Slot
  - Ensure proper mobile-first responsive behavior

Task 3: CREATE stub pages for navigation targets
  - src/routes/overview/index.tsx (basic page with "Overview" content)
  - src/routes/articles/index.tsx (basic page with "Articles" content)

Task 4: TEST navigation and responsive behavior
  - Verify all links work correctly
  - Test mobile responsiveness
  - Check for layout shift issues
```

---

### 🔁 Pseudocode (Per Task)

#### Task 1: Header Component

```typescript
// src/components/Header.tsx
import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

export const Header = component$(() => {
  const loc = useLocation(); // For active state (optional)

  return (
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex space-x-8">
            <Link href="/" class="flex items-center">Home</Link>
            <Link href="/overview" class="flex items-center">Overview</Link>
            <Link href="/articles" class="flex items-center">Articles</Link>
          </div>
        </div>
      </nav>
    </header>
  );
});
```

#### Task 2: Layout Component

```typescript
// src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { Header } from '../components/Header';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot /> {/* All route content renders here */}
      </main>
    </>
  );
});
```

---

## 🔌 Integration Points

```yaml
ROUTING:
  - QwikCity automatically applies layout.tsx to all nested routes
  - File-based routing handles /overview and /articles pages

STYLING:
  - Tailwind CSS classes for responsive design
  - Mobile-first breakpoints (default, sm:, md:, lg:)
  - Consistent spacing and typography

NAVIGATION:
  - Link component from qwik-city for SPA navigation
  - useLocation() hook for active state detection (optional)
```

---

## ✅ Validation Loop

### Level 1: Development Server Check

```bash
npm start
# Navigate to each route and verify:
# - Header appears on all pages
# - Navigation links work
# - Mobile responsive behavior
# - No console errors
```

### Level 2: Build and Type Check

```bash
npm run build
npm run build.types
npm run lint
npm run fmt.check
```

### Level 3: Manual Testing

```bash
# Test in browser:
# 1. Navigate to / - should show header + home content
# 2. Click "Overview" - should navigate to /overview with header
# 3. Click "Articles" - should navigate to /articles with header
# 4. Resize browser to mobile width - header should adapt
# 5. Check for layout shift during page load
```

---

## 📋 Final Validation Checklist

- [ ] Header component renders correctly on all pages
- [ ] Navigation links work and route correctly
- [ ] Mobile responsive design works (test at 320px, 768px, 1024px widths)
- [ ] No layout shift (CLS) issues during page load
- [ ] Build passes: `npm run build`
- [ ] Type check passes: `npm run build.types`
- [ ] Lint passes: `npm run lint`
- [ ] Code follows CLAUDE.md conventions
- [ ] Stub pages created for /overview and /articles
- [ ] Header styling is consistent with mobile-first approach

---

## 🚫 Anti-Patterns to Avoid

- ❌ Using client-side routing libraries instead of QwikCity Link
- ❌ Creating layout outside of src/routes/ directory
- ❌ Complex navigation state management for simple links
- ❌ Non-mobile-first responsive design
- ❌ Hardcoded styling instead of Tailwind utility classes
- ❌ Missing Slot component in layout (routes won't render)
- ❌ Over-engineering navigation with unnecessary features for MVP

---

## 🎯 Success Confidence Rating

**9/10** - This PRP provides complete context including:

- Exact file paths and structure
- Code examples following Qwik conventions
- Step-by-step implementation order
- Validation commands and checklist
- Clear integration points with existing codebase
- Mobile-first responsive design requirements
- All necessary imports and component patterns

The implementation should succeed in one pass with proper attention to the mobile-first requirement and QwikCity routing conventions.
