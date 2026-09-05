import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

import { getProjectCards } from "@hirakada/database";

const ONE_HOUR = 60 * 60;

export async function getCachedProjectCards(
  supabase: SupabaseClient
) {
  return unstable_cache(
    () => getProjectCards(supabase),
    ["project-cards", "v4"],
    {
      tags: ["projects"],
      revalidate: ONE_HOUR,
    }
  )();
}