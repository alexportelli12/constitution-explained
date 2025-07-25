# Constitution Codebase Refactor PRP — Consolidation, Standards & Import Hygiene

## 🥅 Goal

Execute a comprehensive codebase refactor to eliminate code repetition, establish consistent import hygiene via `index.ts` files, unify age level constant usage, and optimize component organization structure.

## 💡 Why

- **Code Maintainability**: Reduce duplication by consolidating repeated patterns into reusable utilities and components
- **Import Clarity**: Establish clean import paths through standardized `index.ts` files in all TypeScript directories
- **Type Safety**: Eliminate hardcoded age level strings in favor of centralized type-safe constants
- **Architectural Consistency**: Flatten component structure and ensure predictable file organization
- **Future-Proofing**: Make the codebase more resilient to changes and easier to extend

## 📐 What

### Core Refactor Areas

1. **Code Repetition Elimination**

   - Extract duplicated URL parameter handling logic into reusable hooks
   - Consolidate level description functionality
   - Create reusable content loading patterns

2. **Import Hygiene Implementation**

   - Add `index.ts` files to all directories containing `.ts`/`.tsx` files
   - Update all import statements to use cleaner paths
   - Ensure consistent re-export patterns

3. **Age Level Constant Unification**

   - Replace all hardcoded age level strings with imports from `age-levels.constant.ts`
   - Update TypeScript interfaces to use the `AgeLevel` type
   - Fix inconsistent age level usage across components

4. **Component Structure Optimization**
   - Flatten unnecessary component subdirectories
   - Ensure all components are exported via `components/index.ts`
   - Maintain only complex composite components in subdirectories

### ✅ Success Criteria

- [ ] No code duplication for URL parameter handling, level descriptions, or content loading
- [ ] All directories with `.ts`/`.tsx` files have `index.ts` exports
- [ ] All hardcoded age level strings replaced with type-safe constants
- [ ] Component structure is flat with consistent exports
- [ ] All imports use clean, predictable paths
- [ ] Build, lint, and type checks pass without errors
- [ ] No breaking changes to existing functionality

---

## 📚 All Needed Context

### 📄 Documentation & References

```yaml
- file: CLAUDE.md
  why: Contains architectural standards and anti-patterns to follow

- file: context/INITIAL.md
  why: Defines the specific refactor requirements and validation commands

- file: src/constants/age-levels.constant.ts
  why: Source of truth for age level constants and types

- file: src/models/chapter.model.ts
  why: Contains interfaces that need age level type updates

- file: src/components/index.ts
  why: Central component export file that needs updates

- url: https://qwik.dev/docs/components/overview/
  why: Qwik component best practices and patterns
```

### 🗂️ Current Codebase Structure (Key Areas)

```bash
src/
├── components/
│   ├── AgeLevelToggle.tsx               # ✅ Uses age-levels.constant
│   ├── AgeLevelPreview.tsx              # ❌ Has hardcoded age level strings
│   ├── OfficialLegislationLink/         # ❌ Subdirectory should be flattened
│   │   ├── OfficialLegislationLink.tsx
│   │   └── index.ts
│   ├── ReadingLevelsTip/                # ❌ Subdirectory should be flattened
│   │   ├── ReadingLevelsTip.tsx
│   │   └── index.ts
│   ├── router-head/                     # ❌ Subdirectory should be flattened
│   │   └── router-head.tsx
│   └── index.ts                         # ✅ Central exports
├── constants/                           # ❌ Missing index.ts
│   ├── age-levels.constant.ts
│   └── chapters.constant.ts
├── lib/                                 # ❌ Missing index.ts
│   └── fetchMarkdown.ts
├── models/                              # ❌ Missing index.ts
│   └── chapter.model.ts                 # ❌ Has hardcoded age level types
├── utils/                               # ❌ Missing index.ts
│   └── chapter.utils.ts
└── routes/
    ├── chapters/[chapter]/index.tsx     # ❌ Has repeated URL/level logic
    └── overview/index.tsx               # ❌ Has repeated URL/level logic
```

### 🔭 Desired Structure After Refactor

```bash
src/
├── components/
│   ├── OfficialLegislationLink.tsx      # MOVED: Flattened from subdirectory
│   ├── ReadingLevelsTip.tsx             # MOVED: Flattened from subdirectory
│   ├── RouterHead.tsx                   # MOVED: Flattened from router-head/
│   └── index.ts                         # UPDATED: New exports
├── constants/
│   └── index.ts                         # NEW: Export all constants
├── hooks/                               # NEW: Custom hooks directory
│   ├── useAgeLevelUrl.ts               # NEW: URL parameter handling
│   ├── useContentLoader.ts             # NEW: Content loading pattern
│   └── index.ts                         # NEW: Hook exports
├── lib/
│   └── index.ts                         # NEW: Library exports
├── models/
│   └── index.ts                         # NEW: Model exports
├── utils/
│   ├── age-levels.utils.ts             # NEW: Level description utility
│   └── index.ts                         # NEW: Utility exports
```

### ⚠️ Known Gotchas

```ts
// GOTCHA: AgeLevelPreview has hardcoded strings in sampleContent object
const sampleContent = {
  "5-year-old": "...", // Should use AGE_LEVELS[0] or similar approach
};

// GOTCHA: ChapterContent interface uses string literals instead of AgeLevel type
interface ChapterContent {
  level: "5-year-old" | "10-year-old" | "15-year-old" | "citizen"; // Should use AgeLevel
}

// GOTCHA: Both chapter and overview routes have identical URL parameter logic
const getInitialLevel = $(() => {
  // This pattern is duplicated exactly
});

// GOTCHA: Level description function is duplicated in both routes
const getLevelDescription = $((level: string) => {
  // Identical switch statement in both files
});

// GOTCHA: router-head component uses kebab-case filename, others use PascalCase
// Must maintain consistent naming when flattening

// GOTCHA: OfficialLegislationLink and ReadingLevelsTip are in subdirectories
// These should be flattened to component root level like other atomic components

// GOTCHA: root.tsx imports RouterHead from components index
// This import will need updating after flattening
```

---

## 🛠️ Implementation Blueprint

### 📦 New Files to Create

```typescript
// src/hooks/useAgeLevelUrl.ts
export const useAgeLevelUrl = () => {
  // Extract URL parameter handling logic
  // Return { activeLevel, handleLevelChange, getInitialLevel }
};

// src/hooks/useContentLoader.ts
export const useContentLoader = <T>() => {
  // Extract content loading pattern
  // Return { content, loadContent, isLoading }
};

// src/utils/age-levels.utils.ts
export const getLevelDescription = (level: AgeLevel): string => {
  // Extract level description logic
};

// src/constants/index.ts, src/lib/index.ts, etc.
export * from "./file-name";
```

### 📋 Task List (Ordered by Dependencies)

```yaml
Task 1: Create Index Files
  CREATE src/constants/index.ts
  CREATE src/lib/index.ts
  CREATE src/models/index.ts
  CREATE src/utils/index.ts

Task 2: Fix Age Level Type Issues
  UPDATE src/models/chapter.model.ts
  - Replace hardcoded strings with AgeLevel type
  UPDATE src/components/AgeLevelPreview.tsx
  - Use AGE_LEVELS constant instead of hardcoded strings

Task 3: Extract Repeated Logic
  CREATE src/hooks/useAgeLevelUrl.ts
  - Extract URL parameter handling from routes
  CREATE src/utils/age-levels.utils.ts
  - Extract getLevelDescription function
  CREATE src/hooks/useContentLoader.ts
  - Extract content loading pattern

Task 4: Flatten Component Structure
  MOVE src/components/OfficialLegislationLink/OfficialLegislationLink.tsx → src/components/OfficialLegislationLink.tsx
  DELETE src/components/OfficialLegislationLink/ directory
  MOVE src/components/ReadingLevelsTip/ReadingLevelsTip.tsx → src/components/ReadingLevelsTip.tsx
  DELETE src/components/ReadingLevelsTip/ directory
  MOVE src/components/router-head/router-head.tsx → src/components/RouterHead.tsx
  DELETE src/components/router-head/ directory
  UPDATE src/components/index.ts with new exports

Task 5: Update All Imports
  UPDATE all files to use new index.ts imports
  UPDATE component imports to use flattened structure

Task 6: Refactor Route Components
  UPDATE src/routes/chapters/[chapter]/index.tsx
  - Use new hooks instead of duplicated logic
  UPDATE src/routes/overview/index.tsx
  - Use new hooks instead of duplicated logic

Task 7: Create Missing Hook Directory
  CREATE src/hooks/index.ts for hook exports

Task 8: Update Repository Documentation
  UPDATE CLAUDE.md
  - Add rule that components should be at root level unless complex composites
  - Document index.ts requirement for all TypeScript directories
  - Add import path standardization guidelines
  UPDATE context/PLANNING.md
  - Document the refactor outcomes and new architectural standards
  - Add component organization best practices
```

### 🔁 Pseudocode (Key Extractions)

```typescript
// useAgeLevelUrl.ts - Extract URL parameter handling
export const useAgeLevelUrl = () => {
  const loc = useLocation();
  const nav = useNavigate();

  const getInitialLevel = $(() => {
    const levelParam = loc.url.searchParams.get("level");
    return AGE_LEVELS.includes(levelParam as any) ? levelParam! : "citizen";
  });

  const handleLevelChange = $((level: string) => {
    // Update URL with new level parameter logic
  });

  // Return reusable functions and computed values
};

// age-levels.utils.ts - Extract level description
export const getLevelDescription = (level: AgeLevel): string => {
  const descriptions: Record<AgeLevel, string> = {
    "5-year-old": "5 years old",
    "10-year-old": "10 years old",
    "15-year-old": "15 years old",
    citizen: "an adult citizen",
  };
  return descriptions[level];
};
```

---

## 🔌 Integration Points

```yaml
HOOK INTEGRATION:
  - Routes will import custom hooks instead of duplicating logic
  - Hooks encapsulate URL parameter management and content loading

CONSTANT UNIFICATION:
  - All age level references go through constants/age-levels.constant.ts
  - TypeScript interfaces use AgeLevel type for type safety

IMPORT STANDARDIZATION:
  - All imports use index.ts files for clean paths
  - Component imports use flattened structure

COMPONENT ORGANIZATION:
  - All atomic components at root level of components/
  - Only complex composite components with multiple files keep subdirectories
  - All components exported via components/index.ts
  - Consistent PascalCase naming for all component files
```

---

## ✅ Validation Loop

### Level 1: Manual and Visual Checks

```bash
# Verify development server works
npm start

# Check that routes still function correctly
# Verify age level toggles work
# Confirm content loading works
```

### Level 2: Build and Quality Checks

```bash
# Confirm working build
npm run build

# Confirm formatting
npm run fmt.check

# Confirm linting
npm run lint

# Confirm TypeScript compilation
npm run build.types

# Alternative TypeScript check
tsc --noEmit
```

### Level 3: Import Resolution Verification

```bash
# Verify all exports/imports resolve cleanly
tsc --noEmit

# Check for any circular dependencies
npm run build
```

---

## 📋 Final Validation Checklist

**Code Repetition Elimination:**

- [ ] No duplicated URL parameter handling logic between routes
- [ ] No duplicated level description functions
- [ ] No duplicated content loading patterns

**Import Hygiene:**

- [ ] All directories with `.ts`/`.tsx` files have `index.ts` exports
- [ ] All imports use clean paths through index files
- [ ] No deep relative imports (e.g., `../../../constants/file`)

**Age Level Constant Unification:**

- [ ] All hardcoded age level strings replaced with constants
- [ ] ChapterContent and OverviewContent use AgeLevel type
- [ ] AgeLevelPreview uses AGE_LEVELS constant

**Component Structure:**

- [ ] OfficialLegislationLink component flattened to root level
- [ ] ReadingLevelsTip component flattened to root level
- [ ] router-head component flattened to RouterHead.tsx
- [ ] All components properly exported via components/index.ts
- [ ] No unnecessary component subdirectories
- [ ] root.tsx import updated to use flattened RouterHead

**Build Quality:**

- [ ] `npm run build` passes without errors
- [ ] `npm run lint` passes without warnings
- [ ] `npm run fmt.check` passes without issues
- [ ] `tsc --noEmit` confirms all types resolve

**Functional Verification:**

- [ ] Age level toggles work on all routes
- [ ] URL parameters update correctly
- [ ] Content loads properly for all age levels
- [ ] No breaking changes to existing functionality

**Documentation Updates:**

- [ ] CLAUDE.md updated with new component organization rules
- [ ] CLAUDE.md includes index.ts requirement documentation
- [ ] context/PLANNING.md documents refactor outcomes and standards

---

## 🚫 Anti-Patterns to Avoid

- ❌ **Over-abstracting**: Only extract patterns used 2+ times or likely to be extended
- ❌ **Breaking imports**: Ensure all import updates maintain functionality
- ❌ **Inconsistent naming**: Follow existing PascalCase for components, camelCase for utilities
- ❌ **Removing type safety**: All age level usage must maintain TypeScript safety
- ❌ **Complex index files**: Keep index.ts files simple with re-exports only
- ❌ **Circular dependencies**: Ensure clean dependency hierarchy
- ❌ **setTimeout usage**: Never use setTimeout for state management (per CLAUDE.md)
- ❌ **Inline styles**: Avoid inline styles, use CSS classes (per CLAUDE.md)

---

## 🧠 Confidence Rating

**Rating: 9/10**

This PRP provides comprehensive context, specific file references, clear task ordering, and executable validation steps. The refactor addresses well-defined repetition patterns and follows established architectural standards. The main risk areas (import updates, component flattening) are clearly documented with specific gotchas identified.

**Success Factors:**

- Detailed analysis of current codebase structure
- Clear identification of repetition patterns
- Step-by-step task breakdown with dependencies
- Comprehensive validation checklist
- Specific code examples and pseudocode
- Full context of existing conventions and standards

**Potential Risk Mitigation:**

- Start with index.ts creation (low risk)
- Extract utilities before updating consumers
- Test each major change before proceeding
- Maintain backwards compatibility throughout process
