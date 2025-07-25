## FEATURE:

Enhance Landing Page with Civic Engagement Section + Reposition Open Source Content on Desktop and Mobile

## DOCUMENTATION:

- `src/routes/index.tsx` – Landing page layout
- `src/components/MobileSidebar.tsx` – Mobile sidebar navigation
- Tailwind CSS v4 – styling framework

## OTHER CONSIDERATIONS:

### ✨ What’s Changing

#### 1. 🧠 Add a New Section After the Hero on the Landing Page

- **Title**: Suggested — “Why Should I Learn About the Constitution?”
- **Purpose**: Emotional, civic-focused hook that encourages site engagement
- **Key Messages**:
  - Despite its small size, Malta's path to self-governance is remarkable
  - Our constitution protects our fundamental rights: freedom of speech, right to life, equal protection
  - Knowing the constitution:
    - Empowers citizens to recognize when rights are not upheld
    - Deepens understanding of democratic systems
    - Fosters better civic participation
  - Malta’s institutions (e.g., the President, Parliament, Courts) exist because of this foundational document
- **Tone**: Empowering, clear, and inviting
- **Design**: Use Tailwind typography utilities for structure, add optional icon or image space

#### 2. 🔁 Reposition Existing Open Source Section

- **Current Location**: Mid-page
- **New Location**: Directly **above the footer** on the landing page
- **No content changes required** — only move the JSX block
- **Purpose**: Keep the Open Source CTA visible, but not competing with top-level civic content

#### 3. 📱 Add Open Source Link in Mobile Sidebar

- File: `src/components/MobileSidebar.tsx`
- Add item at the bottom of the nav list
- **Label**: `Open Source`
- **Action**: Opens GitHub repo (`https://github.com/alexportelli12/constitution-explained`) in a **new tab**
- **Content**: Keep it brief, e.g., “View on GitHub”
- **Optional**: Add GitHub icon or external link icon

---

### 🔧 Technical Notes

- New civic section should use semantic `<section>` and `<h2>` for SEO
- Mobile sidebar link should use `target="_blank"` and `rel="noopener noreferrer"`
- All styles should follow Tailwind v4 conventions
- Maintain light/dark mode compatibility

---

### ✅ Validation Checklist

- [ ] New “Why the Constitution Matters” section is present after hero
- [ ] Content is emotionally compelling and visually coherent
- [ ] Open Source section is successfully moved above the footer
- [ ] Mobile sidebar includes GitHub link at the bottom
- [ ] All changes maintain responsive layout and accessibility standards
