import type { Contributor } from "@hirakada/database";

import ContributorCard from "./ContributorCard";

export interface ProjectContributorsProps {
  contributors: Contributor[];
}

export default function ProjectContributors({
  contributors,
}: ProjectContributorsProps) {
  const isFewContributors =
    contributors.length <= 2;

  return (
    <section
      className="
        flex
        flex-col
        items-center
        space-y-10
      "
    >
      {/* Header */}
      <header
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[rgba(var(--color-primary-rgb),0.16)]
            bg-[rgba(var(--color-primary-rgb),0.08)]
            px-3
            py-1.5
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-(--color-primary)
          "
        >
          <span>
            Contributors
          </span>
        </div>

        <h2
          className="
            mt-6
            text-3xl
            font-bold
            tracking-tight
            md:text-4xl
          "
        >
          Project Contributors
        </h2>

        <p
          className="
            max-w-3xl
            text-base
            leading-7
            text-(--text-medium-emphasis)
          "
        >
          Meet the talented people behind this project—from planning
          and design to development and delivery.
        </p>
      </header>

      {/* Mobile Carousel */}
      <div
        className="
          w-full
          overflow-x-auto
          overscroll-x-contain
          scrollbar-hide
          snap-x
          snap-mandatory
          md:hidden
        "
      >
        <div
          className={`
            flex
            min-w-max
            items-stretch
            gap-3
            pb-2
            ${
              isFewContributors
                ? "justify-center px-[calc((100vw-18rem)/2)]"
                : "justify-start px-0"
            }
          `}
        >
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="
                w-72
                shrink-0
                snap-center
              "
            >
              <ContributorCard
                contributor={contributor}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div
        className="
          hidden
          w-full
          justify-center
          md:flex
        "
      >
        <div
          className="
            grid
            gap-6
            md:grid-cols-[repeat(2,18rem)]
            lg:grid-cols-[repeat(4,18rem)]
          "
        >
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="
                w-72
              "
            >
              <ContributorCard
                contributor={contributor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}