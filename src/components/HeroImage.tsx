import { component$, useSignal } from "@builder.io/qwik";

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

    return (
      <div
        class="w-full rounded-xl mb-8 shadow-lg overflow-hidden"
        style={{ "min-height": "190px" }}
      >
        {!imageLoadError.value ? (
          <div class="relative w-full h-full">
            {!imageLoaded.value && (
              <div
                class={`absolute inset-0 bg-gradient-to-r ${gradientColors} animate-pulse flex items-center justify-center`}
              >
                <div class="w-12 h-12 bg-white/30 rounded-full animate-pulse"></div>
              </div>
            )}
            <img
              src={src}
              alt={alt}
              width="800"
              height="400"
              class={`w-full h-full object-${objectFit} transition-opacity duration-300 ${
                imageLoaded.value ? "opacity-100" : "opacity-0"
              }`}
              style={{
                objectPosition,
              }}
              onLoad$={() => {
                imageLoaded.value = true;
              }}
              onError$={() => {
                imageLoadError.value = true;
              }}
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
