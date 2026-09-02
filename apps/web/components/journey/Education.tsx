"use client";

import {
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";

import { Card, CardTitle, CardFooter } from "@hirakada/ui";

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
  id?: string;
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
  id,
}: EducationProps) {
  if (education.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className="
        scroll-mt-24
        flex
        w-full
        items-start
        px-(--global-padding-x)
        py-section
      "
    >
      <div className="w-full">
        <header
          className="
            flex
            max-w-sm
            flex-col
            items-start
            text-left
          "
        >
          <p
            className="
              text-label
              text-muted
              uppercase
              tracking-widest
            "
          >
            Education
          </p>

          <h2 className="text-display mt-3">
            Learning & Education.
          </h2>
        </header>

        <div
          className="
            mt-12
            -mx-2
            overflow-visible
          "
        >
          <div
            className="
              flex
              w-full
              min-w-0
              gap-5
              overflow-x-auto
              overflow-y-visible
              overscroll-x-contain
              px-2
              py-4
              scrollbar-hide
              snap-x
              snap-mandatory
            "
          >
            {education.map((item) => (
              <div
                key={item.id}
                className="
                  snap-start
                  w-[320px]
                  shrink-0
                "
              >
                <Card
                  className="
                    h-full
                    w-full
                    overflow-visible
                    p-5
                  "
                >
                  <div className="flex h-full flex-col">
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div className="flex w-full flex-1 items-center justify-between">
                        <div
                          className="
                            flex
                            size-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[rgba(var(--color-secondary-rgb),0.15)]
                          "
                        >
                          <GraduationCap
                            className="
                              size-4
                              text-muted-foreground
                            "
                          />
                        </div>
                      </div>


                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${item.title}`}
                          className="
                            flex
                            size-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[rgba(var(--color-secondary-rgb),0.15)]
                            text-muted
                            transition-all
                            duration-200
                            hover:bg-foreground
                            hover:text-background
                          "
                        >
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="mt-5 min-w-0">
                    
                      <CardTitle>
                        {item.title}
                      </CardTitle>

                      {item.role && (
                        <p
                          className="
                            mb-2
                            line-clamp-1
                            font-semibold
                            text-foreground/70
                          "
                        >
                          {item.role}
                        </p>
                      )}

                    </div>
                    
                    <CardFooter className="font-semibold text-xs text-muted">
                      {item.organizations && (
                        <div>
                          <p>
                            {item.organizations.name}
                          </p>
                        </div>
                      )}
                      <p>
                        {formatPeriod(
                          item.start_date,
                          item.end_date,
                        )}
                      </p>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}