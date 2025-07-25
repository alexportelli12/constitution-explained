# Maltese Constitution Explained 🇲🇹 ⚡️

<p align="center">
  <strong>A civic education platform that simplifies the Constitution of Malta by offering age-appropriate explanations.</strong>
</p>

<p align="center">
  <a href="https://github.com/yourusername/constitution-explained/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://qwik.dev/">
    <img src="https://img.shields.io/badge/Qwik-Framework-blueviolet.svg" alt="Qwik Version">
  </a>
  <a href="https://firebase.google.com/">
    <img src="https://img.shields.io/badge/Firebase-Enabled-orange.svg" alt="Firebase">
  </a>
</p>

---

## 🎯 Overview

**Maltese Constitution Explained** makes the Constitution of Malta more accessible by breaking down each chapter into simplified explanations for different age groups: 5, 10, 15, adults, and the original text.

### ✨ Key Features

- 📜 **Chapter Viewer** - Read Maltese constitutional chapters with detailed explanations
- 👶 **Age-Level Toggle** - View explanations tailored for 5-year-olds, 10-year-olds, 15-year-olds, citizens, or original text
- 🗂️ **Chapter Directory** - Browse all constitutional chapters with search and navigation
- 📖 **Constitution Overview** - Comprehensive introduction to the Constitution by age level
- 🖼️ **Hero Images** - Visual chapter representations with skeleton loading states
- 📁 **Static Asset Storage** - Markdown content served as optimized static assets
- 💬 **Open Source Collaboration** - Community-driven content improvement
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🧠 **AI-Aware Architecture** - Structured for Claude Code compatibility

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+)
- **npm**
- **Firebase CLI**
- **Qwik CLI**

### Installation

```bash
# Clone the repo
git clone https://github.com/alexportelli/constitution-explained.git
cd constitution-explained

# Install dependencies
npm install

# Start development server
npm start
```

---

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Qwik + QwikCity + TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom components
- **State Management**: Qwik Signals + Context API
- **Hosting**: Firebase Hosting with SPA configuration
- **Content**: Age-separated Markdown files served as static assets
- **Development**: ESLint + Prettier + TypeScript strict mode
- **AI Tooling**: Claude Code context (.context, PRPs folders)

### Project Structure

```
constitution-explained/
├── context/                # Claude context files
├── PRPs/                   # Product Requirement Prompts
├── public/
│   ├── constitution/       # Markdown files as static assets
│   │   ├── chapters/      # Chapter content by age level
│   │   └── overview/      # Overview content by age level
│   └── images/            # Static images and assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── constants/         # Age levels and chapters configuration
│   ├── contexts/          # React contexts for state management
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Markdown parsing/fetching logic
│   ├── models/            # TypeScript interfaces and types
│   ├── utils/             # Utility functions
│   └── routes/            # Pages (home, chapters, overview)
└── CLAUDE.md              # Project overview for Claude
```

---

## 🛡️ Security & Privacy

- 📁 Static file serving for secure chapter access
- 🔍 No user authentication in MVP (read-only access)
- 📁 Markdown-based content model (easy to audit and verify)
- 📡 Static site generation with Firebase hosting

---

## 🧪 Testing

```bash
# Run development server for manual testing
npm start

# Type checking
npm run build.types

# Linting
npm run lint

# Format checking
npm run fmt.check
```

Current testing approach is manual QA with automated unit/component testing planned for future releases.

---

## 🚀 Deployment

```bash
# Deploy to Firebase
firebase login
firebase deploy
```

Supports single-page app routing and Markdown chapter hosting via static files.

---

### Development Workflow

1. **Fork** the repository
2. **Create** a new branch: `feature/chapter-toggle`
3. **Follow** project conventions from [CLAUDE.md](CLAUDE.md)
4. **Submit** a Pull Request with clear description
5. **Review** and merge after approval

---

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)**: High-level overview and coding standards
- **[context/PLANNING.md](context/PLANNING.md)**: Feature planning and routes
- **[context/INITIAL.md](context/INITIAL.md)**: MVP setup and first tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built with ⚡️ Qwik • Powered by 🔥 Firebase • Designed for 🇲🇹 citizens</strong>
</p>

## Static Site Generator (Node.js)

Be sure to configure your server to serve very long cache headers for the `build/**/*.js` files.

Typically you'd set the `Cache-Control` header for those files to `public, max-age=31536000, immutable`.

```shell
npm run build.server
```
