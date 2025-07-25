/**
 * Age level utility functions for the Constitution of Malta Explained app
 * Extracts duplicated level description logic from route components
 */

import { AgeLevel } from "../constants";

/**
 * Get a human-readable description for an age level
 * Replaces duplicated switch statements in route components
 */
export const getLevelDescription = (level: AgeLevel): string => {
  const descriptions: Record<AgeLevel, string> = {
    [AgeLevel.FIVE_YEAR_OLD]: "5 years old",
    [AgeLevel.TEN_YEAR_OLD]: "10 years old",
    [AgeLevel.FIFTEEN_YEAR_OLD]: "15 years old",
    [AgeLevel.CITIZEN]: "an adult citizen",
  };
  return descriptions[level] || descriptions[AgeLevel.CITIZEN];
};
