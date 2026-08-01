import type { BulletTagProps } from "@hirakada/ui";

import type {
  ProjectStatus,
  ProjectType,
} from "../types/enums";

type BulletTagVariant = NonNullable<
  BulletTagProps["variant"]
>;

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  {
    variant: BulletTagVariant;
    animated: boolean;
  }
> = {
  Live: {
    variant: "success",
    animated: true,
  },

  Completed: {
    variant: "info",
    animated: false,
  },

  Abandoned: {
    variant: "default",
    animated: false,
  },
};

export const PROJECT_TYPE_META: Record<
  ProjectType,
  {
    variant: BulletTagVariant;
  }
> = {
  Personal: {
    variant: "default",
  },

  Academic: {
    variant: "info",
  },

  Professional: {
    variant: "success",
  },

  Freelance: {
    variant: "warning",
  },

  Business: {
    variant: "muted",
  },

  "Open Source": {
    variant: "default",
  },
};