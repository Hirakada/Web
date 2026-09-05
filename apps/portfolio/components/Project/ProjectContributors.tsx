"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
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
  const [mobileIndex, setMobileIndex] =
    useState(0);
  const touchStartX = useRef<number | null>(null);
  const pointerStartX = useRef<number | null>(null);

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

  const goToNext = useCallback((manual = false) => {
    if (
      !hasCarousel ||
      isAnimating ||
      (isPaused && !manual)
    ) {
      return;
    }

    setIsAnimating(true);
    setDirection(1);
    setMobileIndex((current) =>
      (current + 1) % total,
    );
  }, [hasCarousel, isAnimating, isPaused, total]);

  const goToPrevious = useCallback((manual = false) => {
    if (
      !hasCarousel ||
      isAnimating ||
      (isPaused && !manual)
    ) {
      return;
    }

    setDirection(-1);
    setIsAnimating(true);
    setMobileIndex((current) =>
      (current - 1 + total) % total,
    );
  }, [hasCarousel, isAnimating, isPaused, total]);

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

  const mobileContributor =
    contributors[mobileIndex] ?? contributors[0];

  if (!mobileContributor) {
    return null;
  }

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
        onPointerDown={(event) => {
          if (
            event.pointerType !== "mouse" ||
            !hasCarousel ||
            isAnimating
          ) {
            return;
          }

          pointerStartX.current = event.clientX;
          event.currentTarget.setPointerCapture(
            event.pointerId,
          );
        }}
        onPointerUp={(event) => {
          const startX = pointerStartX.current;
          pointerStartX.current = null;

          if (startX === null) {
            return;
          }

          const deltaX = event.clientX - startX;

          if (Math.abs(deltaX) < 40) {
            return;
          }

          if (deltaX < 0) {
            goToNext(true);
          } else {
            goToPrevious(true);
          }
        }}
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
        onTouchStart={(event) => {
          if (!hasCarousel || isAnimating) {
            return;
          }

          touchStartX.current =
            event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          touchStartX.current = null;

          if (!hasCarousel || isAnimating || startX === null) {
            return;
          }

          const endX = event.changedTouches[0]?.clientX;

          if (endX === undefined) {
            return;
          }

          const deltaX = endX - startX;

          if (Math.abs(deltaX) < 40) {
            return;
          }

          if (deltaX < 0) {
            goToNext(true);
          } else {
            goToPrevious(true);
          }
        }}
        onWheel={(event) => {
          if (!hasCarousel || isAnimating) {
            return;
          }

          if (
            Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
            Math.abs(event.deltaX) < 8
          ) {
            return;
          }

          if (event.deltaX > 0) {
            goToNext(true);
          } else {
            goToPrevious(true);
          }
        }}
        className="
          relative
          w-full
          overflow-visible
          px-4
          cursor-grab
          select-none
          touch-pan-y
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

          <div className="absolute inset-0 sm:hidden">
            <AnimatePresence
              initial={false}
              mode="sync"
            >
              <motion.div
                key={mobileContributor.id}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  x: direction * 120,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  x: direction * -120,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 px-2"
              >
                <ContributorCard
                  contributor={mobileContributor}
                  onHoverStart={() => setIsPaused(true)}
                  onHoverEnd={() => setIsPaused(false)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

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
                className={`absolute inset-y-0 hidden w-full px-2 will-change-[left,transform,opacity] sm:block sm:w-1/2 lg:w-1/4 lg:px-2 ${getSlotClasses(slot)} ${isVisibleOnTablet ? "" : "sm:max-lg:hidden"}`}
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
              className={`absolute inset-y-0 hidden w-full px-2 will-change-transform sm:block sm:w-1/2 lg:w-1/4 lg:px-2 ${getSlotClasses(direction === 1 ? MAX_VISIBLE - 1 : 0)}`}
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
            onClick={() => goToPrevious(true)}
            className="flex size-10 items-center justify-center rounded-full border border-[rgba(var(--color-secondary-rgb),0.12)] bg-(--color-surface) text-(--text-high-emphasis) shadow-md transition hover:border-[rgba(var(--color-primary-rgb),0.3)] hover:text-(--color-primary) disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Show next contributors"
            disabled={isAnimating}
            onClick={() => goToNext(true)}
            className="flex size-10 items-center justify-center rounded-full border border-[rgba(var(--color-secondary-rgb),0.12)] bg-(--color-surface) text-(--text-high-emphasis) shadow-md transition hover:border-[rgba(var(--color-primary-rgb),0.3)] hover:text-(--color-primary) disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}

    </section>
  );
}