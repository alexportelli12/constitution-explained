# CLAUDE.md — Constitution Explained (Qwik)

## 🧠 **Context & Workflow Expectations**

This file governs how Claude and developers should operate within the Constitution Explained codebase.

### ✅ Before You Start

- **Read [`PLANNING.md`](./.context/PLANNING.md)** for architecture, features, and route structure.
- **Review [`TASK.md`](./.context/TASK.md)**:
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

### 🧱 Architecture

> See [`PLANNING.md`](./.context/PLANNING.md#architecture-overview) for full rationale.

- **Routing**: File-based via `src/routes/` (QwikCity)
- **Components**: Use `component$()` for all Qwik components
- **Data Fetching**: Markdown content is served as static assets from the public folder and parsed client-side
- **UI Logic**: Toggle components manage which age-level explanation is shown
- **Markdown**: Each article stored in its own `.md` file with structured `##` sections (original, explain_5, explain_10, etc.)

---

## 🧪 Testing Guidelines

Testing is encouraged for all utility functions and logic-heavy components.

### 🔍 Coverage Expectations

- ✅ Normal use case
- ⚠️ Edge case
- ❌ Failure scenario

> Test strategy and patterns will be added to [`PLANNING.md`](./.context/PLANNING.md#testing-strategy)

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
- ❌ Don’t invent APIs or code — stick to actual project structure
- ✅ Confirm file/module paths before using
- ❌ Never delete/refactor outside the task list unless explicitly told

---

## 📌 Final Notes

- All major plans and decisions are documented in [`PLANNING.md`](./.context/PLANNING.md)
- Static assets in the public folder house article Markdown files
- Content is pulled client-side and rendered with age-level toggle
- Mobile-first design is a priority
- Open-source collaboration is encouraged
