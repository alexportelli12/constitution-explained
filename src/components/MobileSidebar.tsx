import { component$, type Signal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { clsx } from "clsx";

interface MobileSidebarProps {
  isOpen: Signal<boolean>;
  currentPath: string;
}

export const MobileSidebar = component$<MobileSidebarProps>(
  ({ isOpen, currentPath }) => {
    const nav = useNavigate();

    const isActive = (path: string) => {
      if (path === "/") {
        return currentPath === "/";
      }
      return currentPath.startsWith(path);
    };

    const closeMobileMenu = $(() => {
      isOpen.value = false;
    });

    const handleMobileNavigation = $((path: string) => {
      isOpen.value = false;
      nav(path);
    });

    if (!isOpen.value) {
      return null;
    }

    return (
      <>
        {/* Backdrop */}
        <div
          class="fixed inset-0 bg-primary-overlay z-[60] sm:hidden"
          onClick$={closeMobileMenu}
        />

        {/* Sidebar */}
        <div class="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] sm:hidden flex flex-col">
          <div class="flex items-center justify-between p-6">
            <div class="text-base font-bold leading-tight">
              <div class="text-primary-500">Constitution of Malta</div>
              <div class="italic text-primary-700">Explained</div>
            </div>
            <button
              onClick$={closeMobileMenu}
              class="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
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

          <nav class="flex-1 px-6 py-8">
            <div class="space-y-2">
              <button
                onClick$={() => handleMobileNavigation("/")}
                class={clsx(
                  "flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <svg
                  class="w-5 h-5 mr-3"
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
              </button>
              <button
                onClick$={() => handleMobileNavigation("/overview")}
                class={clsx(
                  "flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/overview")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <svg
                  class="w-5 h-5 mr-3"
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
              </button>
              <button
                onClick$={() => handleMobileNavigation("/chapters")}
                class={clsx(
                  "flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/chapters")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <svg
                  class="w-5 h-5 mr-3"
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
              </button>

              {/* ADD: GitHub link at bottom of nav */}
              <a
                href="https://github.com/alexportelli12/constitution-explained"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 mt-4 border-t border-gray-200 pt-6"
              >
                <svg
                  class="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Open Source
                <svg
                  class="w-4 h-4 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </nav>

          <div class="px-6 py-4 border-t border-gray-200">
            <p class="text-center text-sm text-gray-500">
              Built by{" "}
              <a
                href="https://alexportelli.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                Alex Portelli
              </a>
            </p>
          </div>
        </div>
      </>
    );
  },
);
