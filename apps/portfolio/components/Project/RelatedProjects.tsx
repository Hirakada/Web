import Link from "next/link";

import {
  PROJECT_STATUS_META,
  type ProjectCard,
} from "@hirakada/database";

import { DOMAIN } from "@hirakada/config";

import {
  BulletTag,
  Card,
  CardAttribute,
  CardContent,
  CardContributor,
  CardFooter,
  CardImage,
  CardTitle,
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
          flex
          w-full
          gap-[clamp(1.5rem,3vw,2.5rem)]
          overflow-x-auto
          overscroll-x-contain
          scrollbar-hide
          snap-x
          snap-mandatory
          md:grid
          md:grid-cols-2
          md:overflow-visible
          md:snap-none
          lg:grid-cols-3
        "
      >
        {projects.map((project) => {
          const status =
            PROJECT_STATUS_META[
              project.status
            ];

          return (
            <Link
              key={project.id}
              href={`${DOMAIN.portfolio}/${project.id}`}
              className="
                block
                h-full
                w-full
                shrink-0
                snap-start
                rounded-3xl
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
                md:w-auto
                md:shrink
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
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}

                <CardContent>
                  <BulletTag
                    variant={status.variant}
                    animated={status.animated}
                  >
                    {project.status}
                  </BulletTag>

                  <CardTitle>
                    {project.title}
                  </CardTitle>

                  <CardFooter>
                    <CardAttribute
                      attributes={project.attributes}
                    />

                    <CardContributor
                      contributors={
                        project.contributors
                      }
                    />
                  </CardFooter>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}