import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getProjectCards } from "@hirakada/database";

const CACHE_VERSION = "v1";
const ONE_HOUR = 60 * 60;

export const getCachedProjectCards = (
  supabase: SupabaseClient
) =>
  unstable_cache(
    async () => getProjectCards(supabase),
    ["project-cards", CACHE_VERSION],
    {
      tags: ["projects"],
      revalidate: ONE_HOUR,
    }
  )();