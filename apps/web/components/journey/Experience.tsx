import {
  BriefcaseBusiness,
  MapPin,
  ArrowUpRight,
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

export function Experience({
  experiences,
}: ExperienceProps) {
  return (
    <section className="flex w-full items-start border-t border-border px-(--global-padding-x) py-section">
      <div className="w-full">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <header className="flex max-w-sm flex-col items-start self-start text-left">
            <p className="text-label text-muted uppercase tracking-widest">
              Work
            </p>

            <h2 className="text-display mt-3">
              Work experiences.
            </h2>

            <p className="text-body text-muted mt-4">
              Roles and experiences that have shaped how I
              work, collaborate, build, and create.
            </p>
          </header>

          <div className="min-w-0">
            {experiences.map((item, index) => (
              <article
                key={item.id}
                className={`grid gap-5 py-8 sm:py-10 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-8 ${
                  index !== 0
                    ? "border-t border-border"
                    : ""
                }`}
              >
                <div className="text-sm leading-6 text-muted">
                  {formatPeriod(
                    item.start_date,
                    item.end_date,
                  )}
                </div>

                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                    <BriefcaseBusiness className="size-4" />
                    <span>Work</span>
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>

                  {item.role && (
                    <p className="mt-2 text-sm font-medium text-foreground/80">
                      {item.role}
                    </p>
                  )}

                  {item.organizations && (
                    <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                      <span className="font-medium text-foreground/80">
                        {item.organizations.name}
                      </span>

                      <span aria-hidden="true">
                        ·
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 shrink-0" />
                        {item.organizations.city},{" "}
                        {item.organizations.country}
                      </span>
                    </div>
                  )}

                  {item.location &&
                    !item.organizations && (
                      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                        <MapPin className="size-3.5" />
                        {item.location}
                      </p>
                    )}

                  {item.description && (
                    <p className="text-body text-muted mt-5 max-w-2xl">
                      {item.description}
                    </p>
                  )}

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      View experience

                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}