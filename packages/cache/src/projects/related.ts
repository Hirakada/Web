import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getRelatedProjects } from "@hirakada/database";

const FIVE_MINUTES = 5 * 60;

export function getCachedRelatedProjects(
  supabase: SupabaseClient,
  id: string
) {
  return unstable_cache(
    (projectId: string) =>
      getRelatedProjects(supabase, projectId, 3),
    ["related-projects", "v5"],
    {
      tags: ["projects", `project:${id}`],
      revalidate: FIVE_MINUTES,
    }
  )(id);
}