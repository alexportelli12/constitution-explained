## FEATURE:

Lightweight Analytics Tracking via Firebase Firestore (Page Visits + Button Clicks)

## DOCUMENTATION:

- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Firebase Firestore Cost Optimization](https://firebase.google.com/docs/firestore/best-practices)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## OTHER CONSIDERATIONS:

### 🎯 GOAL

Implement a basic analytics system to track:

- Page visits
- Button clicks
- Device size: mobile / tablet / desktop
- Event counts (for simple visualisation)

**No personal data must be collected.** This is **not** a replacement for tools like Google Analytics but rather a simple way to understand how the site is used — fully custom and privacy-respecting.

---

### 🔧 FIREBASE STRUCTURE (Firestore)

Create a collection named: `analytics_events`

Each document structure:

```ts
{
  eventType: "page_view" | "button_click",
  page: string,                      // e.g. "/overview", "/chapters/5"
  timestamp: Firestore.Timestamp,   // for sorting/analytics
  device: "mobile" | "tablet" | "desktop",
  tag?: string                       // (optional) ID for identifying specific buttons or components
}
```

Use batched writes or throttling to prevent exceeding write quotas.

---

### 🧱 IMPLEMENTATION BREAKDOWN

#### 1. AnalyticsService (centralized utility)

- Located in `src/lib/firebase/analytics.service.ts`

- Contains methods:

  - `trackPageVisit(page: string)`
  - `trackButtonClick(tag: string, page: string)`

- Handles:

  - Device size detection via `window.innerWidth`
  - Firestore write with error catching
  - Rate limiting with debounce or batching
  - Safe fallback if Firestore unavailable (no error to user)

#### 2. AnalyticsButton Component

- Located in `src/components/ui/analytics-button.tsx`

- Replaces Qwik `<button>` wherever analytics tracking is desired

- Props:

  - `onClick`: function
  - `eventTag`: string
  - `class`: Tailwind classes passed through
  - Any other standard button props

- Automatically:

  - Tracks the button click with eventTag and page
  - Executes the passed `onClick` handler

#### 3. Hook into Route Navigation

- In `src/root.tsx` or layout-level entry point
- Use `useVisibleTask$` (Qwik) or route load hooks to call:

  ```ts
  analytics.trackPageVisit(routePath);
  ```

---

### 🔒 PRIVACY & COMPLIANCE

- No IP addresses, geolocation, or user-identifiable info
- Use Firestore only for timestamped events
- Analytics purely for UX insights and prioritization

---

### 👁️ Pop-Up Disclosure Note

- Tiny component (`src/components/analytics-note.tsx`)
- Appears at bottom of screen on first visit
- Example copy:

> "We collect anonymous usage data to help improve the site. No personal info is stored."

- Close button stores a flag in `localStorage` under `analytics_popup_dismissed = true`
- Does not show again if localStorage flag is found
- Styled to be non-blocking and subtle

---

### ⚙️ PERFORMANCE & UX

- Analytics calls should be:

  - Non-blocking
  - Wrapped in `try/catch`
  - Deferred or wrapped in `requestIdleCallback` if needed
  - Not interfere with user experience or navigation

- Use batching or throttling if the event frequency is too high

---

### 🚨 RISK MITIGATION

To prevent abuse:

- Implement basic rate limiting (e.g., no more than 1 write per event type per X seconds)
- Consider using a local queue that flushes periodically
- Monitor Firebase usage through the console
- Log and test error handling for offline mode or write failures

---

### ✅ VALIDATION CHECKLIST

- [ ] AnalyticsService created and working
- [ ] Page visit events logged with correct structure
- [ ] Button clicks tracked through reusable component
- [ ] Popup appears only once and stores preference
- [ ] No user-blocking behavior caused by analytics
- [ ] No console errors or unhandled Firebase issues
- [ ] Firestore usage optimized (no spam writes)

---

### 📌 FILES TO CREATE

```bash
src/
├── lib/firebase/
│   └── analytics.service.ts     # main logic
├── components/ui/
│   └── analytics-button.tsx     # reusable UI wrapper
│   └── analytics-note.tsx       # popup disclosure note
```
