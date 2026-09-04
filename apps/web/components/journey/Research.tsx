import {
  ArrowUpRight,
  FlaskConical,
  ExternalLink,
} from "lucide-react";

interface ResearchLink {
  id: string;
  type: string;
  label: string;
  url: string;
  sort_order: number;
}

interface ResearchItem {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  doi: string | null;
  sort_order: number;
  research_links: ResearchLink[];
}

export interface ResearchProps {
  research: ResearchItem[];
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

export function Research({
  research,
}: ResearchProps) {
  return (
    <section className="flex w-full items-start border-t border-border px-(--global-padding-x) py-section">
      <div className="w-full">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <div className="flex max-w-sm flex-col items-start self-start text-left">
            <p className="text-label text-muted uppercase tracking-widest">
              Research
            </p>

            <h2 className="text-display mt-3">
              Research & exploration.
            </h2>

            <p className="text-body text-muted mt-4">
              Research work exploring ideas at the intersection
              of technology, entrepreneurship, and digital innovation.
            </p>
          </div>

          <div className="min-w-0">
            {research.map((item, index) => (
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
                  <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
                    <FlaskConical className="size-4" />
                    <span>Research</span>
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-body text-muted mt-5 max-w-2xl">
                      {item.description}
                    </p>
                  )}

                  {item.doi && (
                    <a
                      href={
                        item.doi.startsWith("http")
                          ? item.doi
                          : `https://doi.org/${item.doi}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      DOI

                      <ExternalLink className="size-3.5" />
                    </a>
                  )}

                  {item.research_links?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.research_links.map(
                        (link) => (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground hover:text-background"
                          >
                            {link.label}

                            <ArrowUpRight className="size-3.5" />
                          </a>
                        ),
                      )}
                    </div>
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