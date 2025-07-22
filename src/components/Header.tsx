import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { clsx } from "clsx";
import { MobileSidebar } from "./MobileSidebar";

export const Header = component$(() => {
  const loc = useLocation();
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

  return (
    <>
      <header class="bg-white shadow-lg sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Link
                  href="/"
                  class="block text-lg font-bold leading-tight transition-colors group"
                >
                  <div class="text-primary-500 group-hover:text-primary-600">
                    Constitution of Malta
                  </div>
                  <div class="italic text-primary-700 group-hover:text-primary-800">
                    Explained
                  </div>
                </Link>
              </div>
            </div>

            <div class="hidden sm:ml-6 sm:flex sm:space-x-2">
              <Link
                href="/"
                class={clsx(
                  "flex items-center px-4 py-2 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
              <Link
                href="/overview"
                class={clsx(
                  "flex items-center px-4 py-2 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/overview")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Overview
              </Link>
              <Link
                href="/chapters"
                class={clsx(
                  "flex items-center px-4 py-2 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/chapters")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                Chapters
              </Link>
            </div>

            <div class="sm:hidden">
              <button
                onClick$={toggleMobileMenu}
                class="p-3 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
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

      <MobileSidebar isOpen={isMobileMenuOpen} currentPath={loc.url.pathname} />
    </>
  );
});
