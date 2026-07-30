import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getProjectById } from "@hirakada/database";

export function getCachedProject(
  supabase: SupabaseClient,
  id: string
) {
  const cached = unstable_cache(
    async (projectId: string) => {
      return getProjectById(supabase, projectId);
    },
    ["project"],
    {
      tags: [`project:${id}`, "projects"],
      revalidate: 60 * 60,
    }
  );

  return cached(id);
}