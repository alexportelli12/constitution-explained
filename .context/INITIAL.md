## FEATURE:

Create a global layout and navigation component for the site using Qwik and QwikUI.

This includes a top-level layout (`src/routes/layout.tsx`) that wraps all pages with a consistent header, and a reusable `Header.tsx` component for navigation links. The navigation bar should include links to:

- Home (`/`)
- Overview (`/overview`)
- Articles (`/articles`)

The layout must be responsive, mobile-first, and minimalistic in design using Tailwind CSS.

## DOCUMENTATION:

- Qwik Routing: https://qwik.dev/docs/routing
- Qwik Layouts: https://qwik.dev/docs/layout/ (example included)
- QwikUI Headless Components: https://qwikui.com/docs/headless/introduction/
- Tailwind CSS: https://tailwindcss.com/docs

## OTHER CONSIDERATIONS:

- Use Qwik's `component$()` pattern and `useStylesScoped$()` for scoped styling if needed.
- Navigation should highlight the current active route (if easy to implement).
- Avoid using external routing libraries or client-side routers.
- Ensure navigation works with QwikCity’s file-based routing (SSR-safe).
- Mobile view should collapse navigation into a stacked or simplified format if necessary.
- The header should not introduce unnecessary layout shifts or CLS (Cumulative Layout Shift).
- QwikUI headless components may require custom styling via Tailwind — default to `div`+`a` patterns if needed.
