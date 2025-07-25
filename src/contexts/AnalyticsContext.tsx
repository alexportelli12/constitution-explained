import {
  createContextId,
  useContext,
  useContextProvider,
  useTask$,
  $,
  component$,
  Slot,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { analytics } from "../lib/firebase";
import type { AnalyticsContextValue } from "../models";

export const AnalyticsContext =
  createContextId<AnalyticsContextValue>("analytics-context");

export const AnalyticsProvider = component$(() => {
  const location = useLocation();

  // Track page views on route changes
  useTask$(async ({ track }) => {
    track(() => location.url.pathname);

    try {
      await analytics.trackPageView(location.url.pathname);
    } catch (error) {
      console.warn("Page view tracking failed:", error);
    }
  });

  const contextValue: AnalyticsContextValue = {
    trackPageView: $((page: string) => analytics.trackPageView(page)),
    trackButtonClick: $((tag: string, page: string) =>
      analytics.trackButtonClick(tag, page),
    ),
  };

  useContextProvider(AnalyticsContext, contextValue);

  return <Slot />;
});

export const useAnalytics = (): AnalyticsContextValue => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }
  return context;
};
