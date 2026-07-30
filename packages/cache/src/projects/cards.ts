import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import {
  getProjectCards,
} from "@hirakada/database";

export const getCachedProjectCards = (
  supabase: SupabaseClient
) =>
  unstable_cache(
    async () => {
      return getProjectCards(supabase);
    },
    ["project-cards"],
    {
      tags: ["projects"],
      revalidate: 60 * 60, // 1 hour
    }
  )();