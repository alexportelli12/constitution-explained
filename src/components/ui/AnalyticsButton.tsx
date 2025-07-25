import { component$, $, Slot } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { clsx } from "clsx";
import { analytics } from "../../lib/firebase";
import type { AnalyticsButtonProps } from "../../models";

export const AnalyticsButton = component$<AnalyticsButtonProps>(
  ({ onClick$, eventTag, class: className, ...buttonProps }) => {
    const location = useLocation();

    const handleClick = $(async () => {
      // Track the button click
      try {
        await analytics.trackButtonClick(eventTag, location.url.pathname);
      } catch (error) {
        // Silent fail - don't block user interaction
        console.warn("Button click tracking failed:", error);
      }

      // Execute the original onClick handler
      if (onClick$) {
        await onClick$();
      }
    });

    return (
      <button {...buttonProps} class={clsx(className)} onClick$={handleClick}>
        <Slot />
      </button>
    );
  },
);
