/**
 * Chapter and content type definitions for the Constitution of Malta Explained app
 */
import type { AgeLevel } from "../constants";

export interface Chapter {
  chapter: string;
  title: string;
  description: string;
  tags: string[];
  heroImage: string;
  articleCount: number;
}

export interface ChapterContent {
  level: AgeLevel;
  content: string;
  chapter: string;
  error?: string;
}

export interface OverviewContent {
  level: AgeLevel;
  content: string;
  error?: string;
}

export interface HistoryContent {
  level: AgeLevel;
  content: string;
  error?: string;
}
