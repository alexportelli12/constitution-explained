import type { Signal, QRL } from "@builder.io/qwik";
import type { AgeLevel } from "../constants";

export interface HeroSection {
  title: string;
  description: string;
}

export interface ExploreLink {
  href: string;
  title: string;
  description: string;
  svgType: string;
}

export interface ContentPageConfig {
  hero: HeroSection;
  dynamicNotePrefix: string;
  exploreMoreTitle: string;
  exploreMoreDescription: string;
  exploreLinks: ExploreLink[];
  showAgeLevelToggle?: boolean;
  showOfficialLink?: boolean;
  showReadingTip?: boolean;
  maxWidth?: "4xl" | "7xl";
}

export interface ContentPageProps {
  config: ContentPageConfig;
  activeLevel?: Signal<AgeLevel>;
  onLevelChange?: QRL<(level: AgeLevel) => void>;
  content?: Signal<{ content: string; error?: string } | null>;
}
