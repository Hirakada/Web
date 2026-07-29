import type { Metadata } from "next";
import { SITE } from "./site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },

  description: SITE.description,
};