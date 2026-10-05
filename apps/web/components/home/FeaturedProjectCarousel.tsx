"use client";

import { useRef, useState } from "react";
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
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function goToSlide(index: number) {
    const track = trackRef.current;
    const slide = track?.children.item(index);

    if (!track || !(slide instanceof HTMLElement)) {
      return;
    }

    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
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
          const index = Math.round(
            track.scrollLeft / track.clientWidth
          );
          setActiveIndex(
            Math.min(index, slides.length - 1)
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
              className="w-full shrink-0 snap-start px-1 py-2"
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

      {slides.length > 1 && (
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
            {activeIndex + 1} / {slides.length}
          </p>

          <button
            type="button"
            aria-label="Next featured project"
            disabled={activeIndex >= slides.length - 1}
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
