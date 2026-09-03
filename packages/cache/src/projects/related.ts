import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getRelatedProjects } from "@hirakada/database";

const ONE_HOUR = 60 * 60;

export function getCachedRelatedProjects(
  supabase: SupabaseClient,
  id: string
) {
  return unstable_cache(
    (projectId: string) =>
      getRelatedProjects(supabase, projectId, 3),
    ["related-projects", "v1"],
    {
      tags: ["projects", `project:${id}`],
      revalidate: ONE_HOUR,
    }
  )(id);
}