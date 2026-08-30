import { GraduationCap } from "lucide-react";

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

interface Education {
  id: string;
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

export interface EducationProps {
  education: Education[];
}

export function Education({
  education,
}: EducationProps) {
  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Where I learned.
          </h2>
        </div>

        <div className="space-y-12">
          {education.map((item) => (
            <article
              key={item.id}
              className="grid gap-6 lg:grid-cols-[220px_1fr]"
            >
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <GraduationCap className="mt-0.5 size-4 shrink-0" />

                <span>
                  {formatPeriod(item.start_date, item.end_date)}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {item.title}
                </h3>

                {item.role && (
                  <p className="mt-2 text-sm font-medium">
                    {item.role}
                  </p>
                )}

                {item.organizations && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.organizations.name} ·{" "}
                    {item.organizations.city},{" "}
                    {item.organizations.country}
                  </p>
                )}

                {item.description && (
                  <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}