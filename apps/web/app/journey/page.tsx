"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FlaskConical,
  GraduationCap,
  Rocket,
} from "lucide-react";

import { DOMAIN } from "@hirakada/config";

const journey = [
  {
    startDate: "2026-01",
    endDate: null,
    type: "Building",
    title: "Hirakada",
    description:
      "Building a personal digital space to document projects, experiences, experiments, and the things I create along the way.",
    icon: Rocket,
    tags: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    startDate: "2026-02",
    endDate: null,
    type: "Entrepreneurship",
    title: "Matcha Kun",
    description:
      "Developing Matcha Kun as a modern matcha beverage brand, combining product development, branding, digital marketing, operations, and business analytics.",
    icon: BriefcaseBusiness,
    tags: ["Entrepreneurship", "Branding", "Digital Business"],
  },
  {
    startDate: "2026-01",
    endDate: null,
    type: "Research",
    title: "IoT & Entrepreneurship Research",
    description:
      "Exploring the success factors of IoT-enabled digital tools in entrepreneurship through systematic literature review and Delphi validation.",
    icon: FlaskConical,
    tags: ["SLR", "Gioia", "Delphi"],
  },
  {
    startDate: "2025-08",
    endDate: "2026-01",
    type: "Experience",
    title: "Digital Marketing Internship",
    description:
      "Working across digital marketing activities including KOL research, affiliate databases, UGC content, campaign support, product audits, and partnership outreach.",
    icon: BriefcaseBusiness,
    tags: ["Digital Marketing", "UGC", "KOL"],
  },
  {
    startDate: "2022-09",
    endDate: null,
    type: "Education",
    title: "Digital Business Innovation",
    description:
      "Studying Digital Business Innovation while exploring the intersection of technology, business, creativity, and entrepreneurship.",
    icon: GraduationCap,
    tags: ["Digital Business", "Technology", "Innovation"],
  },
];

const filters = [
  "All",
  "Education",
  "Experience",
  "Entrepreneurship",
  "Research",
  "Building",
] as const;

const principles = [
  {
    title: "Explore",
    description:
      "Stay curious, discover new perspectives, and explore the possibilities across technology, business, and creativity.",
  },
  {
    title: "Learn",
    description:
      "Gain knowledge through experiences, challenges, experiments, and the people I encounter along the way.",
  },
  {
    title: "Grow",
    description:
      "Turn every experience into progress, continuously improving how I think, work, and create.",
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}-01`));
}

function formatPeriod(
  startDate: string,
  endDate: string | null,
) {
  const start = formatDate(startDate);

  if (!endDate) {
    return `${start} — Present`;
  }

  return `${start} — ${formatDate(endDate)}`;
}

export default function JourneyPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const filteredJourney = useMemo(() => {
    const filtered =
      activeFilter === "All"
        ? journey
        : journey.filter((item) => item.type === activeFilter);

    return [...filtered].sort((a, b) => {
      // Ongoing entries always come first
      if (a.endDate === null && b.endDate !== null) {
        return -1;
      }

      if (a.endDate !== null && b.endDate === null) {
        return 1;
      }

      // Within the same status, newest start date first
      return (
        new Date(`${b.startDate}-01`).getTime() -
        new Date(`${a.startDate}-01`).getTime()
      );
    });
  }, [activeFilter]);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Journey
          </p>

          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-8xl">
            A journey of
            <br />
            <span className="text-muted-foreground">
              exploring & growing.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Every experience, project, and challenge becomes part of the
            journey — shaping how I think, learn, and grow.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-12">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                ].join(" ")}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-6 pb-32 sm:px-8 lg:px-12">
        {filteredJourney.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-border md:left-1/2" />

            <div className="space-y-16 md:space-y-24">
              {filteredJourney.map((item, index) => {
                const Icon = item.icon;
                const isRight = index % 2 === 1;

                return (
                  <article
                    key={`${item.startDate}-${item.title}`}
                    className="relative grid md:grid-cols-2 md:gap-16"
                  >
                    {/* Date */}
                    <div
                      className={`hidden md:block ${
                        isRight ? "order-2 text-left" : "text-right"
                      }`}
                    >
                      <span className="text-sm font-medium tracking-wide text-muted-foreground">
                        {formatPeriod(item.startDate, item.endDate)}
                      </span>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 z-10 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-foreground md:left-1/2" />

                    {/* Content */}
                    <div
                      className={`pl-8 md:pl-0 ${
                        isRight ? "md:order-1 md:text-right" : ""
                      }`}
                    >
                      {/* Type */}
                      <div
                        className={`mb-3 flex items-center gap-3 ${
                          isRight ? "md:justify-end" : ""
                        }`}
                      >
                        <Icon className="size-4 text-muted-foreground" />

                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                          {item.type}
                        </span>

                        <span className="text-xs text-muted-foreground md:hidden">
                          · {formatPeriod(item.startDate, item.endDate)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.title}
                      </h2>

                      {/* Description */}
                      <p
                        className={`mt-4 max-w-xl text-base leading-7 text-muted-foreground ${
                          isRight ? "md:ml-auto" : ""
                        }`}
                      >
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div
                        className={`mt-5 flex flex-wrap gap-2 ${
                          isRight ? "md:justify-end" : ""
                        }`}
                      >
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              No journey entries found.
            </p>
          </div>
        )}
      </section>

      {/* Principles */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Principles
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Keep moving.
              </h2>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              {principles.map((item) => (
                <div key={item.title}>
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Chapter */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="rounded-3xl border border-border p-8 sm:p-12 lg:p-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Current chapter
          </p>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Still figuring it out.
                <br />
                <span className="text-muted-foreground">
                  And growing along the way.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
                There is no fixed destination. The current focus is on
                learning through meaningful projects, exploring new
                possibilities, and growing through real-world experiences.
              </p>
            </div>

            <Link
              href={DOMAIN.portfolio}
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              Explore my work

              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}