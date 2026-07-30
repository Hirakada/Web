import Link from "next/link";

import type { Contributor } from "@hirakada/database";

import { CardImage } from "@hirakada/ui";

import { Icon } from "@iconify/react";

export interface ProjectContributorsProps {
  contributors: Contributor[];
}

export default function ProjectContributors({
  contributors,
}: ProjectContributorsProps) {
  return (
    <div className="space-y-5">
      <h2>Contributors</h2>

      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {contributors.map((contributor) => (
          <article
            key={contributor.id}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-[rgba(var(--color-secondary-rgb),0.08)]
              bg-(--color-surface)
              p-4
              transition-colors
              hover:border-[rgba(var(--color-primary-rgb),0.20)]
            "
          >
            <div
              className="
                h-14
                w-14
                overflow-hidden
                rounded-full
                bg-(--color-surface-secondary)
                shrink-0
              "
            >
              {contributor.profileImageUrl ? (
                <CardImage
                  src={contributor.profileImageUrl}
                  alt={contributor.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    text-lg
                    font-semibold
                  "
                >
                  {contributor.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className="
                  truncate
                  text-base
                  font-semibold
                "
              >
                {contributor.name}
              </h3>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-3
                "
              >
                {contributor.websiteUrl && (
                  <Link
                    href={contributor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contributor.name} website`}
                  >
                    <Icon
                      icon="mdi:web"
                      className="
                        text-xl
                        text-(--text-medium-emphasis)
                        transition-colors
                        hover:text-(--color-primary)
                      "
                    />
                  </Link>
                )}

                {contributor.linkedinUrl && (
                  <Link
                    href={contributor.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contributor.name} LinkedIn`}
                  >
                    <Icon
                      icon="mdi:linkedin"
                      className="
                        text-xl
                        text-(--text-medium-emphasis)
                        transition-colors
                        hover:text-(--color-primary)
                      "
                    />
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}