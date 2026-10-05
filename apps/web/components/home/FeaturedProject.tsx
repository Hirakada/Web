import type { ProjectCard } from "@hirakada/database";

import { AttributeTag } from "@hirakada/ui";

import FeaturedProjectCarousel from "./FeaturedProjectCarousel";

interface FeaturedProjectProps {
  projects: ProjectCard[];
}

export default function FeaturedProject({
  projects,
}: FeaturedProjectProps) {
  const eligibleProjects = projects.filter(
    (project) =>
      project.isFeatured === true &&
      typeof project.coverImage === "string" &&
      project.coverImage.trim().length > 0
  );

  const featuredProjects =
    eligibleProjects.length > 5
      ? shuffleProjects(eligibleProjects).slice(0, 5)
      : eligibleProjects;

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="
        w-full
        px-(--global-padding-x)
        py-(--section-padding-y)
      "
    >
      {/* Section Header */}

      <div
        className="
          mx-auto
          flex
          w-full
          flex-col
          items-center
          text-center
        "
      >
        <h2>
          Featured Projects
        </h2>

        <p
          className="
            mt-4
            max-w-2xl
            text-(--text-medium-emphasis)
          "
        >
          Here&apos;s a curated selection of my most impactful
          and innovative projects, highlighting key skills
          and creative solutions.
        </p>
      </div>

      {/* Categories */}

      <div
        className="
          mt-8
          flex
          w-full
          flex-wrap
          justify-center
          gap-[clamp(1rem,2vw,1.75rem)]
        "
      >
        <AttributeTag>
          UI/UX Design
        </AttributeTag>

        <AttributeTag>
          Web Development
        </AttributeTag>

        <AttributeTag>
          Graphic Design
        </AttributeTag>
      </div>

      <FeaturedProjectCarousel
        projects={featuredProjects}
      />
    </section>
  );
}

function shuffleProjects(
  projects: readonly ProjectCard[]
): ProjectCard[] {
  const shuffled = [...projects];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex]!,
      shuffled[index]!,
    ];
  }

  return shuffled;
}