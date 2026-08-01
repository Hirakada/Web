import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getProjectById } from "@hirakada/database";

const CACHE_VERSION = "v2";

const ONE_HOUR = 60 * 60;

export function getCachedProject(
  supabase: SupabaseClient,
  id: string
) {
  return unstable_cache(
    async (projectId: string) =>
      getProjectById(
        supabase,
        projectId
      ),
    [
      "project-detail",
      CACHE_VERSION,
    ],
    {
      tags: [
        "projects",
        `project:${id}`,
      ],
      revalidate: ONE_HOUR,
    }
  )(id);
}