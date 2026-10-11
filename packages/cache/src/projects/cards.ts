import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

import { getProjectCards } from "@hirakada/database";

const FIVE_MINUTES = 5 * 60;

export async function getCachedProjectCards(
  supabase: SupabaseClient
) {
  return unstable_cache(
    () => getProjectCards(supabase),
    ["project-cards", "v8"],
    {
      tags: ["projects"],
      revalidate: FIVE_MINUTES,
    }
  )();
}