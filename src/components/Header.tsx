import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { clsx } from "clsx";
import { MobileSidebar } from "./MobileSidebar";
import { HomeIcon, BuildingIcon, BookIcon, ClockIcon, MenuIcon } from "./svgs";

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
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <HomeIcon class="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link
                href="/overview"
                class={clsx(
                  "flex items-center px-4 py-2 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/overview")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <BuildingIcon class="w-5 h-5 mr-2" />
                Overview
              </Link>
              <Link
                href="/chapters"
                class={clsx(
                  "flex items-center px-4 py-2 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/chapters")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <BookIcon class="w-5 h-5 mr-2" />
                Chapters
              </Link>
              <Link
                href="/history"
                class={clsx(
                  "flex items-center px-4 py-2 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/history")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <ClockIcon class="w-5 h-5 mr-2" />
                History
              </Link>
            </div>

            <div class="sm:hidden">
              <button
                onClick$={toggleMobileMenu}
                class="p-3 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <MenuIcon class="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileSidebar isOpen={isMobileMenuOpen} currentPath={loc.url.pathname} />
    </>
  );
});
