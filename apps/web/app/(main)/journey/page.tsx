import { createClient } from "@/lib/Supabase/server";
import { getCachedJourneyEntries } from "@hirakada/cache";

import {
  JourneyHero,
  Experience,
  Education,
  CurrentChapter,
} from "@/components/journey";
import { JourneyQuickTabs } from "@/components/journey/JourneyQuickTabs";

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

    const endDateDifference =
      new Date(`${b.end_date}T00:00:00`).getTime() -
      new Date(`${a.end_date}T00:00:00`).getTime();

    if (endDateDifference !== 0) {
      return endDateDifference;
    }

    return (
      new Date(`${b.start_date}T00:00:00`).getTime() -
      new Date(`${a.start_date}T00:00:00`).getTime()
    );
  });
}

export default async function JourneyPage() {
  const supabase = await createClient();

  const [
    experiences,
    education,
  ] = await Promise.all([
    getCachedJourneyEntries(supabase, "experience"),
    getCachedJourneyEntries(supabase, "education"),
  ]);

  const sortedExperiences = sortJourney(
    experiences,
  );

  const sortedEducation = sortJourney(
    education,
  );

  return (
    <>
      <JourneyQuickTabs />

      <JourneyHero />

      <Experience
        id="journey-experience"
        experiences={sortedExperiences}
      />

      <Education
        id="journey-education"
        education={sortedEducation}
      />

      <CurrentChapter id="journey-current" />
    </>
  );
}