/**
 * Age Level Context Provider
 * Provides centralized age level state management with localStorage persistence
 * and URL synchronization for enhanced user experience
 */

import {
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
  $,
  component$,
  Slot,
  type Signal,
  type QRL,
} from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { AgeLevel, AGE_LEVELS } from "../constants";

export interface AgeLevelContextValue {
  activeLevel: Signal<AgeLevel>;
  setActiveLevel: QRL<(level: AgeLevel) => void>;
  handleLevelChange: QRL<(level: string) => void>;
}

export const AgeLevelContext =
  createContextId<AgeLevelContextValue>("age-level-context");

const STORAGE_KEY = "maltese-constitution-age-level";

export const AgeLevelProvider = component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  // Get stored preference from localStorage or URL, fallback to citizen
  const getInitialLevel = $(() => {
    // First check URL parameter (for direct links/bookmarks)
    const urlLevel = loc.url.searchParams.get("level");
    if (urlLevel && AGE_LEVELS.includes(urlLevel as AgeLevel)) {
      return urlLevel as AgeLevel;
    }

    // Then check localStorage (user preference)
    if (typeof window !== "undefined") {
      const storedLevel = localStorage.getItem(STORAGE_KEY);
      if (storedLevel && AGE_LEVELS.includes(storedLevel as AgeLevel)) {
        return storedLevel as AgeLevel;
      }
    }

    // Default fallback
    return AgeLevel.CITIZEN;
  });

  const activeLevel = useSignal<AgeLevel>(AgeLevel.CITIZEN);

  // Initialize activeLevel on client
  useTask$(async () => {
    const initialLevel = await getInitialLevel();
    activeLevel.value = initialLevel;
  });

  const setActiveLevel = $((level: AgeLevel) => {
    activeLevel.value = level;

    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, level);
    }
  });

  const handleLevelChange = $((level: string) => {
    const ageLevel = AGE_LEVELS.includes(level as AgeLevel)
      ? (level as AgeLevel)
      : AgeLevel.CITIZEN;

    setActiveLevel(ageLevel);

    // Update URL with new level parameter
    const newUrl = new URL(loc.url);
    newUrl.searchParams.set("level", ageLevel);
    nav(newUrl.pathname + newUrl.search, { scroll: false });

    // Scroll to top of content area for better UX
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  });

  // Watch for URL changes (back/forward navigation, direct links)
  useTask$(async ({ track }) => {
    track(() => loc.url.searchParams.get("level"));
    const urlLevel = loc.url.searchParams.get("level");

    if (urlLevel && AGE_LEVELS.includes(urlLevel as AgeLevel)) {
      const newLevel = urlLevel as AgeLevel;
      if (newLevel !== activeLevel.value) {
        setActiveLevel(newLevel);
      }
    }
  });

  const contextValue: AgeLevelContextValue = {
    activeLevel,
    setActiveLevel,
    handleLevelChange,
  };

  useContextProvider(AgeLevelContext, contextValue);

  return <Slot />;
});

/**
 * Hook to access age level context
 * Must be used within AgeLevelProvider
 */
export const useAgeLevel = (): AgeLevelContextValue => {
  const context = useContext(AgeLevelContext);
  if (!context) {
    throw new Error("useAgeLevel must be used within AgeLevelProvider");
  }
  return context;
};
