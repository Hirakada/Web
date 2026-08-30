import {
  BriefcaseBusiness,
  Users,
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

interface Experience {
  id: string;
  experience_type: "work" | "organization";
  title: string;
  role: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  url: string | null;
  organizations: Organization | null;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatPeriod(start: string, end: string | null) {
  return `${formatDate(start)} — ${
    end ? formatDate(end) : "Present"
  }`;
}

export interface ExperienceProps {
  experiences: Experience[];
}

export function Experience({
  experiences,
}: ExperienceProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32 sm:px-8 lg:px-12">
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Experience
        </p>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Work & organizations.
        </h2>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-border" />

        <div className="space-y-12">
          {experiences.map((item) => {
            const isWork = item.experience_type === "work";
            const Icon = isWork ? BriefcaseBusiness : Users;

            return (
              <article
                key={item.id}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-1 z-10 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-foreground" />

                <div className="flex flex-wrap items-center gap-3">
                  <Icon className="size-4 text-muted-foreground" />

                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {isWork ? "Work" : "Organization"}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {formatPeriod(item.start_date, item.end_date)}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {item.title}
                </h3>

                {item.role && (
                  <p className="mt-2 text-sm font-medium">
                    {item.role}
                  </p>
                )}

                {item.organizations && (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>{item.organizations.name}</span>

                    <span aria-hidden="true">·</span>

                    <span>
                      {item.organizations.city},{" "}
                      {item.organizations.country}
                    </span>
                  </div>
                )}

                {item.location && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.location}
                  </p>
                )}

                {item.description && (
                  <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                )}

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Learn more
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}