import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getProjectCards } from "@hirakada/database";

const CACHE_VERSION = "v2";

const ONE_HOUR = 60 * 60;

export function getCachedProjectCards(
  supabase: SupabaseClient
) {
  return unstable_cache(
    async () =>
      getProjectCards(supabase),
    [
      "project-cards",
      CACHE_VERSION,
    ],
    {
      tags: ["projects"],
      revalidate: ONE_HOUR,
    }
  )();
}