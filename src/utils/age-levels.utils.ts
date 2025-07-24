/**
 * Age level utility functions for the Constitution of Malta Explained app
 * Extracts duplicated level description logic from route components
 */

import type { AgeLevel } from "../constants";

/**
 * Get a human-readable description for an age level
 * Replaces duplicated switch statements in route components
 */
export const getLevelDescription = (level: AgeLevel | string): string => {
  const descriptions: Record<AgeLevel, string> = {
    "5-year-old": "5 years old",
    "10-year-old": "10 years old",
    "15-year-old": "15 years old",
    citizen: "an adult citizen",
  };
  return descriptions[level as AgeLevel] || descriptions.citizen;
};
