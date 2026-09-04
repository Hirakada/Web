import {
  ArrowUpRight,
  MapPin,
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

interface OrganizationItem {
  id: string;
  experience_type: "organization";
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

export interface OrganizationsProps {
  organizations: OrganizationItem[];
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

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

export function Organizations({
  organizations,
}: OrganizationsProps) {
  return (
    <section className="flex w-full items-start border-t border-border px-(--global-padding-x) py-section">
      <div className="w-full">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <div className="flex max-w-sm flex-col items-start self-start text-left">
            <p className="text-label text-muted uppercase tracking-widest">
              Organizations
            </p>

            <h2 className="text-display mt-3">
              Communities & organizations.
            </h2>

            <p className="text-body text-muted mt-4">
              Communities and organizations that became part
              of my journey beyond formal work.
            </p>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {organizations.map((item) => {
              const organization = item.organizations;

              return (
                <article
                  key={item.id}
                  className="group flex min-w-0 flex-col rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-sm font-semibold">
                      {organization ? getInitial(organization.name) : <Users className="size-4" />}
                    </div>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${item.title}`}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-foreground hover:text-background"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>

                  <div className="mt-6 min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
                      Organization
                    </p>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>

                    {item.role && (
                      <p className="mt-2 text-sm font-medium text-foreground/80">
                        {item.role}
                      </p>
                    )}

                    {organization && (
                      <>
                        <p className="mt-4 text-sm font-medium text-foreground/80">
                          {organization.name}
                        </p>

                        <p className="mt-2 flex items-start gap-1.5 text-sm leading-6 text-muted">
                          <MapPin className="mt-1 size-3.5 shrink-0" />

                          <span>
                            {organization.city},{" "}
                            {organization.country}
                          </span>
                        </p>
                      </>
                    )}

                    {item.description && (
                      <p className="text-body text-muted mt-5 line-clamp-4">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 border-t border-border pt-4 text-sm text-muted">
                    {formatPeriod(
                      item.start_date,
                      item.end_date,
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}