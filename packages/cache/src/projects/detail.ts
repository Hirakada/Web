import { unstable_cache } from "next/cache";

import type { SupabaseClient } from "@supabase/supabase-js";

import { getProjectById } from "@hirakada/database";

const CACHE_VERSION = "v1";
const ONE_HOUR = 60 * 60;

export const getCachedProject = (
  supabase: SupabaseClient,
  id: string
) =>
  unstable_cache(
    async (projectId: string) =>
      getProjectById(supabase, projectId),
    ["project-detail", CACHE_VERSION],
    {
      tags: [`project:${id}`, "projects"],
      revalidate: ONE_HOUR,
    }
  )(id);