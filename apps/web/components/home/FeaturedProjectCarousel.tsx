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
  const slides = projects.filter(
    (project) =>
      project.isFeatured === true &&
      typeof project.coverImage === "string" &&
      project.coverImage.trim().length > 0
  ).slice(0, 5);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const currentTrack = track;

    function updateVisibleCount() {
      const firstSlide = currentTrack.children.item(0);

      if (!(firstSlide instanceof HTMLElement)) {
        return;
      }

      const slideWidth =
        firstSlide.getBoundingClientRect().width;

      if (slideWidth > 0) {
        setVisibleCount(
          Math.max(
            1,
            Math.floor(currentTrack.clientWidth / slideWidth)
          )
        );
      }
    }

    updateVisibleCount();

    const observer = new ResizeObserver(updateVisibleCount);
    observer.observe(currentTrack);

    return () => observer.disconnect();
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
    const nextIndex = Math.min(
      Math.max(index, 0),
      maxStartIndex
    );

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
      className="mx-auto mt-12 w-full max-w-5xl"
    >
      <div
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          const firstSlide = track.children.item(0);

          if (
            !(firstSlide instanceof HTMLElement) ||
            firstSlide.getBoundingClientRect().width === 0
          ) {
            return;
          }

          const slideWidth =
            firstSlide.getBoundingClientRect().width;
          const maxStartIndex = Math.max(
            0,
            slides.length - visibleCount
          );
          const index = Math.min(
            Math.round(track.scrollLeft / slideWidth),
            maxStartIndex
          );

          setActiveIndex(
            index
          );
        }}
        className="
          flex
          w-full
          snap-x
          snap-mandatory
          overflow-x-auto
          overscroll-x-contain
          scroll-smooth
          scrollbar-hide
        "
      >
        {slides.map((project, index) => {
          const status =
            PROJECT_STATUS_META[project.status];
          const coverImage = project.coverImage;

          if (!coverImage) {
            return null;
          }

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
                px-1
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
                  <CardImage
                    src={coverImage}
                    alt={project.title}
                    width={1200}
                    height={675}
                    sizes="(max-width: 768px) 100vw, 80vw"
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
            </div>
          );
        })}
      </div>

      {slides.length > visibleCount && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous featured project"
            disabled={activeIndex === 0}
            onClick={() => goToSlide(activeIndex - 1)}
            className="
              rounded-full
              border
              border-(--color-border)
              p-3
              text-(--text-high-emphasis)
              transition
              hover:bg-(--color-surface)
              disabled:cursor-not-allowed
              disabled:opacity-40
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
            "
          >
            <ChevronLeft
              aria-hidden="true"
              size={20}
            />
          </button>

          <p
            aria-live="polite"
            className="min-w-16 text-center text-sm text-(--text-medium-emphasis)"
          >
            {activeIndex + 1}–
            {Math.min(slides.length, activeIndex + visibleCount)} /{" "}
            {slides.length}
          </p>

          <button
            type="button"
            aria-label="Next featured project"
            disabled={
              activeIndex >= slides.length - visibleCount
            }
            onClick={() => goToSlide(activeIndex + 1)}
            className="
              rounded-full
              border
              border-(--color-border)
              p-3
              text-(--text-high-emphasis)
              transition
              hover:bg-(--color-surface)
              disabled:cursor-not-allowed
              disabled:opacity-40
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
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
