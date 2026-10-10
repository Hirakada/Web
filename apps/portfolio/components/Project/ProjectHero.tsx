"use client";

import { useEffect, useState } from "react";

import type { Project } from "@hirakada/database";

import { CardImage } from "@hirakada/ui";

import { getDominantColor } from "@/lib/project-detail/spotlight";

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
      if (!project.coverImage) {
        setSpotlight(null);
        return;
      }

      const color = await getDominantColor(
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
    <div
      className="
        relative
        aspect-square
        overflow-hidden
        rounded-t-3xl
        md:aspect-auto
        md:h-[clamp(320px,55vh,620px)]
        bg-(--color-surface)
      "
    >
      {spotlight && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            opacity-60
            blur-3xl
            transition-opacity
            duration-700
          "
          style={{
            background: `
              radial-gradient(
                circle at top,
                ${spotlight},
                transparent 70%
              )
            `,
          }}
        />
      )}

      {project.coverImage && (
        <CardImage
          src={project.coverImage}
          alt={project.title}
          width={1600}
          height={900}
          loading="eager"
          sizes="(max-width: 768px) 100vw, 60vw"
          className="
            relative
            z-10
            h-full
            w-full
            object-cover
          "
        />
      )}

      {!project.coverImage && (
        <div
          role="img"
          aria-label={`${project.title} cover image unavailable`}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-sm
            text-(--text-medium-emphasis)
          "
        >
          Cover image unavailable
        </div>
      )}
    </div>
  );
}