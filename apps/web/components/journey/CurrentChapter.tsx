import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DOMAIN } from "@hirakada/config";

export function CurrentChapter() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="rounded-3xl border border-border p-8 sm:p-12 lg:p-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Current chapter
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Still figuring it out.
              <br />
              <span className="text-muted-foreground">
                And growing along the way.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
              There is no fixed destination. The current focus is on
              learning through meaningful projects, exploring new
              possibilities, and growing through real-world experiences.
            </p>
          </div>

          <Link
            href={DOMAIN.portfolio}
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            Explore my work

            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}