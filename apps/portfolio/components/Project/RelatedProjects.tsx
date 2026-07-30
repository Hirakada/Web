import Link from "next/link";

import type { ProjectCard } from "@hirakada/database";

import { DOMAIN } from "@hirakada/config";

import {
  Card,
  CardContent,
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
                  <div className="flex items-center gap-2">
                    {project.attributes
                      .filter((attribute) => attribute.iconUrl)
                      .slice(0, 3)
                      .map((attribute) => (
                        <div
                          key={attribute.id}
                          title={attribute.name}
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                          "
                        >
                          <CardImage
                            src={attribute.iconUrl!}
                            alt={attribute.name}
                            width={20}
                            height={20}
                            className="
                              h-5
                              w-5
                              object-contain
                            "
                          />
                        </div>
                      ))}

                    {project.attributes.length > 3 && (
                      <span
                        className="
                          text-sm
                          font-semibold
                          text-(--text-medium-emphasis)
                        "
                      >
                        +{project.attributes.length - 3}
                      </span>
                    )}
                  </div>

                  {project.contributors.length >
                    0 && (
                    <div className="flex items-center">
                      {project.contributors
                        .slice(0, 3)
                        .map(
                          (
                            contributor,
                            index
                          ) => (
                            <div
                              key={
                                contributor.id
                              }
                              title={
                                contributor.name
                              }
                              className={`
                                relative
                                h-9
                                w-9
                                overflow-hidden
                                rounded-full
                                border-2
                                border-(--color-surface)
                                bg-(--color-surface)
                                ${
                                  index !== 0
                                    ? "-ml-3"
                                    : ""
                                }
                              `}
                              style={{
                                zIndex:
                                  3 - index,
                              }}
                            >
                              {contributor.profileImageUrl && (
                                <CardImage
                                  src={
                                    contributor.profileImageUrl
                                  }
                                  alt={
                                    contributor.name
                                  }
                                  width={36}
                                  height={36}
                                  className="
                                    h-full
                                    w-full
                                    rounded-full
                                    object-cover
                                  "
                                />
                              )}
                            </div>
                          )
                        )}

                      {project.contributors
                        .length > 3 && (
                        <div
                          className="
                            ml-2
                            flex
                            h-9
                            min-w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-[rgba(var(--color-primary-rgb),0.08)]
                            px-2
                            text-xs
                            font-semibold
                            text-(--text-medium-emphasis)
                          "
                        >
                          +
                          {project
                            .contributors
                            .length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </CardFooter>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}