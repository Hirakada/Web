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
    slug: string;
    description: string | null;
    logo_path: string | null;
    website: string | null;
    address: string | null;
    city: string;
    state_province: string | null;
    postal_code: string | null;
    country: string;
  } | null;
  attributes: {
    id: string;
    name: string;
    type: string | null;
    icon_url: string | null;
    description: string | null;
  }[];
  images: {
    id: string;
    image_path: string;
    alt: string | null;
    type: string | null;
    sort_order: number;
  }[];
  links: {
    id: string;
    label: string;
    url: string;
    sort_order: number;
  }[];
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
    slug,
    description,
    logo_path,
    website,
    address,
    city,
    state_province,
    postal_code,
    country
  ),
  journey_attributes(
    attribute:attributes(
      id,
      name,
      type,
      icon_url,
      description
    )
  ),
  images:journey_images(
    id,
    image_path,
    alt,
    type,
    sort_order
  ),
  links:journey_links(
    id,
    label,
    url,
    sort_order
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
      journey_attributes: {
        attribute:
          | JourneyEntry["attributes"][number]
          | JourneyEntry["attributes"][number][]
          | null;
      }[];
    }),
    organizations: Array.isArray(entry.organizations)
      ? entry.organizations[0] ?? null
      : entry.organizations ?? null,
    attributes: Array.isArray(entry.journey_attributes)
      ? entry.journey_attributes.flatMap((relation) =>
          relation.attribute
            ? Array.isArray(relation.attribute)
              ? relation.attribute
              : [relation.attribute]
            : [],
        )
      : [],
    images: entry.images ?? [],
    links: entry.links ?? [],
  })) as unknown as Extract<JourneyEntry, { section: Section }>[];
}