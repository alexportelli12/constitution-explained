# Create PRP — Constitution Explained (Qwik)

## 📂 Feature File: `$ARGUMENTS`

Generate a complete PRP (Product Requirement Prompt) for a **feature, bug fix, or architectural change** with full context for AI agents (Claude, GPT, etc.). Ensure that context, references, and expectations are clearly passed into the PRP for **self-validation, one-pass success**, and iterative refinement.

### 📝 What is a PRP?

**PRP** stands for **Product Requirement Prompt** - a detailed implementation specification that outlines feature requirements, component structure, and step-by-step implementation instructions for developers and AI agents.

> ⚠️ The AI agent only receives the PRP + training data. It **does not inherently know** the context of your feature or your reasoning unless you **pass it through this PRP**.
> Assume the agent has codebase access and your level of training-cutoff knowledge. Use links and real examples generously.

---

## 🧪 Research Process

### 1. 🔍 Codebase Analysis

- Search for related Qwik components, routes, signals, and utilities
- Identify patterns in:

  - `component$()` syntax and usage
  - Markdown loading and content parsing (`fetchMarkdown.ts`)
  - Toggle state logic for age-level explanations

- Review [`CLAUDE.md`](../../CLAUDE.md) and [`PLANNING.md`](../../.context/PLANNING.md) for architecture and design rules

### 2. 🌐 External Research

- Qwik documentation: https://qwik.dev/docs
- Static asset serving and fetch API patterns
- Markdown parsing with regex or libraries (e.g., `marked`, `remark`)
- QwikCity route and layout patterns
- Firebase hosting and SPA fallback considerations

### 3. ❓ User Clarification (if needed)

Ask:

- Is this for the MVP, or a post-MVP enhancement?
- Should fallback content be included when static asset fetching fails?
- Are there any content format assumptions (e.g., frontmatter, `##` section ordering)?
- Should this affect multilingual rollout or future roadmap?

---

## 🛠️ PRP Generation

Use `PRPs/templates/prp_base.md` as the base. Your PRP must include:

---

### 📘 Critical Context for AI Agent

✅ Required:

- Code snippets from `src/components`, `src/routes`, or `src/lib`
- Static asset fetching examples (fetch API, error handling)
- Qwik conventions in use (e.g., `useSignal()`, `useVisibleTask$()`)
- Markdown format structure used in articles
- File references for toggles, routing, and parsing logic

---

### 🧱 Implementation Blueprint

Include:

- **Pseudocode** for logic and edge cases
- Referenced components and routes to mirror
- **Error handling expectations** (e.g., render fallback article or error message)
- **Subtasks** in ideal execution order (e.g., lib → route → component → test)

---

### ✅ Validation Gates (Must Be Executable)

```bash
# Preview build
npm run preview

# Build check
npm run build

# Type check
npm run build.types

# Lint & formatting
npm run lint
npm run fmt.check
```

Add custom test cases if the feature involves parsing, UI rendering, or static asset fetching.

---

## ⚠️ BEFORE WRITING

**CRITICAL**: After you’ve explored the codebase and done your research, **pause** and:

> ✴️ ULTRATHINK about the implementation — imagine every prop, fetch, signal, and rendering edge case before writing code.

---

## 📄 Output

Save the file to:
`PRPs/{feature-name}.md`

Use `kebab-case` for filenames.

---

## ✅ Quality Checklist

- [ ] All necessary context included
- [ ] AI can execute and validate code based on PRP instructions
- [ ] Real code references provided
- [ ] Implementation steps are clearly ordered
- [ ] Error handling accounted for
- [ ] Links to documentation and known issues included

---

### 🧠 Confidence Rating

After writing the PRP, rate it:

> **1–10** based on confidence that Claude or another coding AI could **successfully complete the task in one pass**
