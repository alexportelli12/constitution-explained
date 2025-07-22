# PRP: Landing Page Layout and Content Improvements

## 📋 Context & Purpose

**Feature:** Improve the landing page layout, content, and structure to create a visually appealing, informative, and action-driven experience that expresses the civic purpose of the platform, its open-source nature, and encourages deeper engagement with the Constitution.

**Current State:** The landing page exists at `src/routes/index.tsx` with a basic hero section, quote, mission section, and two CTA buttons. The design needs enhancement for better user engagement, SEO optimization, and civic messaging.

**Target Outcome:** A modern, responsive landing page with 3 new sections, improved content hierarchy, enhanced CTAs, and optimized SEO structure.

---

## 🔍 Current Codebase Analysis

### Existing Landing Page Structure (`src/routes/index.tsx`)

```typescript
// Current sections:
1. Hero Section with HeroImage component
2. Quote Section with Brandeis quote
3. Mission Section (2 paragraphs)
4. CTA Section (2 buttons: /overview, /chapters)

// Current SEO implementation:
export const head: DocumentHead = {
  title: "Maltese Constitution Explained",
  meta: [
    {
      name: "description",
      content: "Making the Constitution of Malta accessible to everyone..."
    }
  ]
};
```

### Available Reusable Components

From `src/components/index.ts`:

- **HeroImage**: Responsive image with gradient overlays
- **ChapterCard**: Interactive cards with hover effects and navigation
- **AgeLevelToggle**: 4-level explanation toggle (5yr, 10yr, 15yr, citizen)
- **Header/Footer**: Layout components with consistent styling
- **MarkdownRenderer**: Content parsing with loading/error states

### Styling Patterns

```css
/* From global.css - Primary color variables */
--primary-50: rgb(254, 242, 242);
--primary-500: rgb(207, 20, 43); /* Maltese red */
--primary-600: rgb(185, 28, 28);

/* Consistent CTA button styling */
.cta-primary {
  @apply bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1;
}
```

---

## 🎯 Implementation Requirements

### New Sections to Add

1. **Open Source & Contributions Welcome**

   - Highlight collaborative nature
   - GitHub repository link
   - Developer/contributor CTAs

2. **Republic Protection Through Education**

   - Civic education messaging
   - Democratic values emphasis
   - Constitutional literacy importance

3. **Ownership of the Constitution as a Civic Document**
   - Personal connection to constitutional rights
   - Citizen empowerment messaging
   - Accessibility across age groups

### Technical Requirements

- **Framework**: Qwik with TypeScript
- **Styling**: Tailwind CSS with existing design system
- **Responsiveness**: Mobile-first approach
- **SEO**: Enhanced meta tags, structured content, semantic HTML
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lazy-loaded components, optimized images

---

## 🛠️ Implementation Blueprint

### Phase 1: Content Structure & SEO Enhancement

```typescript
// Enhanced DocumentHead in src/routes/index.tsx
export const head: DocumentHead = {
  title: "Maltese Constitution Explained - Accessible Constitutional Education",
  meta: [
    {
      name: "description",
      content:
        "Learn Malta's Constitution through age-appropriate explanations. Open-source platform making constitutional education accessible to citizens of all ages.",
    },
    {
      name: "keywords",
      content:
        "Malta Constitution, constitutional education, civic education, democracy, constitutional rights, open source",
    },
    {
      property: "og:title",
      content: "Maltese Constitution Explained",
    },
    {
      property: "og:description",
      content:
        "Making the Constitution of Malta accessible through clear, age-appropriate explanations",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
};
```

### Phase 2: Component Architecture

```typescript
// New section components to create
const OpenSourceSection = component$(() => {
  return (
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GitHub integration: https://github.com/alexportelli12/constitution-explained */}
        {/* Contributor stats, contribution CTAs */}
      </div>
    </section>
  );
});

const CivicEducationSection = component$(() => {
  return (
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Democratic values, constitutional literacy messaging */}
      </div>
    </section>
  );
});

const CitizenOwnershipSection = component$(() => {
  return (
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Personal connection, empowerment, age-group accessibility */}
      </div>
    </section>
  );
});
```

### Phase 3: Enhanced Hero Section

```typescript
// Improved hero with better content hierarchy
const HeroSection = component$(() => {
  return (
    <section class="relative min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              🇲🇹 Maltese Constitution <span class="text-primary-500">Explained</span>
            </h1>
            <p class="text-xl text-gray-600 mt-6 leading-relaxed">
              {/* Enhanced value proposition with civic messaging */}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 mt-8">
              {/* Improved CTA buttons with analytics tracking */}
            </div>
          </div>
          <div class="relative">
            <HeroImage class="w-full h-96 object-cover rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
});
```

### Phase 4: Interactive Elements

```typescript
// Age level preview component
const AgeLevelPreview = component$(() => {
  const selectedLevel = useSignal<"5" | "10" | "15" | "citizen">("citizen");

  return (
    <div class="bg-gray-100 rounded-xl p-6">
      <h3 class="text-lg font-semibold mb-4">Try Different Explanation Levels:</h3>
      <AgeLevelToggle
        currentLevel={selectedLevel.value}
        onLevelChange$={(level) => selectedLevel.value = level}
      />
      <div class="mt-4 p-4 bg-white rounded-lg">
        {/* Sample constitutional content at selected level */}
      </div>
    </div>
  );
});
```

---

## ✅ Validation Gates

### Development Commands

```bash
# Start development server
npm start

# Type checking
npm run build.types

# Build verification
npm run build && npm run preview

# Code formatting and linting
npm run fmt.check && npm run lint
```

### Content Validation

1. **SEO Check**: Lighthouse audit for SEO score ≥90
2. **Accessibility**: WCAG 2.1 AA compliance via axe-core
3. **Performance**: Core Web Vitals within acceptable ranges
4. **Mobile Responsiveness**: Test across device sizes
5. **Content Hierarchy**: H1-H6 semantic structure validation

### Functional Testing

```typescript
// Test scenarios to verify
1. All CTA buttons navigate correctly
2. Age level toggle works in preview section
3. GitHub integration displays accurate stats
4. Responsive layout maintains readability
5. SEO meta tags render correctly
6. Images load with proper fallbacks
```

---

## 🎨 Design Specifications

### Section Layout Pattern

```typescript
// Standard section wrapper
const SectionWrapper = component$(({ children, bgColor = "white" }: {
  children: any;
  bgColor?: "white" | "gray-50" | "primary-50";
}) => {
  return (
    <section class={`py-16 bg-${bgColor}`}>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
});
```

### Typography Scale

```css
/* Heading hierarchy for new sections */
.section-title {
  @apply text-3xl sm:text-4xl font-bold text-gray-900 mb-6;
}

.section-subtitle {
  @apply text-xl text-gray-600 mb-8 leading-relaxed;
}

.section-content {
  @apply text-gray-700 leading-relaxed;
}
```

### Color Scheme Enhancement

- **Primary**: Maltese red (#cf142b) for CTAs and accents
- **Secondary**: Warm grays for text and backgrounds
- **Success**: Green for contribution stats
- **Info**: Blue for educational content highlights

---

## 📊 Success Metrics

### User Engagement

- Increased time on page
- Higher click-through rates on CTAs
- Reduced bounce rate from landing page

### Technical Performance

- Lighthouse score ≥90 across all categories
- First Contentful Paint <1.5s
- Cumulative Layout Shift <0.1

### SEO Improvements

- Enhanced search rankings for targeted keywords
- Improved meta description click-through rates
- Better social media sharing engagement

---

## 🔗 Reference Documentation

- [GitHub Repository](https://github.com/alexportelli12/constitution-explained)
- [Qwik Documentation](https://qwik.dev/docs/overview/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SEO Best Practices](https://ahrefs.com/blog/seo-best-practices/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Current Site](https://constitution-explained.firebaseapp.com)

---

## 🧠 Implementation Notes

### Code Quality Requirements

- Follow existing TypeScript patterns with strict mode
- Maintain component export structure via `src/components/index.ts`
- Use semantic HTML elements (`<section>`, `<article>`, `<nav>`)
- Implement proper ARIA labels for accessibility
- Never use `setTimeout` for state management
- Never use inline styles - create custom CSS classes when Tailwind is insufficient

### Content Strategy

- Emphasize civic responsibility and democratic values
- Highlight accessibility across age groups (5yr to citizen level)
- Connect constitutional knowledge to personal empowerment
- Promote open-source collaboration and transparency

### Performance Considerations

- Lazy load non-critical sections
- Optimize hero image with responsive variants
- Use Qwik's resumability features effectively
- Minimize JavaScript bundle size

---

## 🎯 Confidence Rating: 9/10

This PRP provides comprehensive context, specific implementation details, and clear validation criteria. The existing codebase analysis ensures compatibility with current patterns and components. The structured approach with phases, validation gates, and success metrics enables systematic implementation and testing.

**Why 9/10**: All necessary context is provided, implementation is clearly mapped to existing patterns, and validation criteria are executable. The only uncertainty is around specific content copy, which can be refined during implementation.
