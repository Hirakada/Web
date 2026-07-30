import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getProjectById } from "@hirakada/database";

export const getCachedProject = (
  supabase: SupabaseClient,
  id: string
) =>
  unstable_cache(
    async () => getProjectById(supabase, id),
    ["project", id],
    {
      tags: ["projects", `project:${id}`],
      revalidate: 60 * 60,
    }
  )();