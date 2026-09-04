import type { Project } from "@hirakada/database";

import { Card } from "@hirakada/ui";

import ProjectHero from "./ProjectHero";
import ProjectContent from "./ProjectContent";

export interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Card
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[rgba(var(--color-secondary-rgb),0.08)]
        bg-(--color-surface)
        shadow-sm
        hover:translate-y-0
        hover:shadow-sm
        hover:border-(--color-border)
      "
    >
      <ProjectHero
        project={project}
      />

      <div
        className="
          h-px
          w-full
          bg-[rgba(var(--color-secondary-rgb),0.08)]
        "
      />

      <ProjectContent
        project={project}
      />
    </Card>
  );
}