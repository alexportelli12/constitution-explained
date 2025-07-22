/**
 * Age level constants and types for the Constitution of Malta Explained app
 */

export const AGE_LEVELS = [
  "5-year-old",
  "10-year-old", 
  "15-year-old",
  "citizen",
] as const;

export type AgeLevel = (typeof AGE_LEVELS)[number];

export const AGE_LEVEL_LABELS: Record<AgeLevel, string> = {
  "5-year-old": "5 Year Old",
  "10-year-old": "10 Year Old", 
  "15-year-old": "15 Year Old",
  citizen: "Citizen",
};