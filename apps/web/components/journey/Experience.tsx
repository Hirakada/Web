"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  BriefcaseBusiness,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
  useScroll,
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
  experience_type: "work";
  title: string;
  role: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  url: string | null;
  sort_order: number;
  organizations: Organization | null;
}

export interface ExperienceProps {
  experiences: ExperienceItem[];
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

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(`${date}T00:00:00`));
}

function formatYear(date: string) {
  return new Intl.DateTimeFormat("en-US", {
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

/* =========================================================
   DATE BLOCK
   ========================================================= */

function TimelineDate({
  item,
  align,
}: {
  item: ExperienceItem;
  align: "left" | "right" | "center";
}) {
  const isCurrent =
    item.end_date === null;

  return (
    <div
      className={`
        flex
        flex-col
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
    </div>
  );
}

/* =========================================================
   CARD
   ========================================================= */

function ExperienceCard({
  item,
}: {
  item: ExperienceItem;
}) {
  return (
    <Card
      className="
        h-fit
        min-h-64
        w-full
        overflow-visible
        p-5
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
          <BriefcaseBusiness className="size-4" />

          <span>
            Work
          </span>
        </div>

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${item.title}`}
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

          <span aria-hidden="true">
            ·
          </span>

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
  );
}

/* =========================================================
   DOT
   ========================================================= */

function TimelineDot({
  item,
  lastDotRef,
  shouldReduceMotion,
}: {
  item: ExperienceItem;
  lastDotRef?: React.RefObject<HTMLSpanElement | null>;
  shouldReduceMotion: boolean;
}) {
  const isCurrent =
    item.end_date === null;

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
        ref={lastDotRef}
        aria-hidden="true"
        initial={{
          scale: shouldReduceMotion ? 1 : 0,
          opacity: shouldReduceMotion ? 1 : 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
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
          stiffness: 300,
          damping: 18,
        }}
        className={`
          relative
          z-20
          flex
          size-5
          items-center
          justify-center
          rounded-full
          border-4
          border-background
          ${
            isCurrent
              ? "bg-blue-600 ring-1 ring-blue-500/50 dark:bg-blue-400"
              : "bg-foreground ring-1 ring-border"
          }
        `}
      >
        <span className="size-1 rounded-full bg-background" />
      </motion.span>
    </div>
  );
}

/* =========================================================
   EXPERIENCE
   ========================================================= */

export function Experience({
  experiences,
}: ExperienceProps) {
  const timelineRef =
    useRef<HTMLDivElement>(null);

  const lastDotRef =
    useRef<HTMLSpanElement>(null);

  const [
    lineHeight,
    setLineHeight,
  ] = useState(0);

  const shouldReduceMotion =
    useReducedMotion();

  /* =======================================================
     SCROLL
     ======================================================= */

  const { scrollYProgress } =
    useScroll({
      target: timelineRef,
      offset: [
        "start 80%",
        "end 20%",
      ],
    });

  const smoothProgress =
    useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      mass: 0.2,
    });

  /* =======================================================
     MEASURE LINE TO LAST BULLET
     ======================================================= */

  useLayoutEffect(() => {
    const update = () => {
      const timeline =
        timelineRef.current;

      const lastDot =
        lastDotRef.current;

      if (!timeline || !lastDot) {
        return;
      }

      const timelineRect =
        timeline.getBoundingClientRect();

      const dotRect =
        lastDot.getBoundingClientRect();

      /*
       * Center of the final bullet relative
       * to the timeline container.
       */

      const height =
        dotRect.top +
        dotRect.height / 2 -
        timelineRect.top;

      setLineHeight(
        Math.max(0, height),
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

    if (lastDotRef.current) {
      observer.observe(
        lastDotRef.current,
      );
    }

    window.addEventListener(
      "resize",
      update,
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        update,
      );
    };
  }, [experiences.length]);

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section
      className="
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
            LINE
            =================================================== */}

        {lineHeight > 0 && (
          <>
            {/* Base */}

            <div
              aria-hidden="true"
              style={{
                height: lineHeight,
              }}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                z-0
                hidden
                w-px
                -translate-x-1/2
                bg-white/20
                md:block
              "
            />

            {/* Active */}

            <motion.div
              aria-hidden="true"
              style={{
                height: lineHeight,
                scaleY: shouldReduceMotion
                  ? 1
                  : smoothProgress,
              }}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                z-0
                hidden
                w-px
                origin-top
                -translate-x-1/2
                bg-white
                md:block
              "
            />

            {/* Mobile base */}

            <div
              aria-hidden="true"
              style={{
                height: lineHeight,
              }}
              className="
                pointer-events-none
                absolute
                left-4
                top-0
                z-0
                w-px
                bg-white/20
                md:hidden
              "
            />

            {/* Mobile active */}

            <motion.div
              aria-hidden="true"
              style={{
                height: lineHeight,
                scaleY: shouldReduceMotion
                  ? 1
                  : smoothProgress,
              }}
              className="
                pointer-events-none
                absolute
                left-4
                top-0
                z-0
                w-px
                origin-top
                bg-white
                md:hidden
              "
            />
          </>
        )}

        {/* ===================================================
            ITEMS
            =================================================== */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-24
            md:gap-32
          "
        >
          {experiences.map(
            (item, index) => {
              const isLast =
                index ===
                experiences.length - 1;

              const isLeft =
                index % 2 === 0;

              /* =================================================
                 LAST ITEM
                 BULLET → DATE → CARD
                 ================================================= */

              if (isLast) {
                return (
                  <motion.article
                    key={item.id}
                    initial={{
                      opacity:
                        shouldReduceMotion
                          ? 1
                          : 0,
                      y:
                        shouldReduceMotion
                          ? 0
                          : 40,
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
                  >
                    {/* Desktop */}

                    <div
                      className="
                        hidden
                        flex-col
                        items-center
                        md:flex
                      "
                    >
                      {/* LAST BULLET */}

                      <TimelineDot
                        item={item}
                        lastDotRef={
                          lastDotRef
                        }
                        shouldReduceMotion={
                          Boolean(
                            shouldReduceMotion,
                          )
                        }
                      />

                      {/* DATE BELOW BULLET */}

                      <div className="mt-5">
                        <TimelineDate
                          item={item}
                          align="center"
                        />
                      </div>

                      {/* CARD */}

                      <div
                        className="
                          mt-6
                          w-full
                          max-w-2xl
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
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Mobile */}

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
                          lastDotRef={
                            lastDotRef
                          }
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
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              /* =================================================
                 NORMAL ITEMS
                 ================================================= */

              return (
                <motion.article
                  key={item.id}
                  initial={{
                    opacity:
                      shouldReduceMotion
                        ? 1
                        : 0,
                    y:
                      shouldReduceMotion
                        ? 0
                        : 40,
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
                >
                  {/* Desktop */}

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
                        min-w-0
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
                            item={item}
                            align="right"
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
                          duration: 0.5,
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
                        min-w-0
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
                              />
                            </motion.div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mobile */}

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
    </section>
  );
}