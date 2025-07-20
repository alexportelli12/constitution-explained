export interface OverviewContent {
  level: '5-year-old' | '10-year-old' | '15-year-old' | 'citizen';
  content: string;
  error?: string;
}

export const fetchOverviewContent = async (level: string): Promise<OverviewContent> => {
  try {
    const response = await fetch(`/constitution/overview/${level}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status}`);
    }
    const content = await response.text();
    return { level: level as any, content };
  } catch (error) {
    return {
      level: level as any,
      content: '',
      error: `Failed to load ${level} content. Please try again later.`
    };
  }
};