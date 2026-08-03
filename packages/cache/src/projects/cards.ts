import type { SupabaseClient } from "@supabase/supabase-js";

import { getProjectCards } from "@hirakada/database";

export async function getCachedProjectCards(
  supabase: SupabaseClient
) {
  return getProjectCards(supabase);
}