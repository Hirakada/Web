interface Principle {
  title: string;
  description: string;
}

export interface PrinciplesProps {
  principles: readonly Principle[];
}

export function Principles({
  principles,
}: PrinciplesProps) {
  return (
    <section className="flex w-full items-start px-(--global-padding-x) py-section">
      <div className="w-full">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <div className="flex max-w-sm flex-col items-start self-start text-left">
            <h2 className="text-display mt-3">
              Keep moving.
            </h2>

            <p className="text-body text-muted mt-4">
              A simple framework for how I approach learning,
              creating, and growing.
            </p>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-3">
            {principles.map((item, index) => (
              <article
                key={item.title}
                className="p-5 sm:p-6"
              >
                <span className="text-xs font-medium text-muted">
                  0{index + 1}
                </span>

                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="text-body text-muted mt-3">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}