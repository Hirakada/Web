import { unstable_cache } from "next/cache";

import type {
  JourneyEntry,
} from "@hirakada/database";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getJourneyEntries } from "@hirakada/database";

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
    ["journey-entries", "v4"],
    {
      tags: ["journey"],
      revalidate: FIVE_MINUTES,
    }
  )(section) as ReturnType<
    typeof getJourneyEntries<Section>
  >;
}