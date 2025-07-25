## FEATURE:

Create an Interactive “History” Page Tracing Malta’s Journey to a Republic

## DOCUMENTATION:

- History research content prepared in this project - see the public/history/source.md file.
- Use content structure and tone aligned with:
  - Overview and Chapter pages
  - Existing `AgeLevelToggle` component (re-use logic)
- Existing Tailwind CSS v4 configuration
- Reuse visual/card conventions seen in `/overview` and `/chapters` pages

## OTHER CONSIDERATIONS:

### 🧠 Educational Goals

The history page should help users understand:

- How Malta evolved from colonial rule to an independent state and then to a republic
- The meaning and role of a constitution in this national journey
- Key figures (e.g., George Borg Olivier, Dom Mintoff) and milestones
- How amendments over the years have shaped democracy in Malta

### 📚 Content Design & Layout

#### 1. Section Breakdown (in Age-Level Toggle format)

Each age level (5, 10, 15, adult) version will cover:

- What it means to be a sovereign country
- The British colonial period and push for independence
- 1964 Independence and its Constitution
- Becoming a Republic in 1974
- Notable updates (e.g., 1987 constitutional amendments, 2004 EU alignment, 2020–2024 judicial reform)

**Tone**: Simple, educational, friendly  
**Goal**: Make it easy for children and adults alike to follow Malta's constitutional evolution

#### 2. Visual/Interactive Features

- Timeline or section cards representing key moments (e.g. 1964, 1974, 2004, 2020)
- Each section includes:
  - Image (use `/public/images/history/` placeholders for now)
  - Title + date
  - Age-level-adjusted description

> 💡 Use the same rendering system used in the Overview and Chapter pages (i.e. Markdown → HTML with consistent typography classes)

#### 3. Reusability

- Use existing `AgeLevelToggle` to let users flip between simplified versions
- Use Tailwind utilities for layout
- Enable light/dark mode compatibility

### 📂 Content Source

- Add Markdown files to: `public/history/`
  - `5-year-old.md`
  - `10-year-old.md`
  - `15-year-old.md`
  - `citizen.md`

#### Example Headings (inside each .md)

- “When Malta Was Ruled by Others”
- “The Fight for Independence”
- “A New Constitution”
- “How We Became a Republic”
- “How the Constitution Changed Over Time”

---

### ✅ Validation Checklist

- [ ] New `/history` route created with dynamic markdown loading per age level
- [ ] `AgeLevelToggle` works across all versions
- [ ] Timeline-style layout or vertically stacked visual cards created
- [ ] All images have alt text and responsive scaling
- [ ] Content rendered from `public/history/*.md` files
- [ ] Page is SEO-optimized (section headers, meta tags, title tag)
- [ ] Responsive and accessible on all devices

---

### 💡 Optional Enhancements

- Add hover interaction on timeline or milestone cards (zoom or tooltip)
- Allow deep-linking to specific age-level versions via URL (e.g. `/history?level=10`)
- Animate transitions between age levels
