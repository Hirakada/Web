import Link from "next/link";

import { DOMAIN } from "@hirakada/config";
import {
  AttributeTag,
  BulletTag,
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
  CardContributor,
  CardAttribute 
} from "@hirakada/ui";

const statusVariants = {
  Live: "success",
  Completed: "info",
  Abandoned: "muted",
} as const;

import type {
  ProjectCard,
} from "@hirakada/database";

interface FeaturedProjectProps {
  projects: ProjectCard[];
}

export default function FeaturedProject({
  projects,
}: FeaturedProjectProps) {
  const featuredProjects = projects.filter(
    (project) => project.isFeatured,
  );

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
        <AttributeTag>UI/UX Design</AttributeTag>
        <AttributeTag>Web Development</AttributeTag>
        <AttributeTag>Graphic Design</AttributeTag>
      </div>

      {/* Projects */}

      <div
        className="
          mt-12
          grid
          w-full
          grid-cols-1
          gap-[clamp(1.5rem,3vw,2.5rem)]
          md:grid-cols-2
          lg:grid-cols-[repeat(3,minmax(280px,1fr))]
        "
      >
        {featuredProjects.map((project) => (
          <Link
            key={project.id}
            href={`${DOMAIN.portfolio}/${project.id}`}
            className="
              block
              h-full
              rounded-3xl
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
            "
            aria-label={`View ${project.title}`}
            prefetch={false}
          >
            <Card className="h-full">
              {/* Cover */}

              {project.coverImage && (
                <CardImage
                  src={project.coverImage}
                  alt={project.title}
                  width={800}
                  height={450}
                />
              )}

              {/* Content */}

              <CardContent>
                {/* Status */}

                <div>
                  <BulletTag
                    variant={statusVariants[project.status as keyof typeof statusVariants]}
                  >
                    {project.status}
                  </BulletTag>
                </div>

                {/* Title */}

                <CardTitle>
                  {project.title}
                </CardTitle>

                {/* Footer */}

                <CardFooter>
                  {/* Attributes */}

                  <CardAttribute
                    attributes={project.attributes}
                  />

                  {/* Contributors */}

                  <CardContributor 
                    contributors={project.contributors} 
                  />

                </CardFooter>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}