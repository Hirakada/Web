export const PROJECT_TYPES = [
  "Personal",
  "Academic",
  "Professional",
  "Freelance",
  "Business",
  "Open Source",
] as const;

export type ProjectType =
  (typeof PROJECT_TYPES)[number];

export const PROJECT_STATUSES = [
  "Abandoned",
  "Live",
  "Completed",
] as const;

export type ProjectStatus =
  (typeof PROJECT_STATUSES)[number];

export const ATTRIBUTE_TYPES = [
  "skill",
  "tool",
  "language",
  "framework",
  "marketing_skill",
  "soft_skill",
] as const;

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[number];