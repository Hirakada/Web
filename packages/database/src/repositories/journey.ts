import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProjectCard } from "../types/project";
import { getProjectCardsByExperienceIds } from "./projects";

export interface JourneyEntry {
  id: string;
  section: "experience" | "education";
  experience_type: "work" | "entrepreneur" | null;
  title: string;
  role: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  url: string | null;
  sort_order: number;
  projects: ProjectCard[];
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

  const entries = (data ?? []).map((entry) => ({
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
    projects: [],
  })) as unknown as Extract<JourneyEntry, { section: Section }>[];

  if (section !== "experience" || entries.length === 0) {
    return entries;
  }

  const projectCards = await getProjectCardsByExperienceIds(
    supabase,
    entries.map((entry) => entry.id)
  );
  const projectsByExperienceId = new Map<string, ProjectCard[]>();

  for (const project of projectCards) {
    if (!project.experienceId) {
      continue;
    }

    const associatedProjects =
      projectsByExperienceId.get(project.experienceId) ?? [];
    associatedProjects.push(project);
    projectsByExperienceId.set(
      project.experienceId,
      associatedProjects
    );
  }

  return entries.map((entry) => ({
    ...entry,
    projects: projectsByExperienceId.get(entry.id) ?? [],
  }));
}

export async function getJourneyEntryById(
  supabase: SupabaseClient,
  id: string
): Promise<JourneyEntry | null> {
  const { data, error } = await supabase
    .from("journey_entries")
    .select(JOURNEY_SELECT)
    .eq("id", id)
    .eq("section", "experience")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const entry = ({
    ...(data as unknown as Omit<JourneyEntry, "organizations"> & {
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
    organizations: Array.isArray(data.organizations)
      ? data.organizations[0] ?? null
      : data.organizations ?? null,
    attributes: Array.isArray(data.journey_attributes)
      ? data.journey_attributes.flatMap((relation) =>
          relation.attribute
            ? Array.isArray(relation.attribute)
              ? relation.attribute
              : [relation.attribute]
            : []
        )
      : [],
    images: data.images ?? [],
    links: data.links ?? [],
    projects: [],
  }) as unknown as JourneyEntry;

  entry.projects = await getProjectCardsByExperienceIds(supabase, [
    id,
  ]);

  return entry;
}