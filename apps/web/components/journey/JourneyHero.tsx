export function JourneyHero() {
  return (
    <section className="flex w-full items-start px-(--global-padding-x) py-section">
      <div className="w-full">
        <div className="max-w-5xl">
          <p className="text-label text-muted uppercase tracking-widest">
            Journey
          </p>

          <h1 className="text-display mt-6 max-w-4xl">
            A collection of
            <br />
            <span className="text-muted">
              experiences & growth.
            </span>
          </h1>

          <p className="text-body text-muted mt-8 max-w-2xl">
            Exploring technology, business, creativity, and
            everything in between — one experience at a time.
          </p>
        </div>
      </div>
    </section>
  );
}