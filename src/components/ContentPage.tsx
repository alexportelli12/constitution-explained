import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  AgeLevelToggle,
  MarkdownRenderer,
  ReadingLevelsTip,
  OfficialLegislationLink,
} from "./";
import { DocumentIcon, ClockIcon, BookIcon, ArrowRightIcon } from "./svgs";
import { getLevelDescription } from "../utils";
import type { ContentPageProps } from "../models";

const getSvgIcon = (iconType: string) => {
  switch (iconType) {
    case "document":
      return DocumentIcon;
    case "clock":
      return ClockIcon;
    case "book":
      return BookIcon;
    default:
      return DocumentIcon;
  }
};

export const ContentPage = component$<ContentPageProps>(
  ({ config, activeLevel, onLevelChange, content }) => {
    const {
      hero,
      dynamicNotePrefix,
      exploreMoreTitle,
      exploreMoreDescription,
      exploreLinks,
      showAgeLevelToggle = true,
      showOfficialLink = true,
      showReadingTip = true,
      maxWidth = "4xl",
    } = config;

    const containerClass = maxWidth === "7xl" ? "max-w-7xl" : "max-w-4xl";

    return (
      <>
        <div class={`${containerClass} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
          {/* Hero Section */}
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">{hero.title}</h1>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              {hero.description}
            </p>
          </div>

          {/* Age Level Toggle */}
          {showAgeLevelToggle && activeLevel && onLevelChange && (
            <div class="sticky top-20 z-40 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2">
              <div class="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-gray-100 px-3 py-2">
                <AgeLevelToggle
                  activeLevel={activeLevel}
                  onLevelChange={onLevelChange}
                />
              </div>
            </div>
          )}

          {/* Dynamic Note */}
          {showAgeLevelToggle && activeLevel && (
            <div class="mb-4 p-3 bg-red-50 border-l-4 border-primary-500 rounded-r-lg">
              <p class="text-sm text-primary-700">
                {dynamicNotePrefix}{" "}
                <strong>{getLevelDescription(activeLevel.value)}</strong>.
              </p>
            </div>
          )}

          {/* Content Area */}
          {content ? (
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {!content.value ? (
                <MarkdownRenderer content="" />
              ) : (
                <MarkdownRenderer
                  content={content.value.content}
                  error={content.value.error}
                />
              )}
            </div>
          ) : (
            <Slot />
          )}

          {/* Official legislation link */}
          {showOfficialLink && <OfficialLegislationLink />}

          {/* Additional Info */}
          {showReadingTip && <ReadingLevelsTip />}
        </div>

        {/* Explore More Section - Outside main container to be before footer */}
        <section class="bg-gradient-to-br from-primary-50 via-white to-red-50 py-16 px-4 sm:px-6 lg:px-8">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {exploreMoreTitle}
              </h2>
              <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {exploreMoreDescription}
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {exploreLinks.map((link) => {
                const IconComponent = getSvgIcon(link.svgType);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    class="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200"
                  >
                    <div class="flex items-center justify-between mb-4">
                      <div class="p-3 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors">
                        <IconComponent
                          class="w-8 h-8 text-primary-600"
                          color="currentColor"
                        />
                      </div>
                      <ArrowRightIcon class="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                      {link.title}
                    </h3>
                    <p class="text-gray-600">{link.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  },
);
