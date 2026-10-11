"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const currentTrack = track;

    function updateCarouselPosition() {
      const firstSlide = currentTrack.children.item(0);
      const slideWidth =
        firstSlide instanceof HTMLElement
          ? firstSlide.getBoundingClientRect().width
          : 0;
      const currentVisibleCount =
        slideWidth > 0
          ? Math.max(
              1,
              Math.floor(currentTrack.clientWidth / slideWidth)
            )
          : 1;
      const maxStartIndex = Math.max(
        0,
        slides.length - currentVisibleCount
      );

      setVisibleCount(currentVisibleCount);

      if (slideWidth > 0) {
        setActiveIndex(
            Math.min(
              Math.round(currentTrack.scrollLeft / slideWidth),
              maxStartIndex
            )
        );
      }
    }

    updateCarouselPosition();

    const observer = new ResizeObserver(updateCarouselPosition);
    observer.observe(currentTrack);
    currentTrack.addEventListener("scroll", updateCarouselPosition, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      currentTrack.removeEventListener(
        "scroll",
        updateCarouselPosition
      );
    };
  }, [slides.length]);

  function goToSlide(index: number) {
    const track = trackRef.current;

    if (
      !track ||
      slides.length === 0
    ) {
      return;
    }

    const firstSlide = track.children.item(0);

    if (!(firstSlide instanceof HTMLElement)) {
      return;
    }

    const slideWidth =
      firstSlide.getBoundingClientRect().width;
    const maxStartIndex = Math.max(
      0,
      slides.length - visibleCount
    );
    const nextIndex = Math.min(Math.max(index, 0), maxStartIndex);

    track.scrollTo({
      left: nextIndex * slideWidth,
      behavior: "smooth",
    });
    setActiveIndex(nextIndex);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="mt-12 w-full"
    >
      <div
        id="featured-project-track"
        ref={trackRef}
        className="
          flex
          w-full
          snap-x
          snap-mandatory
          overflow-hidden
        "
      >
        {slides.map((project, index) => {
          const status =
            PROJECT_STATUS_META[project.status];

          return (
            <div
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${project.title}`}
              className="
                w-full
                shrink-0
                snap-start
                px-[clamp(0.75rem,1.5vw,1.25rem)]
                py-2
              md:w-1/2
              lg:w-1/3
              "
            >
              <Link
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
            </div>
          );
        })}
      </div>

      {slides.length > visibleCount && (
        <div className="mx-auto mt-5 flex w-full items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous featured project"
            disabled={activeIndex === 0}
            onClick={() => goToSlide(activeIndex - 1)}
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
            disabled={activeIndex >= slides.length - visibleCount}
            onClick={() => goToSlide(activeIndex + 1)}
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
    </div>
  );
}
