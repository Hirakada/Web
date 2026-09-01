import { createClient } from "@/lib/Supabase/server";

import {
  JourneyHero,
  Experience,
  Organizations,
  Education,
  Research,
  CurrentChapter,
} from "@/components/journey";

function sortJourney<
  T extends {
    start_date: string;
    end_date: string | null;
  },
>(items: T[]) {
  return [...items].sort((a, b) => {
    if (a.end_date === null && b.end_date !== null) {
      return -1;
    }

    if (a.end_date !== null && b.end_date === null) {
      return 1;
    }

    return (
      new Date(b.start_date).getTime() -
      new Date(a.start_date).getTime()
    );
  });
}

function normalizeOrganization<
  T extends {
    organizations: unknown;
  },
>(items: T[]) {
  return items.map((item) => ({
    ...item,
    organizations: Array.isArray(item.organizations)
      ? item.organizations[0] ?? null
      : item.organizations ?? null,
  }));
}

export default async function JourneyPage() {
  const supabase = await createClient();

  const [
    { data: experiences, error: experiencesError },
    { data: education, error: educationError },
    { data: research, error: researchError },
  ] = await Promise.all([
    supabase
      .from("journey_entries")
      .select(`
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
        organizations (
          id,
          name,
          slug,
          logo_path,
          website,
          address,
          city,
          state_province,
          postal_code,
          country
        )
      `)
      .eq("section", "experience"),

    supabase
      .from("journey_entries")
      .select(`
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
        organizations (
          id,
          name,
          slug,
          logo_path,
          website,
          address,
          city,
          state_province,
          postal_code,
          country
        )
      `)
      .eq("section", "education"),

    supabase
      .from("journey_research")
      .select(`
        id,
        title,
        description,
        start_date,
        end_date,
        doi,
        sort_order,
        research_links (
          id,
          type,
          label,
          url,
          sort_order
        )
      `),
  ]);

  if (experiencesError) {
    throw new Error(experiencesError.message);
  }

  if (educationError) {
    throw new Error(educationError.message);
  }

  if (researchError) {
    throw new Error(researchError.message);
  }

  const normalizedExperiences = normalizeOrganization(
    experiences ?? [],
  );

  const sortedExperiences = sortJourney(
    normalizedExperiences,
  );

  const work = sortedExperiences.filter(
    (item) => item.experience_type === "work",
  );

  const organizations = sortedExperiences.filter(
    (item) => item.experience_type === "organization",
  );

  const sortedEducation = sortJourney(
    normalizeOrganization(education ?? []),
  );

  const sortedResearch = sortJourney(
    research ?? [],
  );

  return (
    <>
      <JourneyHero />

      <Experience
        experiences={work}
      />

      <Education
        education={sortedEducation}
      />

      <CurrentChapter />
    </>
  );
}