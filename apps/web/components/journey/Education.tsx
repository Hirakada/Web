"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  GraduationCap,
  MapPin,
} from "lucide-react";

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

interface EducationItem {
  id: string;
  section: "education";
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

export interface EducationProps {
  education: EducationItem[];
}

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

export function Education({
  education,
}: EducationProps) {
  const [flipped, setFlipped] = useState<string | null>(
    null,
  );

  return (
    <section
      className="
        flex
        w-full
        items-start
        border-t
        border-border
        px-(--global-padding-x)
        py-section
      "
    >
      <div className="w-full">
        <div className="grid items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <header className="flex max-w-sm flex-col items-start text-left">
            <p className="text-label text-muted uppercase tracking-widest">
              Education
            </p>

            <h2 className="text-display mt-3">
              Learning & education.
            </h2>

            <p className="text-body text-muted mt-4">
              The academic experiences that continue to shape
              how I think, build, and approach new challenges.
            </p>
          </header>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {education.map((item) => {
              const isFlipped = flipped === item.id;

              return (
                <div
                  key={item.id}
                  className="
                    group
                    h-72
                    [perspective:1200px]
                    sm:h-80
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setFlipped(
                        isFlipped ? null : item.id,
                      )
                    }
                    aria-label={
                      isFlipped
                        ? `Show details for ${item.title}`
                        : `Show description for ${item.title}`
                    }
                    className="
                      relative
                      h-full
                      w-full
                      text-left
                      [transform-style:preserve-3d]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:[transform:rotateY(180deg)]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-foreground
                      focus-visible:ring-offset-4
                      focus-visible:ring-offset-background
                    "
                    style={{
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : undefined,
                    }}
                  >
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        h-full
                        w-full
                        flex-col
                        rounded-2xl
                        border
                        border-border
                        bg-background
                        p-5
                        [backface-visibility:hidden]
                        sm:p-6
                      "
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-border">
                          <GraduationCap className="size-4 text-muted-foreground" />
                        </div>

                        <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                          Education
                        </span>
                      </div>

                      <div className="mt-auto">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                          {formatPeriod(
                            item.start_date,
                            item.end_date,
                          )}
                        </p>

                        <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                          {item.title}
                        </h3>

                        {item.role && (
                          <p className="mt-2 text-sm font-medium text-foreground/80">
                            {item.role}
                          </p>
                        )}

                        {item.organizations && (
                          <div className="mt-4">
                            <p className="text-sm font-medium">
                              {item.organizations.name}
                            </p>

                            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
                              <MapPin className="size-3.5 shrink-0" />

                              {item.organizations.city},{" "}
                              {item.organizations.country}
                            </p>
                          </div>
                        )}

                        <p className="mt-5 text-xs text-muted">
                          Hover or tap to explore
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        h-full
                        w-full
                        flex-col
                        rounded-2xl
                        border
                        border-border
                        bg-foreground
                        p-5
                        text-background
                        [backface-visibility:hidden]
                        [transform:rotateY(180deg)]
                        sm:p-6
                      "
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-60">
                            About
                          </p>

                          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                            {item.title}
                          </h3>
                        </div>

                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            aria-label={`View ${item.title}`}
                            className="
                              flex
                              size-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-background/20
                              transition-colors
                              hover:bg-background
                              hover:text-foreground
                            "
                          >
                            <ArrowUpRight className="size-4" />
                          </a>
                        )}
                      </div>

                      <div className="mt-auto">
                        {item.description ? (
                          <p className="text-sm leading-6 opacity-80">
                            {item.description}
                          </p>
                        ) : (
                          <p className="text-sm opacity-60">
                            No description available.
                          </p>
                        )}

                        <p className="mt-6 text-xs opacity-50">
                          Tap to go back
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}