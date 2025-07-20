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

**Maltese Constitution Explained** makes the Constitution of Malta more accessible by breaking down each article into simplified explanations for different age groups: 5, 10, 15, adults, and the original text.

### ✨ Key Features

- 📜 Article Viewer - Read Maltese constitutional articles one at a time
- 👶 Age-Level Toggle - View explanations simplified for age 5, 10, 15, adults, or read the original legal version
- 🔍 Article Directory - Search and filter through all Maltese Constitution articles
- 📁 Static Asset Storage - Host Markdown articles as static assets in the public folder
- 💬 Open Source Collaboration - Community can contribute to simplify content
- 📱 Mobile-First Design - Fully responsive across devices
- 🧠 AI-Aware Planning - Designed with Claude Code-compatible project specs

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

- **Frontend**: Qwik + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase Hosting
- **Content**: Markdown files parsed at runtime
- **AI Tooling**: Claude Code context (.context, PRPs folders)

### Project Structure

```
constitution-explained/
├── .context/               # Claude context files
├── PRPs/                   # Product Requirement Prompts
├── public/articles/        # Markdown files as static assets
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── lib/                # Markdown parsing/fetching logic
│   └── routes/             # Pages (home, article list, detail)
└── CLAUDE.md               # Project overview for Claude
```

---

## 🛡️ Security & Privacy

- 📁 Static file serving for secure article access
- 🔍 No user authentication in MVP (read-only access)
- 📁 Markdown-based content model (easy to audit and verify)

---

## 🧪 Testing

```bash
# Run dev server and manually test components and routes
npm start
```

Test strategy for MVP will be manual with unit/component testing added in future releases.

---

## 🚀 Deployment

```bash
# Deploy to Firebase
firebase login
firebase deploy
```

Supports single-page app routing and Markdown asset hosting via static files.

---

### Development Workflow

1. **Fork** the repository
2. **Create** a new branch: `feature/article-toggle`
3. **Follow** project conventions from [CLAUDE.md](CLAUDE.md)
4. **Submit** a Pull Request with clear description
5. **Review** and merge after approval

---

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)**: High-level overview and coding standards
- **[.context/PLANNING.md](.context/PLANNING.md)**: Feature planning and routes
- **[.context/INITIAL.md](.context/INITIAL.md)**: MVP setup and first tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built with ⚡️ Qwik • Powered by 🔥 Firebase • Designed for 🇲🇹 citizens</strong>
</p>
