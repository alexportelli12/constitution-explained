import { component$, useSignal } from "@builder.io/qwik";

interface HeroImageProps {
  src: string;
  alt: string;
  fallbackIcon?: string;
  fallbackText?: string;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
  objectPosition?: string;
  gradientColors?: string;
}

export const HeroImage = component$<HeroImageProps>(
  ({
    src,
    alt,
    fallbackIcon = "📜",
    fallbackText = "Hero Image",
    objectFit = "cover",
    objectPosition = "center",
    gradientColors = "from-red-100 to-red-50",
  }) => {
    const className = `w-full max-w-3xl mx-auto aspect-video bg-gradient-to-r ${gradientColors} rounded-xl mb-8 flex items-center justify-center shadow-lg`;
    const imageLoadError = useSignal(false);

    return (
      <div class={className}>
        {!imageLoadError.value ? (
          <img
            src={src}
            alt={alt}
            class="w-full h-full rounded-lg"
            style={{
              objectFit,
              objectPosition,
            }}
            onError$={() => {
              imageLoadError.value = true;
            }}
          />
        ) : (
          <div class="text-gray-500 text-center">
            <div class="text-2xl mb-2">{fallbackIcon}</div>
            <p>{fallbackText}</p>
          </div>
        )}
      </div>
    );
  },
);
