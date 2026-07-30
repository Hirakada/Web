"use client";

import { useEffect, useState } from "react";

import type { Project } from "@hirakada/database";

import {
  BulletTag,
  CardImage,
} from "@hirakada/ui";

import {
  getDominantColor,
} from "@/lib/project-detail/spotlight";

import ProjectActions from "./ProjectActions";

export interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({
  project,
}: ProjectHeroProps) {
  const [spotlight, setSpotlight] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadSpotlight() {
      if (!project.coverImage) return;

      const color =
        await getDominantColor(
          project.coverImage
        );

      if (mounted) {
        setSpotlight(color);
      }
    }

    loadSpotlight();

    return () => {
      mounted = false;
    };
  }, [project.coverImage]);

  return (
    <header className="relative overflow-hidden">
      {spotlight && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-40
            blur-3xl
          "
          style={{
            background: `radial-gradient(circle at top, ${spotlight}, transparent 70%)`,
          }}
        />
      )}

      {project.coverImage && (
        <CardImage
          src={project.coverImage}
          alt={project.title}
          width={1600}
          height={900}
          className="
            h-[clamp(280px,50vh,560px)]
            w-full
            object-cover
          "
        />
      )}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-6
          p-[clamp(1.5rem,3vw,3rem)]
        "
      >
        <BulletTag variant="success">
          {project.status}
        </BulletTag>

        <div className="max-w-4xl">
          <h1>{project.title}</h1>

          <p
            className="
              mt-4
              text-lg
              text-(--text-medium-emphasis)
            "
          >
            {project.description}
          </p>
        </div>

        <ProjectActions
          project={project}
        />
      </div>
    </header>
  );
}