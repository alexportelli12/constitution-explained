/**
 * Custom hook for managing age level URL parameters
 * Extracts duplicated URL parameter handling logic from route components
 */

import { useSignal, useTask$, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { AGE_LEVELS } from "../constants";

export interface UseAgeLevelUrlReturn {
  activeLevel: any; // Qwik signal
  handleLevelChange: any; // Qwik function
  getInitialLevel: any; // Qwik function
}

export const useAgeLevelUrl = (): UseAgeLevelUrlReturn => {
  const loc = useLocation();
  const nav = useNavigate();

  // Get initial level from URL or default to "citizen"
  const getInitialLevel = $(() => {
    const levelParam = loc.url.searchParams.get("level");
    return AGE_LEVELS.includes(levelParam as any) ? levelParam! : "citizen";
  });

  // Initialize with URL parameter or default to "citizen"
  const levelParam = loc.url.searchParams.get("level");
  const initialLevel = AGE_LEVELS.includes(levelParam as any)
    ? levelParam!
    : "citizen";
  const activeLevel = useSignal<string>(initialLevel);

  const handleLevelChange = $((level: string) => {
    activeLevel.value = level;
    // Update URL with new level parameter
    const newUrl = new URL(loc.url);
    newUrl.searchParams.set("level", level);
    nav(newUrl.pathname + newUrl.search, { scroll: false });
  });

  // Watch for URL changes (back/forward navigation, direct links)
  useTask$(async ({ track }) => {
    track(() => loc.url.searchParams.get("level"));
    const newLevel = await getInitialLevel();
    if (newLevel !== activeLevel.value) {
      activeLevel.value = newLevel;
    }
  });

  return {
    activeLevel,
    handleLevelChange,
    getInitialLevel,
  };
};
