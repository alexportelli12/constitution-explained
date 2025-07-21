# PLANNING.md — Constitution Explained Architecture

## 🎯 **Project Goals**

A mobile-first civic education platform that simplifies the Maltese Constitution into age-appropriate explanations. The goal is to promote legal literacy by making constitutional law accessible to everyone, using a friendly, readable interface built with Qwik and Firebase.

---

## 🏗️ **Architecture Overview**

### Technical Stack

- **Frontend**: Qwik + QwikCity with TypeScript (strict mode)
- **UI Library**: Qwik UI + Tailwind CSS
- **Content Source**: Markdown files stored as static assets in the public folder
- **Backend**: Firebase Hosting
- **Testing**: Playwright (E2E) + Vitest (unit/component, planned)
- **Internationalization**: English (MVP), Maltese (future)
- **Tooling**: Claude Code AI-assisted specs via `.context/`, `PRPs/`

### Key Architectural Decisions

- **Markdown-Driven Content**: Each chapter and its simplified versions live in a single Markdown file
- **Client-Fetched Content**: Markdown is served as static assets and parsed at runtime
- **Component-Based Rendering**: Explanation toggles, layout logic, and markdown rendering are split into reusable components
- **AI-Aware Planning**: Structured prompts and context used for spec-first dev with Claude

---

## 🗺️ **Route Structure & Planning**

### 🏠 **Public Routes**

#### **Home Page** (`/`)

- **Purpose**: Welcome, explain project goals, and guide to start
- **Features**:
  - CTA to browse Constitution
  - Overview of simplification strategy

#### **Chapters List** (`/chapters`)

- **Purpose**: List all constitutional chapters
- **Features**:
  - Search/filter chapters
  - Links to each chapter page
  - Show chapter title and number

#### **Chapter Detail** (`/chapters/:id`)

- **Purpose**: Display individual article with age-level toggle
- **Features**:
  - Toggle between 5, 10, 15, adult, and original versions
  - Markdown-rendered content sections
  - Navigation to next/previous chapters

---

## 🛡️ **Security & Access Control**

### Access

- Public access for all routes and article files
- Auth may be introduced for admin review features later

### Data Handling

- Markdown files served as static assets from the public folder
- No sensitive user data handled in MVP

---

## 🎨 **UI/UX Constraints**

### Design System

- **Mobile-First**: Layouts optimized for phones first
- **Dark Mode**: Planned for future
- **Typography**: Readability-focused styles
- **WCAG Compliance**: Accessibility in focus (planned for Phase 2)

### Performance Considerations

- **Fast Load Times**: Qwik SSR and resumability
- **Lazy Loading**: Markdown content fetched only on demand
- **Minimal JS**: Prioritize static HTML where possible

---

## 🧠 **Content & Data Strategy**

### Markdown Structure Example

```md
---
id: article_1
title: Article 1 - The Republic of Malta
---

## original

Legal text here...

## explain_5

Simple version for 5-year-olds...

## explain_10

Simplified for 10-year-olds...

## explain_15

More detailed explanation...

## explain_adult

Plain language adult version...
```

- Content is stored as static assets under `public/constitution/`
- Fetched dynamically by `fetchMarkdown.ts` in `src/lib/`

---

## 🧪 **Testing Strategy**

- Unit testing for utility functions and components (Vitest)
- Manual QA for UI rendering and toggle logic
- Markdown parsing tests planned for post-MVP

---

## 🚀 **Deployment & Environments**

### Firebase Configuration

- Hosting: SPA with fallback to `index.html`
- Static Assets: Public access to `/constitution/` directory in public folder
- CLI: `firebase deploy`

---

## 📝 **Development Workflow**

### File Organization

- `src/components/` for reusable elements with centralized exports via `index.ts`
- `src/routes/` for pages (QwikCity)
- `src/lib/` for markdown/Firebase helpers
- `.context/` for planning/specs
- `PRPs/` for structured prompts and feature specs

### Component Organization Standards

- **Central Exports**: All components must be re-exported from `src/components/index.ts` using `export * from "./ComponentName"`
- **Import Pattern**: Use `import { ComponentName } from "../components"` instead of direct file paths
- **Export Pattern**: Use `export * from "./ComponentName"` for re-exports, no default exports for components
- **Subdirectories**: Complex components with multiple files go in subdirectories (e.g., `router-head/`)

### Code Quality

- ESLint + Prettier for formatting and consistency
- Component splitting for readability
- Type safety via strict TypeScript config

---

## 🔄 **Future Enhancements**

### Planned Features

- **Multilingual Support**: Add Maltese translations
- **Contributor Flow**: Let users submit or edit explanations
- **Dark Mode**: Theme toggle
- **Bookmarking**: Let users save favorite chapters

### Technical Debt

- Testing coverage
- Markdown caching strategy
- Better content fallback on fetch failure
- Offline support (PWA)
