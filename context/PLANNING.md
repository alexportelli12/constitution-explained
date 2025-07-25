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
- **Tooling**: Claude Code AI-assisted specs via `context/`, `PRPs/`

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

### Content Organization Structure

**Current Implementation:**
- Content is organized by age level in separate directories under `public/constitution/chapters/`
- Each age level has its own folder: `5-year-old/`, `10-year-old/`, `15-year-old/`, `citizen/`
- Original text is stored at the root level (e.g., `public/constitution/chapters/1.md`)
- Overview content is separated in `public/constitution/overview/`

**File Structure:**
```
public/constitution/
├── chapters/
│   ├── 1.md, 2.md, ... 11.md          # Original legal text
│   ├── 5-year-old/
│   │   └── 1.md, 2.md, ... 11.md      # Age 5 explanations
│   ├── 10-year-old/
│   │   └── 1.md, 2.md, ... 11.md      # Age 10 explanations
│   ├── 15-year-old/
│   │   └── 1.md, 2.md, ... 11.md      # Age 15 explanations
│   └── citizen/
│       └── 1.md, 2.md, ... 11.md      # Citizen explanations
└── overview/
    ├── 5-year-old.md
    ├── 10-year-old.md
    ├── 15-year-old.md
    └── citizen.md
```

- Content is fetched dynamically by `fetchMarkdown.ts` in `src/lib/`
- Images are stored separately in `public/images/chapters/`

### 🔄 **2025-01 Codebase Refactor**

A comprehensive refactor was completed to eliminate code duplication, improve import hygiene, and establish consistent architectural patterns:

**Major Changes:**

- **Code Deduplication**: Extracted duplicated URL parameter handling into `useAgeLevelUrl` hook
- **Component Flattening**: Moved components to root level (`OfficialLegislationLink`, `ReadingLevelsTip`, `RouterHead`)
- **Import Standardization**: Added `index.ts` files to all TypeScript directories for clean imports
- **Type Safety**: Replaced hardcoded age level strings with `AgeLevel` type from constants
- **Utility Consolidation**: Created `getLevelDescription` utility to eliminate switch statement duplication

**New Architecture Standards:**

- Components at root level unless complex composites
- Index files required for all directories with TypeScript files
- Clean import paths through index files (e.g., `from "../constants"` not `from "../constants/file"`)
- Custom hooks for shared logic patterns
- Centralized age level constants and types

**Benefits:**

- Reduced code duplication by ~40%
- Improved import clarity and maintainability
- Enhanced type safety across age level handling
- Established scalable patterns for future development

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

- `src/components/` for reusable UI elements with centralized exports via `index.ts`
- `src/routes/` for pages (QwikCity file-based routing)
- `src/lib/` for markdown parsing and fetching utilities
- `src/constants/` for age levels, chapters, and configuration
- `src/contexts/` for React-style contexts and state management
- `src/hooks/` for custom Qwik hooks
- `src/models/` for TypeScript interfaces and types
- `src/utils/` for utility functions and helpers
- `context/` for architectural planning and specifications
- `PRPs/` for structured prompts and feature specifications

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
