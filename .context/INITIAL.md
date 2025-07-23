## FEATURE:

Full Codebase Refactor: Consolidation, Standards, and Import Hygiene

## DOCUMENTATION:

- `src/constants/age-levels.constant.ts` – defines the standard age levels used throughout the application. These must be reused wherever possible.
- `components/` folder – all components should live at the root of the folder, and be exported via a single `index.ts` file.
- Existing documentation files:
  - [`CLAUDE.md`](../../CLAUDE.md) — Update with standards regarding file structure and reusable component creation.
  - [`PLANNING.md`](../../.context/PLANNING.md) — Document any abstraction strategies or reusable logic consolidation.

## OTHER CONSIDERATIONS:

### 🎯 Refactor Goals

1. **Code Repetition Cleanup**:

   - Scan all routes and components for repeated logic, styling, or markup.
   - Consolidate repeating patterns into utility functions or new reusable components.
   - Prioritize abstraction **only** if reused 2+ times or likely to be extended in the future.
   - Document this practice in the CLAUDE.md and PLANNING.md files.

2. **Import Hygiene via `index.ts` Files**:

   - Adopt the convention that **any folder containing `.ts`/`.tsx` files must expose them via an `index.ts`**.
   - This improves import clarity and avoids deeply nested file path references.
   - Update `CLAUDE.md` and `PLANNING.md` to include this as a **non-optional architectural standard**.

3. **Age Level Constant Unification**:

   - Any references to 5-year-old, 10-year-old, 15-year-old, and citizen must use the `age-levels.constant.ts` file.
   - Refactor interfaces (e.g., `ChapterContent`) and conditional checks to avoid string literals for age level values.
   - This improves resilience across components and avoids mismatch bugs.

4. **Component Folder Cleanup**:
   - Flatten the `components/` directory by moving any child components to the root level.
   - Update `components/index.ts` to export all of them.
   - Add a documented rule that nested folders for components should only exist for **complex composite components**, not single-use or atomic components.

### 📌 Additional Best Practices

- Do not extract one-off styles or logic unless you’re sure of re-use.
- Avoid over-abstracting—only extract patterns that appear more than once or are likely to recur.
- Run lint, format, and build checks after structural changes.

### ✅ Validation Commands

```bash
# Confirm working build
npm run build

# Confirm formatting
npm run fmt.check

# Confirm linting
npm run lint

# Confirm all exports/imports resolve cleanly
tsc --noEmit
```

```

```
