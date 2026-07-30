import Link from "next/link";

import { DOMAIN } from "@hirakada/config";
import {
  AttributeTag,
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from "@hirakada/ui";

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
                        size-2
                        rounded-full
                        bg-green-500
                      "
                    />

                    {project.status}
                  </span>
                </div>

                {/* Title */}

                <CardTitle>
                  {project.title}
                </CardTitle>

                {/* Footer */}

                <CardFooter>
                  {/* Attributes */}

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
                            className="h-5 w-5 object-contain"
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

                  {/* Contributors */}

                  {project.contributors.length > 0 && (
                    <div className="flex items-center">
                      {project.contributors
                        .slice(0, 3)
                        .map((contributor, index) => (
                          <div
                            key={contributor.id}
                            title={contributor.name}
                            className={`
                              relative
                              h-9
                              w-9
                              overflow-hidden
                              rounded-full
                              border-2
                              border-(--color-surface)
                              bg-(--color-surface)
                              transition-transform
                              duration-300
                              hover:z-20
                              hover:scale-110
                              ${index !== 0 ? "-ml-3" : ""}
                            `}
                            style={{
                              zIndex: 3 - index,
                            }}
                          >
                            {contributor.profileImageUrl && (
                              <CardImage
                                src={contributor.profileImageUrl}
                                alt={contributor.name}
                                width={36}
                                height={36}
                                className="h-full w-full rounded-full object-cover"
                              />
                            )}
                          </div>
                        ))}

                      {project.contributors.length > 3 && (
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
                          +{project.contributors.length - 3}
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