import { notFound } from "next/navigation";

import { createClient } from "@/lib/Supabase/server";
import { shuffleAndTake } from "@/lib/project-detail/shuffle";

import {
  getProjectById,
  getProjects,
} from "@hirakada/database";

import {
  ProjectCard,
} from "@/components/Project";

import RelatedProjects from "@/components/Project/RelatedProjects";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params;

  console.log("Route ID:", id);

  const supabase = await createClient();

  const [project, projects] = await Promise.all([
    getProjectById(supabase, id),
    getProjects(supabase),
  ]);

  console.log("Project:", project);

  if (!project) {
    throw new Error(`Project "${id}" not found`);
    // atau notFound();
  }

  const relatedProjects = shuffleAndTake(
    projects.filter((item) => item.id !== project.id),
    Math.min(3, Math.max(0, projects.length - 1))
  );

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
      <ProjectCard project={project} />

      <RelatedProjects
        projects={relatedProjects}
      />
    </main>
  );
}