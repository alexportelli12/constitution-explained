import { AgeLevel } from "../constants";
import type { OverviewContent, ChapterContent } from "../models/chapter.model";

export const fetchOverviewContent = async (level: AgeLevel): Promise<OverviewContent> => {
  try {
    const response = await fetch(`/constitution/overview/${level}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status}`);
    }
    const content = await response.text();
    return { level, content };
  } catch (error) {
    return {
      level,
      content: '',
      error: `Failed to load ${level} content. Please try again later.`
    };
  }
};

export const fetchChapterContent = async (chapter: string, level: AgeLevel): Promise<ChapterContent> => {
  try {
    // First try the specific level directory
    let response = await fetch(`/constitution/chapters/${level}/${chapter}.md`);
    
    // If not found and level isn't 'citizen', fallback to citizen level
    if (!response.ok && level !== 'citizen') {
      response = await fetch(`/constitution/chapters/citizen/${chapter}.md`);
    }
    
    // If still not found, try the root chapters directory
    if (!response.ok) {
      response = await fetch(`/constitution/chapters/${chapter}.md`);
    }
    
    if (!response.ok) {
      throw new Error(`Chapter ${chapter} not available for ${level} level`);
    }
    
    const content = await response.text();
    return { 
      level, 
      content, 
      chapter 
    };
  } catch (error) {
    return {
      level,
      content: '',
      chapter,
      error: error instanceof Error ? error.message : `Failed to load Chapter ${chapter}. Please try again later.`
    };
  }
};