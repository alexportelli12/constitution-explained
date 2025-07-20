# Home Page Improvements PRP — Constitution Explained (Qwik)

## Purpose

This PRP provides comprehensive context for AI agents to enhance the existing Home/Landing Page (`/`) with improved design, meaningful content, and better user experience following Qwik and project conventions.

## Core Principles

1. **Context is King** – include all code references and documentation
2. **Validation Loops** – enable real validation, not assumptions
3. **Pattern Consistency** – match `CLAUDE.md` conventions
4. **Progressive Success** – build small → validate → extend
5. **One-Pass Mindset** – make success possible in a single, well-planned execution

---

## 🥅 Goal

Enhance the existing Home page at `/` to create a more engaging, professional landing experience with inspirational civic content, clearer value proposition, and improved mobile-first design that effectively guides users into exploring the Maltese Constitution.

## 💡 Why

- Create stronger first impression for visitors discovering the site
- Establish civic purpose and democratic values through inspirational quotes
- Clearly communicate the site's mission to remove legal jargon
- Improve user journey with better CTAs and visual hierarchy
- Ensure mobile-first experience matches modern civic education expectations

## 📐 What

**Enhance the existing Home page (`src/routes/index.tsx`) with:**

1. **Inspirational Democracy Quote** - Add a prominent, well-styled quote about civic engagement
2. **Mission Clarity** - Better explain the purpose of simplifying legal jargon
3. **Visual Sections** - Create distinct hero, mission, and action sections
4. **Mobile-First Design** - Improve responsive layout and typography
5. **Clean Title** - Remove "V2" and improve messaging
6. **Enhanced CTAs** - Better call-to-action flow and styling

### ✅ Success Criteria

- [ ] Home page loads with inspirational civic quote prominently displayed
- [ ] Mission explanation clearly states purpose of removing legal jargon
- [ ] Visual sections are distinct and well-organized
- [ ] Mobile-first responsive design works across all screen sizes
- [ ] CTAs guide users effectively to `/overview` or `/articles`
- [ ] Typography emphasizes readability and civic tone
- [ ] Build passes: `npm run build`, `npm run build.types`, `npm run lint`
- [ ] Page maintains fast load times and Qwik best practices

---

## 📚 All Needed Context

### 📄 Current Implementation

**File: `src/routes/index.tsx`**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">
          V2 Welcome to Maltese Constitution Explained 🇲🇹
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Making the Constitution of Malta accessible to everyone through
          age-appropriate explanations.
        </p>
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <a
            href="/overview"
            class="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Learn About the Constitution
          </a>
          <a
            href="/articles"
            class="inline-block border border-primary-500 text-primary-500 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            Browse Articles
          </a>
        </div>
      </div>
    </div>
  );
});
```

### 📄 Layout Context

**File: `src/routes/layout.tsx`**

```tsx
import { component$, Slot } from "@builder.io/qwik";
import { Header, Footer } from "../components";

export default component$(() => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1 bg-gray-50">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
```

### 📄 Styling Context

**File: `src/global.css` (Custom Primary Colors)**

```css
/* Maltese Constitution red - override for primary colors */
.bg-primary-500 {
  background-color: #cf142b;
}
.bg-primary-600 {
  background-color: #b91c1c;
}
.bg-primary-50 {
  background-color: #fef2f2;
}
.text-primary-500 {
  color: #cf142b;
}
.text-primary-900 {
  color: #641e16;
}
.border-primary-500 {
  border-color: #cf142b;
}
```

### 📄 Documentation & References

```yaml
- file: src/routes/index.tsx
  why: Current home page implementation to be enhanced

- file: src/global.css
  why: Custom Maltese red primary color definitions for styling

- file: CLAUDE.md
  why: Development conventions, component patterns, and anti-patterns

- file: .context/INITIAL.md
  why: Original feature requirements and design guidelines

- url: https://qwik.dev/docs/routing/
  why: Qwik routing and component best practices

- url: https://tailwindcss.com/docs/typography-plugin
  why: Typography utilities for improved readability

- url: https://www.goodreads.com/quotes/tag/democracy
  why: Sample source for democracy/civic quotes (suggested in requirements)
```

---

### 🗂️ Current Codebase Tree (relevant part)

```bash
src/
├── routes/
│   ├── index.tsx                     # HOME PAGE (target for enhancement)
│   ├── layout.tsx                    # Layout wrapper with Header/Footer
│   ├── articles/index.tsx            # Articles listing page
│   └── overview/index.tsx            # Overview page
├── components/
│   ├── index.ts                      # Central component exports
│   ├── Header.tsx                    # Navigation header
│   └── Footer.tsx                    # Site footer
├── global.css                        # Custom Maltese primary colors
└── root.tsx                          # Root application component
```

---

### 🔭 Desired Outcome After Enhancement

**Enhanced Home Page Features:**

- Prominent inspirational civic quote section
- Clear mission statement about removing legal jargon
- Visually distinct hero, mission, and action sections
- Improved mobile-first responsive design
- Professional typography and spacing
- Clean title without "V2" prefix
- Enhanced call-to-action flow

---

### ⚠️ Known Gotchas & Requirements

```ts
// GOTCHA: Use component$() for all Qwik components
// GOTCHA: Must use custom primary colors (#CF142B) defined in global.css
// GOTCHA: Follow mobile-first responsive design principles
// GOTCHA: Page should be fluid height, not hardcoded
// GOTCHA: Use Tailwind classes, not custom CSS
// GOTCHA: Typography should emphasize readability and civic tone
// GOTCHA: Avoid setTimeout anti-pattern mentioned in CLAUDE.md
// GOTCHA: Maintain DocumentHead export for SEO
```

---

## 🛠️ Implementation Blueprint

### 📦 Component Enhancement Strategy

**Target File: `src/routes/index.tsx`**

1. **Hero Section** - Main title and subtitle with Malta flag emoji
2. **Quote Section** - Inspirational democracy/civic quote with proper attribution
3. **Mission Section** - Explanation of legal jargon removal purpose
4. **CTA Section** - Enhanced call-to-action buttons with better spacing

---

### 📋 Task List (Ordered)

```yaml
Task 1: ENHANCE Hero Section
  - Remove "V2" from title
  - Improve title and subtitle typography
  - Add better spacing and visual hierarchy

Task 2: ADD Inspirational Quote Section
  - Add well-styled democracy/civic quote
  - Include proper attribution styling
  - Use suggested quote: "The most important political office is that of the private citizen." — Louis Brandeis

Task 3: ENHANCE Mission Explanation
  - Add clear explanation about removing legal jargon
  - Improve content structure and readability
  - Maintain civic, friendly tone

Task 4: IMPROVE Mobile-First Design
  - Enhance responsive layout
  - Improve typography scaling
  - Add better section spacing

Task 5: ENHANCE Call-to-Action Section
  - Improve CTA button styling and spacing
  - Add better visual hierarchy
  - Maintain links to /overview and /articles

Task 6: UPDATE DocumentHead
  - Improve page title and meta description
  - Remove "V2" references
```

---

### 🔁 Enhanced Home Page Structure (Pseudocode)

```tsx
export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section class="text-center mb-16">
        <h1>Maltese Constitution Explained 🇲🇹</h1>
        <p>Making the Constitution of Malta accessible to everyone</p>
      </section>

      {/* Quote Section */}
      <section class="mb-16">
        <blockquote>
          "The most important political office is that of the private citizen."
          <cite>— Louis Brandeis</cite>
        </blockquote>
      </section>

      {/* Mission Section */}
      <section class="mb-16">
        <h2>Our Mission</h2>
        <p>
          Complex legal language shouldn't prevent citizens from understanding
          their rights...
        </p>
      </section>

      {/* CTA Section */}
      <section class="text-center">
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          {/* Enhanced CTA buttons */}
        </div>
      </section>
    </div>
  );
});
```

---

## 🔌 Integration Points

```yaml
LAYOUT INTEGRATION:
  - Page renders within existing layout.tsx wrapper
  - Header and Footer remain unchanged
  - Main content area uses bg-gray-50 background

STYLING INTEGRATION:
  - Use custom primary colors from global.css (#CF142B)
  - Follow Tailwind utility-first approach
  - Maintain consistency with Header component styling

NAVIGATION INTEGRATION:
  - CTAs link to existing /overview and /articles routes
  - Maintain Header.tsx navigation active state logic
```

---

## ✅ Validation Loop

### Level 1: Visual and Manual Checks

```bash
# Start dev server and visually inspect
npm start

# Check responsive design at different breakpoints
# Verify quote displays properly
# Test CTA buttons and navigation
# Confirm mobile-first design works
```

### Level 2: Build and Quality Checks

```bash
# Type checking
npm run build.types

# Build verification
npm run build

# Code quality
npm run lint
npm run fmt.check

# Preview build
npm run preview
```

### Level 3: Functionality Validation

- [ ] Page loads without errors
- [ ] Quote section displays with proper attribution
- [ ] Mission explanation is clear and well-formatted
- [ ] CTAs navigate to correct routes (/overview, /articles)
- [ ] Mobile responsive design works on small screens
- [ ] Typography scales properly across screen sizes
- [ ] All custom primary colors render correctly

---

## 📋 Final Validation Checklist

**Content & Messaging:**

- [ ] Title removes "V2" and presents clean messaging
- [ ] Democracy quote displays prominently with attribution
- [ ] Mission clearly explains legal jargon removal purpose
- [ ] Tone is civic, friendly, and professional

**Design & UX:**

- [ ] Mobile-first responsive design works across breakpoints
- [ ] Visual sections are distinct and well-organized
- [ ] Typography emphasizes readability
- [ ] Custom Maltese red primary colors are used correctly
- [ ] Spacing and visual hierarchy guide user flow

**Technical Quality:**

- [ ] Build passes: `npm run build`
- [ ] Type check passes: `npm run build.types`
- [ ] Linting passes: `npm run lint`
- [ ] Code follows CLAUDE.md conventions
- [ ] DocumentHead export updated with clean meta information
- [ ] Component uses component$() syntax
- [ ] No setTimeout anti-patterns used

**Navigation & Integration:**

- [ ] CTAs link correctly to /overview and /articles
- [ ] Page integrates properly with layout.tsx
- [ ] Header navigation highlights home page when active
- [ ] Fast load times maintained

---

## 🚫 Anti-Patterns to Avoid

- ❌ **Hardcoding page height** — layout should be fluid and content-driven
- ❌ **Using setTimeout for any state management** — violates CLAUDE.md rules
- ❌ **Custom CSS instead of Tailwind** — maintain utility-first approach
- ❌ **Ignoring mobile-first design** — responsive design is a priority
- ❌ **Overdesign or clutter** — clarity and calmness are priorities
- ❌ **Breaking component export patterns** — maintain centralized exports if adding components
- ❌ **Forgetting DocumentHead** — SEO meta information is important

---

## 🧠 Confidence Rating

**9/10** - This PRP provides comprehensive context including current implementation, specific requirements, styling patterns, validation steps, and clear task breakdown. An AI agent should be able to successfully enhance the Home page following these specifications in a single implementation pass.

The high confidence is based on:

- Complete current code context provided
- Clear enhancement requirements from INITIAL.md
- Specific Qwik patterns and styling guidelines included
- Comprehensive validation checklist for quality assurance
- Anti-patterns explicitly called out to avoid common mistakes
