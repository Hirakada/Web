import Link from "next/link";

import { DOMAIN } from "@hirakada/config";
import { getCachedProjectCards } from "@hirakada/cache";
import { PROJECT_STATUS_META } from "@hirakada/database";

import { createClient } from "@/lib/Supabase/server";

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

export default async function Page() {
  const supabase = await createClient();

  const projects = await getCachedProjectCards(supabase);

  return (
    <section
      className="
        w-full
        px-(--global-padding-x)
        py-(--section-padding-y)
      "
    >
      {/* Page Header */}
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-4xl
          flex-col
          items-center
          text-center
        "
      >
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Projects
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-sm
            leading-6
            text-(--text-medium-emphasis)
            sm:text-base
            sm:leading-7
          "
        >
          Browse all projects ranging from web
          development, UI/UX, branding, graphic
          design, and experimental work.
        </p>
      </div>

      {/* Projects Grid */}
      <div
        className="
          mx-auto
          mt-10
          grid
          w-full
          max-w-(--container-width)
          grid-cols-1
          gap-6
          sm:mt-12
          sm:grid-cols-2
          sm:gap-6
          lg:grid-cols-3
          lg:gap-8
        "
      >
        {projects.map((project) => {
          const status =
            PROJECT_STATUS_META[project.status];

          return (
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
                focus-visible:ring-offset-2
                focus-visible:ring-offset-(--color-background)
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
                    loading="lazy"
                    decoding="async"
                    sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1023px) 50vw,
                      33vw
                    "
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