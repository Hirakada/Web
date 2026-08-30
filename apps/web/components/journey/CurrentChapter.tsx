"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { DOMAIN } from "@hirakada/config";

export function CurrentChapter() {
  return (
    <section className="flex w-full items-start px-(--global-padding-x) py-section">
      <div className="w-full">
        <header className="mb-6 flex max-w-sm flex-col items-start text-left">
          <p className="text-label text-muted uppercase tracking-widest">
            Current Chapter
          </p>
        </header>

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
            rotate: -1,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: 0,
          }}
          whileHover={{
            y: -6,
            rotate: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="group relative overflow-hidden rounded-[2rem] border border-border bg-background p-6 shadow-sm transition-shadow duration-500 hover:shadow-2xl sm:p-8 lg:p-12"
        >
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-brand/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                <Sparkles className="size-3.5" />
                <span>Now</span>
              </div>

              <motion.div
                whileHover={{
                  rotate: 45,
                  scale: 1.1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-background"
              >
                <ArrowUpRight className="size-4" />
              </motion.div>
            </div>

            <div className="mt-10 max-w-4xl sm:mt-12">
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
                Still figuring it out.
                <br />
                <span className="text-muted-foreground">
                  And growing along the way.
                </span>
              </h2>

              <p className="text-body text-muted mt-7 max-w-2xl">
                There is no fixed destination. The current
                focus is on learning through meaningful projects,
                exploring new possibilities, and growing through
                real-world experiences.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-6 border-t border-border pt-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <span>Explore</span>
                <span>Learn</span>
                <span>Grow</span>
              </div>

              <Link
                href={DOMAIN.portfolio}
                className="group/link inline-flex w-fit items-center gap-2 text-sm font-medium"
              >
                Explore my work

                <ArrowUpRight className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}