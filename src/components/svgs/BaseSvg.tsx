import { component$, Slot } from "@builder.io/qwik";
import type { BaseSvgProps } from "../../models";

export const BaseSvg = component$<BaseSvgProps>(
  ({
    class: className = "",
    width = 24,
    height = 24,
    color = "currentColor",
    strokeWidth = 2,
    viewBox = "0 0 24 24",
  }) => {
    return (
      <svg
        class={className}
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <Slot />
      </svg>
    );
  },
);
