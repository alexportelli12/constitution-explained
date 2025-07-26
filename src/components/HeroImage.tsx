import { component$, useSignal, $, useTask$, useVisibleTask$ } from "@builder.io/qwik";

interface HeroImageProps {
  src: string;
  alt: string;
  fallbackText?: string;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
  objectPosition?: string;
  gradientColors?: string;
}

export const HeroImage = component$<HeroImageProps>(
  ({
    src,
    alt,
    fallbackText = "Hero Image",
    objectFit = "cover",
    objectPosition = "center",
    gradientColors = "from-red-100 to-red-50",
  }) => {
    const imageLoadError = useSignal(false);
    const imageLoaded = useSignal(false);
    const imgRef = useSignal<HTMLImageElement>();

    // Reset states when src changes
    useTask$(({ track }) => {
      track(() => src);
      imageLoadError.value = false;
      imageLoaded.value = false;
    });

    // Check if image is already loaded (e.g., from cache) after hydration
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      if (imgRef.value && imgRef.value.complete && imgRef.value.naturalWidth > 0) {
        imageLoaded.value = true;
      }
    });

    const handleImageLoad = $(() => {
      imageLoaded.value = true;
    });

    const handleImageError = $(() => {
      imageLoadError.value = true;
    });

    // Show loading state if no src provided
    if (!src) {
      return (
        <div
          class="w-full rounded-xl mb-8 shadow-lg overflow-hidden"
          style={{ "min-height": "190px" }}
        >
          <div
            class={`w-full h-full bg-gradient-to-r ${gradientColors} animate-pulse flex items-center justify-center`}
          >
            <div class="w-12 h-12 bg-white/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      );
    }

    return (
      <div
        class="w-full rounded-xl mb-8 shadow-lg overflow-hidden"
        style={{ "min-height": "190px" }}
      >
        {!imageLoadError.value ? (
          <div class="relative w-full h-full">
            <div
              class={`absolute inset-0 bg-gradient-to-r ${gradientColors} flex items-center justify-center transition-opacity duration-500 ease-out z-10 ${
                imageLoaded.value ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"
              }`}
            >
              <div class={`w-12 h-12 bg-white/30 rounded-full ${
                imageLoaded.value ? "" : "animate-pulse"
              }`}></div>
            </div>
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              width="800"
              height="400"
              class={`w-full h-full object-${objectFit} transition-opacity duration-500 ease-out ${
                imageLoaded.value ? "opacity-100" : "opacity-0"
              }`}
              style={{
                objectPosition,
              }}
              onLoad$={handleImageLoad}
              onError$={handleImageError}
              loading="eager"
              decoding="async"
            />
          </div>
        ) : (
          <div
            class={`w-full h-full bg-gradient-to-r ${gradientColors} flex items-center justify-center text-gray-500 text-center`}
          >
            <div>
              <div class="text-2xl mb-2">📖</div>
              <p>{fallbackText}</p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
