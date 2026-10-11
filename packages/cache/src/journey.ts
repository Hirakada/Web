import { unstable_cache } from "next/cache";

import type {
  JourneyEntry,
} from "@hirakada/database";
import type { SupabaseClient } from "@supabase/supabase-js";

import {
  getJourneyEntries,
  getJourneyEntryById,
} from "@hirakada/database";

const FIVE_MINUTES = 5 * 60;

export function getCachedJourneyEntries<
  Section extends JourneyEntry["section"],
>(
  supabase: SupabaseClient,
  section: Section
) {
  return unstable_cache(
    (requestedSection: JourneyEntry["section"]) =>
      getJourneyEntries(supabase, requestedSection),
    ["journey-entries", "v5"],
    {
      tags: ["journey", "projects"],
      revalidate: FIVE_MINUTES,
    }
  )(section) as ReturnType<
    typeof getJourneyEntries<Section>
  >;
}

export function getCachedJourneyEntry(
  supabase: SupabaseClient,
  id: string
) {
  return unstable_cache(
    (entryId: string) =>
      getJourneyEntryById(supabase, entryId),
    ["journey-entry", "v1"],
    {
      tags: ["journey", "projects", `journey-entry:${id}`],
      revalidate: FIVE_MINUTES,
    }
  )(id);
}