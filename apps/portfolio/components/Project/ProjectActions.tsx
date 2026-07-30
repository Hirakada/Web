import type { Project } from "@hirakada/database";

import Link from "next/link";

import { Icon } from "@iconify/react";

export interface ProjectActionsProps {
  project: Project;
}

function ActionButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-[rgba(var(--color-secondary-rgb),0.12)]
        bg-(--color-surface)
        px-5
        py-3
        text-sm
        font-medium
        transition-all
        duration-200
        hover:border-[rgba(var(--color-primary-rgb),0.3)]
        hover:bg-[rgba(var(--color-primary-rgb),0.05)]
      "
    >
      <Icon
        icon={icon}
        className="text-lg"
      />

      <span>{label}</span>
    </Link>
  );
}

export default function ProjectActions({
  project,
}: ProjectActionsProps) {
  if (
    !project.projectUrl &&
    !project.githubUrl
  ) {
    return null;
  }

  return (
    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >
      {project.projectUrl && (
        <ActionButton
          href={project.projectUrl}
          icon="mdi:open-in-new"
          label="Open Project"
        />
      )}

      {project.githubUrl && (
        <ActionButton
          href={project.githubUrl}
          icon="mdi:github"
          label="GitHub"
        />
      )}
    </div>
  );
}