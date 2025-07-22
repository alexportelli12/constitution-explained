/**
 * Chapter utility functions for the Constitution of Malta Explained app
 */

import type { Chapter } from "../models/chapter.model";
import { CHAPTERS } from "../constants/chapters.constant";

/**
 * Get a chapter by its ID
 */
export const getChapterById = (chapterId: string): Chapter | undefined => {
  return CHAPTERS.find((chapter) => chapter.chapter === chapterId);
};

/**
 * Get a chapter title by its ID, with fallback
 */
export const getChapterTitle = (chapterId: string): string => {
  const chapter = getChapterById(chapterId);
  return chapter ? chapter.title : `Chapter ${chapterId}`;
};

/**
 * Enhanced search function with scoring algorithm
 */
export const searchChapters = (searchTerm: string): Chapter[] => {
  if (!searchTerm.trim()) return CHAPTERS;

  const term = searchTerm.toLowerCase();
  const scoredResults = CHAPTERS.map((chapter) => {
    let score = 0;

    // Title match (highest priority)
    if (chapter.title.toLowerCase().includes(term)) score += 10;

    // Description match (medium priority)
    if (chapter.description.toLowerCase().includes(term)) score += 5;

    // Tag matches (lower priority but comprehensive)
    const tagMatches = chapter.tags.filter((tag) =>
      tag.toLowerCase().includes(term),
    ).length;
    score += tagMatches * 2;

    // Chapter number exact match
    if (chapter.chapter === term) score += 15;

    return { chapter, score };
  })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.chapter);

  return scoredResults;
};

/**
 * Get the next chapter in sequence, handling "10A" ordering
 */
export const getNextChapter = (currentChapter: string): Chapter | null => {
  const chapterOrder = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "10A",
    "11",
  ];
  const currentIndex = chapterOrder.indexOf(currentChapter);
  if (currentIndex === -1 || currentIndex === chapterOrder.length - 1)
    return null;

  const nextChapterId = chapterOrder[currentIndex + 1];
  return getChapterById(nextChapterId) || null;
};

/**
 * Get the previous chapter in sequence, handling "10a" ordering
 */
export const getPreviousChapter = (currentChapter: string): Chapter | null => {
  const chapterOrder = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "10A",
    "11",
  ];
  const currentIndex = chapterOrder.indexOf(currentChapter);
  if (currentIndex === -1 || currentIndex === 0) return null;

  const prevChapterId = chapterOrder[currentIndex - 1];
  return getChapterById(prevChapterId) || null;
};
