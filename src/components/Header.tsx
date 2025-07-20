import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";
import { clsx } from "clsx";

export const Header = component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const isMobileMenuOpen = useSignal(false);

  const isActive = (path: string) => {
    const currentPath = loc.url.pathname;
    // Handle exact match for home page
    if (path === "/") {
      return currentPath === "/";
    }
    // For other routes, check if current path starts with the route path
    return currentPath.startsWith(path);
  };

  const toggleMobileMenu = $(() => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  });

  const closeMobileMenu = $(() => {
    isMobileMenuOpen.value = false;
  });

  const handleMobileNavigation = $((path: string) => {
    isMobileMenuOpen.value = false;
    nav(path);
  });

  return (
    <>
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Link
                  href="/"
                  class="text-xl font-bold text-primary-900 hover:text-primary-700 transition-colors"
                >
                  Maltese Constitution Explained
                </Link>
              </div>
            </div>

            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                class={clsx(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  isActive("/")
                    ? "text-primary-900 border-b-2 border-primary-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                Home
              </Link>
              <Link
                href="/overview"
                class={clsx(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  isActive("/overview")
                    ? "text-primary-900 border-b-2 border-primary-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                Overview
              </Link>
              <Link
                href="/articles"
                class={clsx(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  isActive("/articles")
                    ? "text-primary-900 border-b-2 border-primary-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                Articles
              </Link>
            </div>

            <div class="sm:hidden">
              <button
                onClick$={toggleMobileMenu}
                class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Toggle mobile menu"
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen.value && (
        <>
          {/* Backdrop */}
          <div
            class="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick$={closeMobileMenu}
          />

          {/* Sidebar */}
          <div class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 sm:hidden">
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick$={closeMobileMenu}
                class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                aria-label="Close mobile menu"
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav class="p-4">
              <div class="space-y-4">
                <button
                  onClick$={() => handleMobileNavigation("/")}
                  class={clsx(
                    "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive("/")
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  Home
                </button>
                <button
                  onClick$={() => handleMobileNavigation("/overview")}
                  class={clsx(
                    "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive("/overview")
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  Overview
                </button>
                <button
                  onClick$={() => handleMobileNavigation("/articles")}
                  class={clsx(
                    "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive("/articles")
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  Articles
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
});
