import type { SupabaseClient } from "@supabase/supabase-js";

export interface JourneyEntry {
  id: string;
  section: "experience" | "education";
  experience_type: "work" | "entrepreneur";
  title: string;
  role: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  url: string | null;
  sort_order: number;
  organizations: {
    id: string;
    name: string;
    city: string;
    country: string;
  } | null;
}

const JOURNEY_SELECT = `
  id,
  section,
  experience_type,
  title,
  role,
  description,
  start_date,
  end_date,
  location,
  url,
  sort_order,
  organizations(
    id,
    name,
    city,
    country
  )
`;

export async function getJourneyEntries<
  Section extends JourneyEntry["section"],
>(
  supabase: SupabaseClient,
  section: Section
): Promise<Extract<JourneyEntry, { section: Section }>[]> {
  const { data, error } = await supabase
    .from("journey_entries")
    .select(JOURNEY_SELECT)
    .eq("section", section);

  if (error) {
    throw error;
  }

  return (data ?? []).map((entry) => ({
    ...(entry as unknown as Omit<JourneyEntry, "organizations"> & {
      organizations:
        | JourneyEntry["organizations"]
        | JourneyEntry["organizations"][]
        | null;
    }),
    organizations: Array.isArray(entry.organizations)
      ? entry.organizations[0] ?? null
      : entry.organizations ?? null,
  })) as Extract<JourneyEntry, { section: Section }>[];
}