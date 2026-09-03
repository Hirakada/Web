import { notFound } from "next/navigation";

import { createClient } from "@/lib/Supabase/server";

import {
  getCachedProject,
  getCachedRelatedProjects,
} from "@hirakada/cache";

import RelatedProjects from "@/components/Project/RelatedProjects";
import ProjectCard from "@/components/Project/ProjectCard";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const [project, relatedProjects] = await Promise.all([
    getCachedProject(supabase, id),
    getCachedRelatedProjects(supabase, id),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <main
      className="
        mx-auto
        flex
        w-full
        max-w-450
        flex-col
        gap-(--section-padding-y)
        px-(--global-padding-x)
        py-(--section-padding-y)
      "
    >
      <ProjectCard
        project={project}
      />

      <RelatedProjects
        projects={relatedProjects}
      />
    </main>
  );
}