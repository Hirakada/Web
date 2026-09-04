"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  BriefcaseBusiness,
  MapPin,
  ArrowUpRight,
  Rocket,
  X,
} from "lucide-react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import {
  Card,
  CardTitle,
} from "@hirakada/ui";

interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_path: string | null;
  website: string | null;
  address: string | null;
  city: string;
  state_province: string | null;
  postal_code: string | null;
  country: string;
}

interface ExperienceItem {
  id: string;
  experience_type: "work" | "entrepreneur";
  title: string;
  role: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  url: string | null;
  sort_order: number;
  organizations: Organization | null;
  attributes: {
    id: string;
    name: string;
    type: string | null;
    icon_url: string | null;
    description: string | null;
  }[];
  images: {
    id: string;
    image_path: string;
    alt: string | null;
    type: string | null;
    sort_order: number;
  }[];
  links: {
    id: string;
    label: string;
    url: string;
    sort_order: number;
  }[];
}

export interface ExperienceProps {
  experiences: ExperienceItem[];
  id?: string;
}

/* =========================================================
   DATE
   ========================================================= */

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatPeriod(
  start: string,
  end: string | null,
) {
  return `${formatDate(start)} — ${
    end ? formatDate(end) : "Present"
  }`;
}

function getTimelineGap(
  current: ExperienceItem,
  previous: ExperienceItem | undefined,
) {
  if (!previous) {
    return 0;
  }

  const currentDate = new Date(
    `${current.start_date}T00:00:00`,
  ).getTime();
  const previousDate = new Date(
    `${previous.start_date}T00:00:00`,
  ).getTime();
  const daysApart = Math.abs(
    currentDate - previousDate,
  ) / (1000 * 60 * 60 * 24);
  const dateSeed =
    (currentDate / (1000 * 60 * 60 * 24)) % 5;

  return Math.min(
    96,
    Math.max(28, 28 + daysApart * 4 + dateSeed * 2),
  );
}

function getTimelineSides(
  experiences: ExperienceItem[],
) {
  const sideLoads = [0, 0];
  const sides: Array<"left" | "right"> = [];

  experiences.forEach((item, index) => {
    if (index === experiences.length - 1) {
      return;
    }

    const previous = experiences[index - 1];
    const endDatesAreClose =
      previous?.end_date && item.end_date
        ? Math.abs(
            new Date(
              `${previous.end_date}T00:00:00`,
            ).getTime() -
              new Date(
                `${item.end_date}T00:00:00`,
              ).getTime(),
          ) <=
          1000 * 60 * 60 * 24 * 90
        : false;

    const previousSide = sides[index - 1];
    const sideIndex = endDatesAreClose && previousSide
      ? previousSide === "left"
        ? 1
        : 0
      : sideLoads[0]! <= sideLoads[1]!
        ? 0
        : 1;

    sides[index] =
      sideIndex === 0 ? "left" : "right";
    sideLoads[sideIndex] =
      sideLoads[sideIndex]! +
      140 + Math.min(220, (item.description?.length ?? 0) * 1.2);
  });

  return sides;
}

/* =========================================================
   DATE BLOCK
   ========================================================= */

function TimelineDate({
  item,
  align,
  className,
}: {
  item: ExperienceItem;
  align: "left" | "right" | "center";
  className?: string;
}) {
  const isCurrent = item.end_date === null;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 12,
        scale: shouldReduceMotion ? 1 : 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.45,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        w-full
        flex
        flex-col
        ${className ?? ""}
        ${
          align === "right"
            ? "items-end text-right"
            : align === "center"
              ? "items-center text-center"
              : "items-start text-left"
        }
      `}
    >
      <div
        className="
          inline-flex
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-background
          shadow-sm
          transition-all
          duration-300
          group-hover:border-blue-500/40
          group-hover:shadow-md
        "
      >
        <div
          className="
            px-3
            py-2
            text-xs
            font-semibold
            text-foreground
          "
        >
          {formatPeriod(
            item.start_date,
            item.end_date,
          )}
        </div>
      </div>

      {isCurrent && (
        <span
          className="
            mt-1
            inline-flex
            items-center
            gap-1.5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-blue-600
            dark:text-blue-400
          "
        >
          <span className="size-1.5 rounded-full bg-current" />
          Current
        </span>
      )}
    </motion.div>
  );
}

/* =========================================================
   CARD
   ========================================================= */

function ExperienceCard({
  item,
  onOpen,
}: {
  item: ExperienceItem;
  onOpen: (item: ExperienceItem) => void;
}) {
  const isEntrepreneur =
    item.experience_type === "entrepreneur";
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 24,
        scale: shouldReduceMotion ? 1 : 0.94,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.title}`}
      onClick={() => onOpen(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(item);
        }
      }}
    >
      <Card
        className="
          cursor-pointer
          h-fit
          w-full
          max-w-126
          min-w-0
          overflow-visible
          p-4
          transition-all
          duration-300
          group-hover:-translate-y-1
        "
      >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-medium
            uppercase
            tracking-[0.16em]
            text-blue-600
            dark:text-blue-400
          "
        >
          {isEntrepreneur ? (
            <Rocket className="size-4 text-amber-500 dark:text-amber-400" />
          ) : (
            <BriefcaseBusiness className="size-4" />
          )}

          <span
            className={
              isEntrepreneur
                ? "text-amber-600 dark:text-amber-400"
                : undefined
            }
          >
            {isEntrepreneur ? "Entrepreneur" : "Work"}
          </span>
        </div>

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${item.title}`}
            onClick={(event) => event.stopPropagation()}
            className="
              group/link
              flex
              size-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-border
              text-muted
              transition-all
              duration-200
              hover:bg-foreground
              hover:text-background
            "
          >
            <ArrowUpRight
              className="
                size-3.5
                transition-transform
                duration-200
                group-hover/link:-translate-y-0.5
                group-hover/link:translate-x-0.5
              "
            />
          </a>
        )}
      </div>

      <CardTitle
        className="
          mt-3
          text-2xl
          font-semibold
          tracking-tight
          sm:text-3xl
        "
      >
        {item.title}
      </CardTitle>

      {item.role && (
        <p
          className="
            mt-1
            text-sm
            font-medium
            text-foreground/80
          "
        >
          {item.role}
        </p>
      )}

      {item.organizations && (
        <div
          className="
            mt-3
            flex
            min-w-0
            flex-wrap
            items-center
            gap-x-2
            gap-y-1
            text-sm
            text-muted
          "
        >
          <span
            className="
              font-medium
              text-foreground/80
            "
          >
            {item.organizations.name}
          </span>

          <span aria-hidden="true">·</span>

          <span
            className="
              inline-flex
              items-center
              gap-1
            "
          >
            <MapPin className="size-3.5 shrink-0" />

            {item.organizations.city},{" "}
            {item.organizations.country}
          </span>
        </div>
      )}

      {item.location &&
        !item.organizations && (
          <p
            className="
              mt-3
              flex
              items-center
              gap-1.5
              text-sm
              text-muted
            "
          >
            <MapPin className="size-3.5" />

            {item.location}
          </p>
        )}

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="
            group/link
            mt-5
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            underline-offset-4
            hover:underline
          "
        >
          View experience

          <ArrowUpRight
            className="
              size-4
              transition-transform
              group-hover/link:-translate-y-0.5
              group-hover/link:translate-x-0.5
            "
          />
        </a>
      )}
      </Card>
    </motion.div>
  );
}

/* =========================================================
   DOT
   ========================================================= */

function TimelineDot({
  item,
  shouldReduceMotion,
}: {
  item: ExperienceItem;
  shouldReduceMotion: boolean;
}) {
  const isCurrent = item.end_date === null;

  return (
    <div
      className="
        relative
        flex
        size-5
        shrink-0
        items-center
        justify-center
      "
    >
      {isCurrent && (
        <motion.span
          aria-hidden="true"
          initial={{
            scale: 1,
            opacity: 0,
          }}
          animate={
            shouldReduceMotion
              ? {
                  scale: 1,
                  opacity: 0,
                }
              : {
                  scale: [1, 1.6, 1],
                  opacity: [0.25, 0, 0.25],
                }
          }
          transition={
            shouldReduceMotion
              ? {
                  duration: 0,
                }
              : {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }
          }
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            size-8
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-blue-500/20
          "
        />
      )}

      <motion.span
        aria-hidden="true"
        data-timeline-center="true"
        style={{ isolation: "isolate" }}
        initial={{
          scale: shouldReduceMotion ? 1 : 0.4,
        }}
        whileInView={{
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        whileHover={
          shouldReduceMotion
            ? { scale: 1 }
            : { scale: 1.3 }
        }
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 24,
        }}
        className={`
          relative
          z-30
          flex
          size-5
          items-center
          justify-center
          rounded-full
          ${
            isCurrent
              ? "bg-blue-600 dark:bg-blue-400"
              : "bg-foreground"
          }
        `}
      />
    </div>
  );
}

/* =========================================================
   EXPERIENCE
   ========================================================= */

export function Experience({
  experiences,
  id,
}: ExperienceProps) {
  const timelineSides = getTimelineSides(experiences);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const timelineRef =
    useRef<HTMLDivElement>(null);

  const shouldReduceMotion =
    useReducedMotion();
  const lineProgress = useMotionValue(0);

  const [lineTop, setLineTop] = useState(0);
  const [lineHeight, setLineHeight] =
    useState(0);
  const [lineLeft, setLineLeft] = useState(0);

  useEffect(() => {
    if (!selectedExperience) {
      return;
    }

    const scrollY = window.scrollY;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedExperience(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.documentElement.style.overflow =
        previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedExperience]);

  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const smoothProgress = useSpring(lineProgress, {
      stiffness: 100,
      damping: 30,
      mass: 0.2,
    });

  useLayoutEffect(() => {
    const update = () => {
      const timeline =
        timelineRef.current;

      if (!timeline) {
        return;
      }

      const centers = Array.from(
        timeline.querySelectorAll<HTMLElement>(
          '[data-timeline-center="true"]',
        ),
      ).filter(
        (element) =>
          element.offsetParent !== null,
      );

      if (centers.length === 0) {
        setLineTop(0);
        setLineHeight(0);
        setLineLeft(0);
        lineProgress.set(0);
        return;
      }

      const firstCenter = centers[0]!;
      const lastCenter =
        centers[centers.length - 1]!;

      const timelineRect =
        timeline.getBoundingClientRect();

      const firstRect =
        firstCenter.getBoundingClientRect();

      const lastRect =
        lastCenter.getBoundingClientRect();

      const start =
        firstRect.top +
        firstRect.height / 2 -
        timelineRect.top;

      const centerX =
        firstRect.left +
        firstRect.width / 2 -
        timelineRect.left;

      const end =
        lastRect.top +
        lastRect.height / 2 -
        timelineRect.top;

      const firstCenterTop =
        firstRect.top + firstRect.height / 2;
      const lastCenterTop =
        lastRect.top + lastRect.height / 2;
      const activationRange =
        window.innerHeight * 0.3;
      const progressRange =
        lastCenterTop -
        firstCenterTop +
        activationRange;
      const progress =
        progressRange > 0
          ? (window.innerHeight * 0.8 - firstCenterTop) /
            progressRange
          : 0;

      setLineTop(start);
      setLineLeft(centerX);
      lineProgress.set(
        Math.min(1, Math.max(0, progress)),
      );

      setLineHeight(
        Math.max(0, end - start),
      );
    };

    update();

    const observer =
      new ResizeObserver(update);

    if (timelineRef.current) {
      observer.observe(
        timelineRef.current,
      );
    }

    window.addEventListener(
      "resize",
      update,
    );

    window.addEventListener(
      "scroll",
      update,
      { passive: true },
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        update,
      );

      window.removeEventListener(
        "scroll",
        update,
      );
    };
  }, [experiences.length, lineProgress]);

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className="
        scroll-mt-24
        w-full
        px-(--global-padding-x)
        py-section
      "
    >
      <div
        ref={timelineRef}
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ===================================================
            DESKTOP VERTICAL LINE
            =================================================== */}

        {lineHeight > 0 && (
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              z-0
              hidden
              w-px
              -translate-x-1/2
              md:block
            "
            style={{
              left: lineLeft,
              top: lineTop,
              height: lineHeight,
            }}
          >
            {/* Base line */}

            <div
              className="
                absolute
                inset-0
                bg-white/20
              "
            />

            {/* Active line */}

            <motion.div
              className="
                absolute
                inset-x-0
                top-0
                h-full
                origin-top
                bg-white
              "
              style={{
                scaleY:
                  shouldReduceMotion
                    ? 1
                    : smoothProgress,
              }}
            />
          </div>
        )}

        {/* ===================================================
            MOBILE VERTICAL LINE
            =================================================== */}

        {lineHeight > 0 && (
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              z-0
              w-px
                -translate-x-1/2
              md:hidden
            "
            style={{
              left: lineLeft,
              top: lineTop,
              height: lineHeight,
            }}
          >
            {/* Base line */}

            <div
              className="
                absolute
                inset-0
                bg-white/20
              "
            />

            {/* Active line */}

            <motion.div
              className="
                absolute
                inset-x-0
                top-0
                h-full
                origin-top
                bg-white
              "
              style={{
                scaleY:
                  shouldReduceMotion
                    ? 1
                    : smoothProgress,
              }}
            />
          </div>
        )}

        {/* ===================================================
            EXPERIENCE ITEMS
            =================================================== */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
          "
        >
          {experiences.map(
            (item, index) => {
              const timelineGap = getTimelineGap(
                item,
                experiences[index - 1],
              );
              const isLast =
                index ===
                experiences.length - 1;

              const isLeft =
                timelineSides[index] === "left";

              /* =================================================
                 LAST ITEM
                 ================================================= */

              if (isLast) {
                return (
                  <motion.article
                    key={item.id}
                    initial={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      group
                      relative
                    "
                    style={{
                      marginTop: timelineGap,
                    }}
                  >
                    {/* ===============================
                        DESKTOP
                        =============================== */}

                    <div
                      className="
                        hidden
                        w-full
                        flex-col
                        items-center
                        md:flex
                      "
                    >
                      {/* Final bullet */}

                      <TimelineDot
                        item={item}
                        shouldReduceMotion={
                          Boolean(
                            shouldReduceMotion,
                          )
                        }
                      />

                      {/* Date */}

                      <div className="mt-5 flex w-full max-w-126 justify-center">
                        <TimelineDate
                          item={item}
                          align="center"
                        />
                      </div>

                      {/* Card */}

                      <div
                        className="
                          mt-5
                          w-full
                          max-w-126
                        "
                      >
                        <motion.div
                          whileHover={
                            shouldReduceMotion
                              ? { y: 0 }
                              : { y: -4 }
                          }
                          transition={{
                            duration: 0.25,
                            ease: "easeOut",
                          }}
                        >
                          <ExperienceCard
                            item={item}
                            onOpen={setSelectedExperience}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* ===============================
                        MOBILE
                        =============================== */}

                    <div
                      className="
                        relative
                        pl-10
                        md:hidden
                      "
                    >
                      <div
                        className="
                          absolute
                          left-4
                          top-0
                          z-20
                          -translate-x-1/2
                        "
                      >
                        <TimelineDot
                          item={item}
                          shouldReduceMotion={
                            Boolean(
                              shouldReduceMotion,
                            )
                          }
                        />
                      </div>

                      <TimelineDate
                        item={item}
                        align="left"
                      />

                      <div className="mt-6">
                        <motion.div
                          whileHover={
                            shouldReduceMotion
                              ? { y: 0 }
                              : { y: -4 }
                          }
                          transition={{
                            duration: 0.25,
                            ease: "easeOut",
                          }}
                        >
                          <ExperienceCard
                            item={item}
                            onOpen={setSelectedExperience}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              /* =================================================
                 NORMAL ITEM
                 ================================================= */

              return (
                <motion.article
                  key={item.id}
                  initial={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      shouldReduceMotion
                        ? 0
                        : index * 0.05,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    group
                    relative
                  "
                    style={{
                      marginTop: timelineGap,
                    }}
                >
                  {/* ===============================
                      DESKTOP
                      =============================== */}

                  <div
                    className="
                      hidden
                      grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]
                      items-start
                      md:grid
                    "
                  >
                    {/* LEFT */}

                    <div
                      className={`
                        flex
                        min-w-0
                        flex-col
                        items-end
                        ${
                          isLeft
                            ? "pr-10"
                            : "pointer-events-none invisible"
                        }
                      `}
                    >
                      {isLeft && (
                        <>
                          <TimelineDate
                            className="relative -top-1.5"
                            item={item}
                            align="right"
                          />

                          <div className="mt-5 flex w-full max-w-126 justify-end">
                            <motion.div
                              whileHover={
                                shouldReduceMotion
                                  ? { y: 0 }
                                  : { y: -4 }
                              }
                              transition={{
                                duration: 0.25,
                                ease: "easeOut",
                              }}
                            >
                              <ExperienceCard
                                item={item}
                                onOpen={setSelectedExperience}
                              />
                            </motion.div>
                          </div>
                        </>

                      )}
                    </div>

                    {/* CENTER */}

                    <div
                      className="
                        relative
                        flex
                        min-h-5
                        justify-center
                      "
                    >
                      {/* Horizontal connector */}

                      <motion.span
                        aria-hidden="true"
                        initial={{
                          scaleX:
                            shouldReduceMotion
                              ? 1
                              : 0,
                        }}
                        whileInView={{
                          scaleX: 1,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.3,
                        }}
                        transition={{
                          duration: 0.8,
                          delay:
                            shouldReduceMotion
                              ? 0
                              : index * 0.05,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className={`
                          pointer-events-none
                          absolute
                          top-2.5
                          z-0
                          h-px
                          bg-white
                          ${
                            isLeft
                              ? "left-0 right-1/2 origin-right"
                              : "left-1/2 right-0 origin-left"
                          }
                        `}
                      />

                      <TimelineDot
                        item={item}
                        shouldReduceMotion={
                          Boolean(
                            shouldReduceMotion,
                          )
                        }
                      />
                    </div>

                    {/* RIGHT */}

                    <div
                      className={`
                        flex
                        min-w-0
                        flex-col
                        items-start
                        ${
                          !isLeft
                            ? "pl-10"
                            : "pointer-events-none invisible"
                        }
                      `}
                    >
                      {!isLeft && (
                        <>
                          <TimelineDate
                            className="relative -top-1.5"
                            item={item}
                            align="left"
                          />

                          <div className="mt-5 flex w-full max-w-126 justify-start">
                            <motion.div
                              whileHover={
                                shouldReduceMotion
                                  ? { y: 0 }
                                  : { y: -4 }
                              }
                              transition={{
                                duration: 0.25,
                                ease: "easeOut",
                              }}
                            >
                              <ExperienceCard
                                item={item}
                                onOpen={setSelectedExperience}
                              />
                            </motion.div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ===============================
                      MOBILE
                      =============================== */}

                  <div
                    className="
                      relative
                      pl-10
                      md:hidden
                    "
                  >
                    <div
                      className="
                        absolute
                        left-4
                        top-0
                        z-20
                        -translate-x-1/2
                      "
                    >
                      <TimelineDot
                        item={item}
                        shouldReduceMotion={
                          Boolean(
                            shouldReduceMotion,
                          )
                        }
                      />
                    </div>

                    <TimelineDate
                      item={item}
                      align="left"
                    />

                    <div className="mt-6">
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? { y: 0 }
                            : { y: -4 }
                        }
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                        }}
                      >
                        <ExperienceCard
                          item={item}
                          onOpen={setSelectedExperience}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              );
            },
          )}
        </div>
      </div>

      {selectedExperience && (
        <div
          className="
            fixed
            inset-0
            z-9999
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedExperience(null);
            }
          }}
        >
          <div
            aria-modal="true"
            aria-labelledby="experience-detail-title"
            className="
              relative
              max-h-[min(720px,calc(100vh-2rem))]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              border
              border-black/10
              bg-(--color-background)
              p-6
              shadow-[0_24px_80px_rgba(0,0,0,0.22)]
              sm:p-8
              dark:border-white/10
            "
            role="dialog"
          >
            <button
              type="button"
              aria-label="Close experience details"
              onClick={() => setSelectedExperience(null)}
              className="
                absolute
                right-4
                top-4
                flex
                size-9
                items-center
                justify-center
                rounded-full
                border
                border-black/10
                text-muted
                transition-colors
                hover:bg-foreground
                hover:text-background
                dark:border-white/10
              "
            >
              <X className="size-4" />
            </button>

            <div className="pr-10">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-blue-600
                  dark:text-blue-400
                "
              >
                {selectedExperience.experience_type ===
                "entrepreneur"
                  ? "Entrepreneur"
                  : "Work"}
              </p>

              <h2
                id="experience-detail-title"
                className="mt-2 text-3xl font-semibold tracking-tight"
              >
                {selectedExperience.title}
              </h2>

              {selectedExperience.role && (
                <p className="mt-2 text-base font-medium text-foreground/80">
                  {selectedExperience.role}
                </p>
              )}
            </div>

            <div
              className="
                mt-6
                grid
                gap-4
                border-y
                border-black/10
                py-5
                text-sm
                sm:grid-cols-2
                dark:border-white/10
              "
            >
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted">
                  Period
                </p>
                <p className="mt-1 font-medium">
                  {formatPeriod(
                    selectedExperience.start_date,
                    selectedExperience.end_date,
                  )}
                </p>
              </div>

              {(selectedExperience.organizations ||
                selectedExperience.location) && (
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">
                    Location
                  </p>
                  <p className="mt-1 font-medium">
                    {selectedExperience.organizations
                      ? `${selectedExperience.organizations.name} · ${selectedExperience.organizations.city}, ${selectedExperience.organizations.country}`
                      : selectedExperience.location}
                  </p>
                </div>
              )}
            </div>

            {selectedExperience.organizations?.description && (
              <p className="mt-5 text-sm leading-6 text-muted">
                {selectedExperience.organizations.description}
              </p>
            )}

            {selectedExperience.attributes?.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">
                  Attributes
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedExperience.attributes?.map((attribute) => (
                    <span
                      key={attribute.id}
                      title={attribute.description ?? undefined}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium dark:border-white/10"
                    >
                      {attribute.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedExperience.description && (
              <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-foreground/80">
                {selectedExperience.description}
              </p>
            )}

            {selectedExperience.images?.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {selectedExperience.images?.map((image) => (
                  <Image
                    key={image.id}
                    src={image.image_path}
                    alt={image.alt ?? selectedExperience.title}
                    width={1200}
                    height={675}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="aspect-video w-full rounded-xl border border-black/10 object-cover dark:border-white/10"
                  />
                ))}
              </div>
            )}

            {selectedExperience.links?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                {selectedExperience.links?.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight className="size-4" />
                  </a>
                ))}
              </div>
            )}

            {selectedExperience.url && (
              <a
                href={selectedExperience.url}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  underline-offset-4
                  hover:underline
                "
              >
                View experience
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}