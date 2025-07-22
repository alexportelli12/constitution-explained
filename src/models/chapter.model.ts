/**
 * Chapter and content type definitions for the Constitution of Malta Explained app
 */

export interface Chapter {
  chapter: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  heroImage: string;
  articleCount: number;
}

export interface ChapterContent {
  level: '5-year-old' | '10-year-old' | '15-year-old' | 'citizen';
  content: string;
  chapter: string;
  error?: string;
}

export interface OverviewContent {
  level: '5-year-old' | '10-year-old' | '15-year-old' | 'citizen';
  content: string;
  error?: string;
}