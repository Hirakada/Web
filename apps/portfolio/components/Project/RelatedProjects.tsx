import Link from "next/link";

import type { ProjectCard } from "@hirakada/database";

import { DOMAIN } from "@hirakada/config";

import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
  CardContributor,
  CardAttribute
} from "@hirakada/ui";

export interface RelatedProjectsProps {
  projects: ProjectCard[];
}

export default function RelatedProjects({
  projects,
}: RelatedProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      className="
        w-full
        space-y-10
      "
    >
      <div className="text-center">
        <h2>Other Projects</h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-(--text-medium-emphasis)
          "
        >
          Explore more projects to discover different
          technologies, design approaches, and
          solutions.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-[clamp(1.5rem,3vw,2.5rem)]
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {projects.map((project) => (
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
            prefetch={false}
          >
            <Card className="h-full">
              {project.coverImage && (
                <CardImage
                  src={project.coverImage}
                  alt={project.title}
                  width={800}
                  height={450}
                />
              )}

              <CardContent>
                <div>
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-green-500/30
                      bg-green-500/10
                      px-3
                      py-1.5
                      text-sm
                      font-medium
                      text-green-400
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-green-500
                      "
                    />

                    {project.status}
                  </span>
                </div>

                <CardTitle>
                  {project.title}
                </CardTitle>

                <CardFooter>
<CardAttribute
  attributes={project.attributes}
/>

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