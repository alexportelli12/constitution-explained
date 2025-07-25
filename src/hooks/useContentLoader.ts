/**
 * Custom hook for managing content loading patterns
 * Extracts duplicated content loading logic from route components
 */

import { useSignal, $, type Signal, type QRL } from "@builder.io/qwik";
import type { ChapterContent, OverviewContent } from "../models";

export type ContentType = ChapterContent | OverviewContent;

export interface UseContentLoaderReturn {
  content: Signal<ContentType | null>;
  loadContent: QRL<
    (
      level: string,
      fetcher: (level: string, ...args: unknown[]) => Promise<ContentType>,
      ...args: unknown[]
    ) => Promise<void>
  >;
  isLoading: Signal<boolean>;
}

export const useContentLoader = (): UseContentLoaderReturn => {
  const content = useSignal<ContentType | null>(null);

  const loadContent = $(
    async (
      level: string,
      fetcher: (level: string, ...args: unknown[]) => Promise<ContentType>,
      ...args: unknown[]
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
