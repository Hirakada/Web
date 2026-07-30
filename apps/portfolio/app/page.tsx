import Link from "next/link";

import { createClient } from "@/lib/Supabase/server";

import { DOMAIN } from "@hirakada/config";

import {
  getProjectCards,
} from "@hirakada/database";

import {
  AttributeTag,
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from "@hirakada/ui";

export default async function Page() {
  const supabase = await createClient();

  const projects = await getProjectCards(supabase);

  return (
    <section
      className="
        w-full
        px-(--global-padding-x)
        py-(--section-padding-y)
      "
    >
      {/* Header */}

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
        <h1>Projects</h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-(--text-medium-emphasis)
          "
        >
          Browse all projects ranging from web
          development, UI/UX, branding, graphic design,
          and experimental work.
        </p>
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
            aria-label={`View ${project.title}`}
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
                        size-2
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