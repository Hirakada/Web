import { getCachedProjectCards } from "@hirakada/cache";

import { createClient } from "@/lib/Supabase/server";
import ProjectList from "@/components/Project/ProjectList";

export default async function Page() {
  const supabase = await createClient();

  const projects = await getCachedProjectCards(supabase);

  return (
    <section
      className="
        w-full
        px-(--global-padding-x)
        py-(--section-padding-y)
      "
    >
      {/* Page Header */}
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-4xl
          flex-col
          items-center
          text-center
        "
      >
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Projects
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-sm
            leading-6
            text-(--text-medium-emphasis)
            sm:text-base
            sm:leading-7
          "
        >
          Browse all projects ranging from web
          development, UI/UX, branding, graphic
          design, and experimental work.
        </p>
      </div>

      <ProjectList projects={projects} />
    </section>
  );
}