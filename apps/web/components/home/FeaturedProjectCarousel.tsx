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
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    pointerX: number;
    scrollLeft: number;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [scrollbarMetrics, setScrollbarMetrics] = useState({
    thumbWidth: 100,
    thumbLeft: 0,
  });

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const currentTrack = track;

    function updateCarouselPosition() {
      const maxScrollLeft =
        currentTrack.scrollWidth - currentTrack.clientWidth;
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
      const thumbWidth =
        currentTrack.scrollWidth > 0
          ? (currentTrack.clientWidth / currentTrack.scrollWidth) * 100
          : 100;

      setScrollbarMetrics({
        thumbWidth,
        thumbLeft:
          maxScrollLeft > 0
            ? (currentTrack.scrollLeft / maxScrollLeft) *
              (100 - thumbWidth)
            : 0,
      });

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

  function handleScrollbarPointerDown(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const track = trackRef.current;
    const scrollbar = scrollbarRef.current;

    if (!track || !scrollbar) {
      return;
    }

    scrollbar.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerX: event.clientX,
      scrollLeft: track.scrollLeft,
    };

    if (event.target === scrollbar) {
      const bounds = scrollbar.getBoundingClientRect();
      const clickRatio = Math.min(
        Math.max((event.clientX - bounds.left) / bounds.width, 0),
        1
      );
      track.scrollTo({
        left:
          clickRatio *
          (track.scrollWidth - track.clientWidth),
        behavior: "smooth",
      });
      dragStartRef.current = null;
    }
  }

  function handleScrollbarPointerMove(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const track = trackRef.current;
    const scrollbar = scrollbarRef.current;
    const dragStart = dragStartRef.current;

    if (!track || !scrollbar || !dragStart) {
      return;
    }

    const scrollbarWidth = scrollbar.clientWidth;
    const thumbWidth =
      (scrollbarMetrics.thumbWidth / 100) * scrollbarWidth;
    const thumbTravel = scrollbarWidth - thumbWidth;

    if (thumbTravel <= 0) {
      return;
    }

    const scrollTravel = track.scrollWidth - track.clientWidth;
    track.scrollLeft =
      dragStart.scrollLeft +
      ((event.clientX - dragStart.pointerX) / thumbTravel) *
        scrollTravel;
  }

  function handleScrollbarKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(activeIndex + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goToSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goToSlide(slides.length - visibleCount);
    }
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
          overflow-x-auto
          overscroll-x-contain
          scrollbar-hide
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
        style={{ scrollbarWidth: "none" }}
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
                  <CardImage
                    src={coverImage}
                    alt={project.title}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <div className="mx-auto mt-5 flex w-full max-w-xl items-center justify-center gap-4">
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
            className="min-w-12 text-center text-sm text-(--text-medium-emphasis)"
          >
            {activeIndex + 1}/{slides.length}
          </p>

          <button
            type="button"
            aria-label="Next featured project"
            disabled={activeIndex >= slides.length - visibleCount}
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

      {slides.length > visibleCount && (
        <div
          ref={scrollbarRef}
          role="scrollbar"
          aria-label="Featured project position"
          aria-controls="featured-project-track"
          aria-orientation="horizontal"
          aria-valuemin={1}
          aria-valuemax={slides.length}
          aria-valuenow={activeIndex + 1}
          tabIndex={0}
          onKeyDown={handleScrollbarKeyDown}
          onPointerDown={handleScrollbarPointerDown}
          onPointerMove={handleScrollbarPointerMove}
          onPointerUp={(event) => {
            dragStartRef.current = null;
            if (scrollbarRef.current?.hasPointerCapture(event.pointerId)) {
              scrollbarRef.current.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={() => {
            dragStartRef.current = null;
          }}
          className="
            mx-auto
            mt-4
            h-2
            w-full
            max-w-xl
            cursor-pointer
            touch-none
            rounded-full
            bg-[rgba(var(--color-secondary-rgb),0.12)]
            outline-none
            focus-visible:ring-2
            focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
          "
        >
          <div
            aria-hidden="true"
            className="
              h-full
              rounded-full
              bg-[rgba(var(--color-primary-rgb),0.7)]
              transition-[margin-left]
              duration-150
            "
            style={{
              width: `${scrollbarMetrics.thumbWidth}%`,
              marginLeft: `${scrollbarMetrics.thumbLeft}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
