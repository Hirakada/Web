"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { DOMAIN } from "@hirakada/config";
import {
  PROJECT_STATUS_META,
  type ProjectCard as ProjectCardData,
} from "@hirakada/database";
import {
  BulletTag,
  Card,
  CardAttribute,
  CardContent,
  CardContributor,
  CardFooter,
  CardTitle,
} from "@hirakada/ui";

import ProjectCover from "./ProjectCover";

const PROJECTS_PER_PAGE = 9;

interface ProjectListProps {
  projects: ProjectCardData[];
}

export default function ProjectList({
  projects,
}: ProjectListProps) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const categoryMap = new Map(
      projects.flatMap((project) =>
        project.categories.map((category) => [
          category.id,
          category,
        ] as const)
      )
    );

    return Array.from(categoryMap.values()).sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        categoryId === "all" ||
        project.categories.some(
          (category) => category.id === categoryId
        );

      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableContent = [
        project.title,
        project.description,
        ...project.categories.map(
          (category) => category.name
        ),
        ...project.attributes.map(
          (attribute) => attribute.name
        ),
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchableContent.includes(query);
    });
  }, [categoryId, projects, search]);

  const totalPages = Math.ceil(
    filteredProjects.length / PROJECTS_PER_PAGE
  );
  const pageStart = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = filteredProjects.slice(
    pageStart,
    pageStart + PROJECTS_PER_PAGE
  );

  function updateSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function updateCategory(value: string) {
    setCategoryId(value);
    setCurrentPage(1);
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-(--container-width) sm:mt-12">
      <div
        className="
          mb-8
          grid
          grid-cols-1
          gap-4
          md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.5fr)]
        "
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="project-search"
            className="text-sm font-medium"
          >
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={search}
            onChange={(event) =>
              updateSearch(event.target.value)
            }
            placeholder="Search by title, description, category, or technology"
            className="
              min-h-12
              rounded-xl
              border
              border-(--color-border)
              bg-(--color-surface)
              px-4
              text-(--text-high-emphasis)
              outline-none
              transition
              focus-visible:ring-2
              focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="project-category"
            className="text-sm font-medium"
          >
            Category
          </label>
          <select
            id="project-category"
            value={categoryId}
            onChange={(event) =>
              updateCategory(event.target.value)
            }
            className="
              min-h-12
              rounded-xl
              border
              border-(--color-border)
              bg-(--color-surface)
              px-4
              text-(--text-high-emphasis)
              outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
            "
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            md:gap-6
            lg:grid-cols-3
            lg:gap-8
          "
        >
          {visibleProjects.map((project, index) => {
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
                  <ProjectCover
                    imageUrl={project.coverImage}
                    title={project.title}
                    eager={index === 0}
                    sizes="
                      (max-width: 767px) 100vw,
                      (max-width: 1023px) 50vw,
                      33vw
                    "
                  />

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
                        contributors={project.contributors}
                      />
                    </CardFooter>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          className="
            rounded-2xl
            border
            border-(--color-border)
            bg-(--color-surface)
            px-6
            py-12
            text-center
          "
          role="status"
        >
          <p>No projects found.</p>
          {(search || categoryId !== "all") && (
            <button
              type="button"
              onClick={() => {
                updateSearch("");
                updateCategory("all");
              }}
              className="
                mt-4
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-(--text-medium-emphasis)
                underline
                underline-offset-4
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
              "
            >
              Clear search and filters
            </button>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Project pages"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              aria-current={
                currentPage === page ? "page" : undefined
              }
              onClick={() => setCurrentPage(page)}
              className={`
                min-h-10
                min-w-10
                rounded-lg
                border
                px-3
                text-sm
                font-medium
                transition
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
                ${
                  currentPage === page
                    ? "border-(--color-border-strong) bg-(--color-surface) text-(--text-high-emphasis)"
                    : "border-(--color-border) text-(--text-medium-emphasis) hover:bg-(--color-surface)"
                }
              `}
            >
              {page}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
