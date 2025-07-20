import { component$, type Signal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { clsx } from "clsx";

interface MobileSidebarProps {
  isOpen: Signal<boolean>;
  currentPath: string;
}

export const MobileSidebar = component$<MobileSidebarProps>(({ isOpen, currentPath }) => {
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
  );
});