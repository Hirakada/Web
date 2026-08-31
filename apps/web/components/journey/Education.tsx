import {
  ArrowUpRight,
  GraduationCap,
  MapPin,
} from "lucide-react";

import {
  Card,
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
              Academic experiences that continue to shape
              how I think, build, and approach new challenges.
            </p>
          </header>

          <div
            className="
              grid
              min-w-0
              gap-5
              sm:grid-cols-2
            "
          >
            {education.map((item) => (
              <Card
                key={item.id}
                className="
                  h-full
                  min-h-72
                  p-6
                  sm:min-h-80
                "
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="
                        flex
                        size-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[rgba(var(--color-secondary-rgb),0.15)]
                      "
                    >
                      <GraduationCap
                        className="
                          size-5
                          text-muted-foreground
                        "
                      />
                    </div>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${item.title}`}
                        className="
                          flex
                          size-9
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
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>

                  <div className="mt-8">
                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.14em]
                        text-muted
                      "
                    >
                      {formatPeriod(
                        item.start_date,
                        item.end_date,
                      )}
                    </p>

                    <h3
                      className="
                        mt-3
                        text-xl
                        font-semibold
                        tracking-tight
                        sm:text-2xl
                      "
                    >
                      {item.title}
                    </h3>

                    {item.role && (
                      <p
                        className="
                          mt-2
                          text-sm
                          font-medium
                          text-foreground/80
                        "
                      >
                        {item.role}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto pt-8">
                    {item.organizations && (
                      <div>
                        <p className="text-sm font-semibold">
                          {item.organizations.name}
                        </p>

                        <p
                          className="
                            mt-1.5
                            flex
                            items-center
                            gap-1.5
                            text-sm
                            text-muted
                          "
                        >
                          <MapPin className="size-3.5 shrink-0" />

                          <span>
                            {item.organizations.city},{" "}
                            {item.organizations.country}
                          </span>
                        </p>
                      </div>
                    )}

                    {item.location &&
                      !item.organizations && (
                        <p
                          className="
                            flex
                            items-center
                            gap-1.5
                            text-sm
                            text-muted
                          "
                        >
                          <MapPin className="size-3.5 shrink-0" />

                          {item.location}
                        </p>
                      )}

                    {item.description && (
                      <p
                        className="
                          mt-5
                          line-clamp-3
                          text-sm
                          leading-6
                          text-muted
                        "
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}