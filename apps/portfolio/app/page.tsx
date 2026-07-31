import Link from "next/link";

import { createClient } from "@/lib/Supabase/server";

import { DOMAIN } from "@hirakada/config";

import {
  getCachedProjectCards,
} from "@hirakada/cache";

import {
  getAttributes,
} from "@hirakada/database";

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
                  <BulletTag
                    variant={
                      statusVariants[
                        project.status as keyof typeof statusVariants
                      ]
                    }
                  >
                    {project.status}
                  </BulletTag>
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