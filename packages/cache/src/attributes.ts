import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getAttributes } from "@hirakada/database";

const FIVE_MINUTES = 5 * 60;

export function getCachedAttributes(
  supabase: SupabaseClient
) {
  return unstable_cache(
    () => getAttributes(supabase),
    ["attributes", "v4"],
    {
      tags: ["attributes"],
      revalidate: FIVE_MINUTES,
    }
  )();
}