"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { Contributor } from "@hirakada/database";

import ContributorCard from "./ContributorCard";

export interface ProjectContributorsProps {
  contributors: Contributor[];
}

const AUTO_PLAY_INTERVAL = 4000;
const TRANSITION_DURATION = 700;
const MAX_VISIBLE = 4;

const slotClasses = [
  "left-0",
  "left-0 sm:left-1/2 lg:left-1/4",
  "left-0 sm:left-1/2 lg:left-1/2",
  "left-0 sm:left-1/2 lg:left-3/4",
];

function getSlotClasses(slot: number) {
  if (slot === 0) {
    return "left-0";
  }

  return slotClasses[slot] ?? "left-0";
}

export default function ProjectContributors({
  contributors,
}: ProjectContributorsProps) {
  const [startIndex, setStartIndex] =
    useState(0);

  const [isAnimating, setIsAnimating] =
    useState(false);

  const [isPaused, setIsPaused] =
    useState(false);
  const [direction, setDirection] =
    useState<1 | -1>(1);

  const total = contributors.length;

  const hasCarousel =
    total > MAX_VISIBLE;

  /*
   * Get contributor using circular indexing.
   */
  const getContributor = useCallback(
    (offset: number): Contributor | undefined => {
      if (total === 0) {
        return undefined;
      }

      return contributors[
        (startIndex + offset + total) % total
      ];
    },
    [contributors, startIndex, total],
  );

  const goToNext = useCallback(() => {
    if (!hasCarousel || isAnimating || isPaused) {
      return;
    }

    setIsAnimating(true);
    setDirection(1);
  }, [hasCarousel, isAnimating, isPaused]);

  const goToPrevious = useCallback(() => {
    if (!hasCarousel || isAnimating || isPaused) {
      return;
    }

    setDirection(-1);
    setIsAnimating(true);
  }, [hasCarousel, isAnimating, isPaused]);

  useEffect(() => {
    if (!isAnimating) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setStartIndex((current) =>
        (current + direction + total) % total,
      );
      setIsAnimating(false);
    }, TRANSITION_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [direction, isAnimating, total]);

  useEffect(() => {
    if (!hasCarousel || isPaused || isAnimating) {
      return undefined;
    }

    const interval = window.setInterval(goToNext, AUTO_PLAY_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [goToNext, hasCarousel, isAnimating, isPaused]);

  /*
   * Empty state.
   */
  if (total === 0) {
    return null;
  }

  /*
   * Only four cards are visible.
   */
  const visibleCards: Contributor[] = [];

  for (
    let index = 0;
    index < Math.min(MAX_VISIBLE, total);
    index += 1
  ) {
    const contributor = getContributor(index);

    if (contributor) {
      visibleCards.push(contributor);
    }
  }

  const enteringCard =
    hasCarousel
      ? getContributor(
          direction === 1 ? MAX_VISIBLE : -1,
        )
      : undefined;

  return (
    <section
      className="
        flex
        w-full
        flex-col
        items-center
        space-y-10
      "
    >
      {/* =========================
          HEADER
      ========================== */}

      <div
        className="
          flex
          w-full
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
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
          Contributors
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
            mt-3
            max-w-3xl
            text-base
            leading-7
            text-(--text-medium-emphasis)
          "
        >
          Meet the talented people behind
          this project—from planning and
          design to development and
          delivery.
        </p>
      </div>

      {/* =========================
          CAROUSEL
      ========================== */}

      <div
        onWheel={(event) => {
          if (!hasCarousel || isAnimating) {
            return;
          }

          const wheelDelta =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
              ? event.deltaX
              : event.deltaY;

          if (Math.abs(wheelDelta) < 8) {
            return;
          }

          event.preventDefault();

          if (wheelDelta > 0) {
            goToNext();
          } else {
            goToPrevious();
          }
        }}
        className="
          relative
          w-full
          overflow-visible
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            relative
            mx-auto
            h-100
            w-full
            max-w-7xl
            overflow-visible
            sm:h-108
          "
        >
          {/* =====================
              VISIBLE CARDS
          ====================== */}

          {visibleCards.map((contributor, index) => {
            const slot = isAnimating
              ? direction === 1
                ? Math.max(index - 1, 0)
                : Math.min(index + 1, MAX_VISIBLE - 1)
              : index;
            const isLeaving =
              isAnimating &&
              (direction === 1
                ? index === 0
                : index === visibleCards.length - 1);
            const isVisibleOnMobile = index === 0 || isAnimating;
            const isVisibleOnTablet = index < 2 || isAnimating;
            const cardOpacity = index === 0 ? 1 : 0.82 + (MAX_VISIBLE - index) * 0.06;

            return (
              <motion.div
                key={contributor.id}
                layout="position"
                initial={false}
                animate={{
                  opacity: isLeaving ? 0 : cardOpacity,
                  scale: isLeaving ? 0.94 : 1,
                  x: isLeaving ? direction * -120 : 0,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute inset-y-0 w-full px-2 will-change-[left,transform,opacity] sm:w-1/2 lg:w-1/4 lg:px-2 ${getSlotClasses(slot)} ${isVisibleOnMobile ? "" : "max-sm:hidden"} ${isVisibleOnTablet ? "" : "sm:max-lg:hidden"}`}
                style={{
                  zIndex: isLeaving ? 1 : MAX_VISIBLE - index,
                }}
              >
                <ContributorCard
                  contributor={contributor}
                  onHoverStart={() => setIsPaused(true)}
                  onHoverEnd={() => setIsPaused(false)}
                />
              </motion.div>
            );
          })}

          {isAnimating && enteringCard && (
            <motion.div
              key={`entering-${enteringCard.id}`}
              initial={{
                opacity: 0,
                scale: 0.92,
                x: direction * 120,
              }}
              animate={{ opacity: 0.82, scale: 1, x: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute inset-y-0 w-full px-2 will-change-transform sm:w-1/2 lg:w-1/4 lg:px-2 ${getSlotClasses(direction === 1 ? MAX_VISIBLE - 1 : 0)}`}
              style={{ zIndex: MAX_VISIBLE + 1 }}
            >
              <ContributorCard
                contributor={enteringCard}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
              />
            </motion.div>
          )}

        </div>
      </div>

      {hasCarousel && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Show previous contributors"
            disabled={isAnimating}
            onClick={goToPrevious}
            className="flex size-10 items-center justify-center rounded-full border border-[rgba(var(--color-secondary-rgb),0.12)] bg-(--color-surface) text-(--text-high-emphasis) shadow-md transition hover:border-[rgba(var(--color-primary-rgb),0.3)] hover:text-(--color-primary) disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Show next contributors"
            disabled={isAnimating}
            onClick={goToNext}
            className="flex size-10 items-center justify-center rounded-full border border-[rgba(var(--color-secondary-rgb),0.12)] bg-(--color-surface) text-(--text-high-emphasis) shadow-md transition hover:border-[rgba(var(--color-primary-rgb),0.3)] hover:text-(--color-primary) disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}

    </section>
  );
}