/**
 * Custom hook for managing content loading patterns
 * Extracts duplicated content loading logic from route components
 */

import { useSignal, $ } from "@builder.io/qwik";
import type { ChapterContent, OverviewContent } from "../models";

export type ContentType = ChapterContent | OverviewContent;

export interface UseContentLoaderReturn {
  content: any; // Qwik signal
  loadContent: any; // Qwik function
  isLoading: any; // Qwik computed signal
}

export const useContentLoader = (): UseContentLoaderReturn => {
  const content = useSignal<ContentType | null>(null);

  const loadContent = $(
    async (
      level: string,
      fetcher: (level: string, ...args: any[]) => Promise<ContentType>,
      ...args: any[]
    ) => {
      content.value = null; // Clear content to show loading state
      const result = await fetcher(level, ...args);
      content.value = result;
    },
  );

  const isLoading = useSignal(false);

  return {
    content,
    loadContent,
    isLoading,
  };
};
