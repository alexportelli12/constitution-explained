/**
 * Age level constants and types for the Constitution of Malta Explained app
 */

export enum AgeLevel {
  FIVE_YEAR_OLD = "5-year-old",
  TEN_YEAR_OLD = "10-year-old",
  FIFTEEN_YEAR_OLD = "15-year-old",
  CITIZEN = "citizen",
}

export const AGE_LEVELS = [
  AgeLevel.FIVE_YEAR_OLD,
  AgeLevel.TEN_YEAR_OLD,
  AgeLevel.FIFTEEN_YEAR_OLD,
  AgeLevel.CITIZEN,
] as const;

export const AGE_LEVEL_LABELS: Record<AgeLevel, string> = {
  [AgeLevel.FIVE_YEAR_OLD]: "5 Year Old",
  [AgeLevel.TEN_YEAR_OLD]: "10 Year Old",
  [AgeLevel.FIFTEEN_YEAR_OLD]: "15 Year Old",
  [AgeLevel.CITIZEN]: "Citizen",
};
