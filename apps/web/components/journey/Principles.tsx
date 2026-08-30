interface Principles {
  title: string;
  description: string;
}

interface PrincipleProps {
  principles: readonly Principles[];
}

export function Principles({
  principles,
}: PrincipleProps) {
  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Principles
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Keep moving.
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}