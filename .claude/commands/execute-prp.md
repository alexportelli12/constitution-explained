# Execute BASE PRP — Constitution Explained (Qwik)

## 📄 PRP File: `$ARGUMENTS`

Implement a feature or fix using the PRP file provided in `PRPs/`.
This document outlines the **step-by-step execution strategy** that both human developers and AI agents must follow.

---

## 🧪 Execution Process

### 1. 📥 **Load PRP**

- Open the specified PRP from `PRPs/{feature-name}.md`
- Understand all:

  - Functional expectations
  - Component responsibilities
  - Content rendering and parsing logic
  - Static asset interactions

- Ensure you fully understand:

  - How it fits into the Qwik + Static Assets + Markdown system
  - Which age-level toggles, pages, and utility functions are affected

- If anything is unclear:

  - Look at similar components or routes in `src/routes/`
  - Review utility logic in `src/lib/`
  - Refer to [`PLANNING.md`](../../context/PLANNING.md) and [`CLAUDE.md`](../../CLAUDE.md)

---

### 2. 🧠 **ULTRATHINK First**

> Think deeply and deliberately before coding.

- Break the PRP into subtasks
- Use `TodoWrite` or comment-based checklists to log them
- For each subtask:

  - Find existing Qwik patterns
  - Reuse and generalize where possible
  - Respect coding standards from [`CLAUDE.md`](../../CLAUDE.md)

Example subtasks:

```
- Add toggle component for age levels
- Create markdown parser to extract explanation blocks
- Build /article/:id route to fetch from static assets
- Display fallback if article not found
```

---

### 3. 🛠️ **Execute the Plan**

- Follow subtasks methodically
- Use Qwik conventions: `component$()`, `useVisibleTask$()`, `useSignal()`, etc.
- Don't bypass static asset fetching — reuse helpers in `src/lib/`
- Always respect file structure and readability

---

### 4. ✅ **Validate**

Run manual and automated checks:

```bash
# Preview locally
npm run preview

# Build verification
npm run build

# Type safety check
npm run build.types

# Lint and format
npm run lint
npm run fmt.check
```

> Re-run validation until everything passes.
> If something breaks, debug with real Markdown content or fallback files.

---

### 5. 📚 **Update Documentation**

**IMPORTANT**: After successfully implementing the PRP, update documentation to reflect changes:

- **README.md**: Update if new features, dependencies, or setup steps were added
- **CLAUDE.md**: Update development commands table if new scripts were added
- **context/PLANNING.md**: Update architecture section if new components, routes, or patterns were introduced
- **Component Documentation**: Ensure any new components are properly exported in `src/components/index.ts`

**When to Update Each File:**
- **README.md**: New user-facing features, changed tech stack, new installation steps
- **CLAUDE.md**: New development commands, coding patterns, or architectural decisions  
- **PLANNING.md**: New routes, significant architectural changes, updated content structure
- **Component Index**: Always update when adding new components

---

### 6. 🧾 **Complete**

- Re-read the PRP to confirm all checklist items are completed
- Update relevant documentation files (see step 5)
- Mark your task in `TASK.md` section
- Commit and push following standard naming conventions

---

### 7. 🔁 **Reference the PRP Freely**

You may return to the PRP at any point to clarify logic, validate your output, or double-check assumptions.

---

> 💡 **Reminder**: If working with Markdown parsing, test with multiple examples and fallbacks. Never assume format uniformity without validation.
