"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { DOMAIN } from "@hirakada/config";
import {
  PROJECT_STATUS_META,
  type ProjectCard,
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

interface FeaturedProjectCarouselProps {
  projects: ProjectCard[];
}

export default function FeaturedProjectCarousel({
  projects,
}: FeaturedProjectCarouselProps) {
  const slides = projects
    .filter((project) => project.isFeatured === true)
    .slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  function getSlideOffset(index: number) {
    const offset = (index - activeIndex + slides.length) % slides.length;

    return offset > slides.length / 2
      ? offset - slides.length
      : offset;
  }

  function showPreviousSlide() {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  }

  function showNextSlide() {
    setActiveIndex((index) => (index + 1) % slides.length);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="mt-12 w-full"
    >
      <div className="grid w-full [perspective:1200px]">
        {slides.map((project, index) => {
          const status =
            PROJECT_STATUS_META[project.status];
          const offset = getSlideOffset(index);
          const distance = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                x: `${offset * 78}%`,
                y: distance * 8,
                rotateY: offset * -28,
                scale: isActive ? 1 : distance === 1 ? 0.88 : 0.74,
                opacity: isActive ? 1 : distance === 1 ? 0.76 : 0.42,
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 150,
                      damping: 22,
                    }
              }
              style={{
                transformStyle: "preserve-3d",
                zIndex: slides.length - distance,
                pointerEvents: distance > 1 ? "none" : "auto",
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${project.title}`}
              aria-hidden={!isActive}
              onClick={(event) => {
                if (!isActive) {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className="
                col-start-1
                row-start-1
                mx-auto
                w-[min(86vw,34rem)]
                md:w-[min(48vw,38rem)]
              "
            >
              <Link
                href={`${DOMAIN.portfolio}/${project.id}`}
                tabIndex={isActive ? 0 : -1}
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
                  {project.coverImage ? (
                    <CardImage
                      src={project.coverImage}
                      alt={project.title}
                      width={800}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${project.title} preview unavailable`}
                      className="flex h-50 w-full shrink-0 items-center justify-center border-b border-(--color-border) bg-(--color-surface) text-sm text-(--text-medium-emphasis)"
                    >
                      Preview unavailable
                    </div>
                  )}

                  <CardContent className="justify-start">
                    <BulletTag
                      variant={status.variant}
                      animated={status.animated}
                    >
                      {project.status}
                    </BulletTag>

                    <CardTitle className="min-h-[2.5em] line-clamp-2">
                      {project.title}
                    </CardTitle>

                    <div
                      aria-label={
                        project.categories.length > 0
                          ? "Project categories"
                          : undefined
                      }
                      aria-hidden={project.categories.length === 0}
                      className="mt-3 flex min-h-14 content-start flex-wrap gap-2"
                    >
                      {project.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-(--color-border) px-2.5 py-1 text-xs text-(--text-medium-emphasis)"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <CardFooter className="mt-auto">
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
            </motion.div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <div className="mx-auto mt-5 flex w-full items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous featured project"
            onClick={showPreviousSlide}
            className="
              inline-flex
              size-12
              items-center
              justify-center
              rounded-full
              border
              border-(--color-border)
              bg-(--color-surface)
              text-(--text-high-emphasis)
              shadow-sm
              transition-[transform,background-color,border-color,box-shadow]
              duration-300
              ease-out
              hover:-translate-y-0.5
              hover:border-[rgba(var(--color-primary-rgb),0.4)]
              hover:bg-[rgba(var(--color-primary-rgb),0.08)]
              hover:shadow-md
              active:translate-y-0
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:translate-y-0
              disabled:hover:shadow-sm
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <ChevronLeft
              aria-hidden="true"
              size={20}
            />
          </button>

          <button
            type="button"
            aria-label="Next featured project"
            onClick={showNextSlide}
            className="
              inline-flex
              size-12
              items-center
              justify-center
              rounded-full
              border
              border-(--color-border)
              bg-(--color-surface)
              text-(--text-high-emphasis)
              shadow-sm
              transition-[transform,background-color,border-color,box-shadow]
              duration-300
              ease-out
              hover:-translate-y-0.5
              hover:border-[rgba(var(--color-primary-rgb),0.4)]
              hover:bg-[rgba(var(--color-primary-rgb),0.08)]
              hover:shadow-md
              active:translate-y-0
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:translate-y-0
              disabled:hover:shadow-sm
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <ChevronRight
              aria-hidden="true"
              size={20}
            />
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Featured project {activeIndex + 1} of {slides.length}
      </p>
    </div>
  );
}
