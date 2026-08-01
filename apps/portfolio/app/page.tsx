import Link from "next/link";

import { createClient } from "@/lib/Supabase/server";

import { DOMAIN } from "@hirakada/config";

import {
  getCachedProjectCards,
} from "@hirakada/cache";

import {
  PROJECT_STATUS_META,
} from "@hirakada/database";

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

  const projects =
    await getCachedProjectCards(
      supabase
    );

  return (
    <section
      className="
        w-full
        px-(--global-padding-x)
        py-(--section-padding-y)
      "
    >
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
          development, UI/UX, branding, graphic
          design, and experimental work.
        </p>
      </div>

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
                  <BulletTag
                    variant={status.variant}
                    animated={
                      status.animated
                    }
                  >
                    {project.status}
                  </BulletTag>

                  <CardTitle>
                    {project.title}
                  </CardTitle>

                  <CardFooter>
                    <CardAttribute
                      attributes={
                        project.attributes
                      }
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