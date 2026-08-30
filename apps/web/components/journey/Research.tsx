import {
  ArrowUpRight,
  FlaskConical,
} from "lucide-react";

interface ResearchLink {
  id: string;
  type: string;
  label: string;
  url: string;
  sort_order: number;
}

interface Research {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  doi: string | null;
  sort_order: number;
  research_links: ResearchLink[];
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

function getStatus(research: Research) {
  const hasPublication =
    Boolean(research.doi) ||
    research.research_links.some(
      (link) =>
        link.type === "doi" ||
        link.type === "publication",
    );

  return hasPublication ? "Published" : "Ongoing";
}

export interface ResearchProps {
  research: Research[];
}

export function Research({
  research,
}: ResearchProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Research
        </p>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Questions worth exploring.
        </h2>

        <p className="mt-5 max-w-2xl text-muted-foreground">
          Research projects exploring ideas at the intersection of
          technology, business, and entrepreneurship.
        </p>
      </div>

      <div className="space-y-12">
        {research.map((item) => {
          const status = getStatus(item);

          const links = [...item.research_links].sort(
            (a, b) => a.sort_order - b.sort_order,
          );

          return (
            <article
              key={item.id}
              className="border-t border-border pt-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <FlaskConical className="size-4 text-muted-foreground" />

                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Research
                </span>

                <span className="text-sm text-muted-foreground">
                  {formatPeriod(item.start_date, item.end_date)}
                </span>

                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {status}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                  {item.description}
                </p>
              )}

              {(item.doi || links.length > 0) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {item.doi && (
                    <a
                      href={
                        item.doi.startsWith("http")
                          ? item.doi
                          : `https://doi.org/${item.doi}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm font-medium"
                    >
                      DOI
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}

                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm font-medium"
                    >
                      {link.label}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}