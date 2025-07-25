import { component$, type Signal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { clsx } from "clsx";
import {
  CloseIcon,
  HomeIcon,
  BuildingIcon,
  BookIcon,
  ClockIcon,
  ExternalLinkIcon,
  GitHubIcon,
} from "./svgs";

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
              <CloseIcon class="h-6 w-6" />
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
                <HomeIcon class="w-5 h-5 mr-3" />
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
                <BuildingIcon class="w-5 h-5 mr-3" />
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
                <BookIcon class="w-5 h-5 mr-3" />
                Chapters
              </button>
              <button
                onClick$={() => handleMobileNavigation("/history")}
                class={clsx(
                  "flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                  isActive("/history")
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <ClockIcon class="w-5 h-5 mr-3" />
                History
              </button>

              {/* ADD: GitHub link at bottom of nav */}
              <a
                href="https://github.com/alexportelli12/constitution-explained"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 mt-4 border-t border-gray-200 pt-6"
              >
                <GitHubIcon class="w-5 h-5 mr-3" />
                Open Source
                <ExternalLinkIcon class="w-4 h-4 ml-auto" />
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
