"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const tabs = [
  { id: "journey-experience", label: "Experience" },
  { id: "journey-education", label: "Education" },
] as const;

export function JourneyQuickTabs() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.4;
      const activeSection = sections
        .filter((section) => section.getBoundingClientRect().top <= activationLine)
        .at(-1);

      setActiveId(activeSection?.id ?? null);
    };

    const observer = new IntersectionObserver(
      () => {
        updateActiveSection();
      },
      {
        threshold: [0, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Journey sections"
      className="
        fixed
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        left-1/2
        -translate-x-1/2
        w-fit
        max-w-[calc(100vw-2rem)]
        z-50
        rounded-full
        bg-background/90
        p-1
        shadow-base
        backdrop-blur-md
        flex
        items-center
        gap-0.5
        md:flex-col
        md:left-auto
        md:right-(--global-padding-x)
        md:bottom-auto
        md:top-1/2
        md:-translate-y-1/2
        md:translate-x-0
        md:rounded-2xl
      "
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            aria-current={isActive ? "page" : undefined}
            aria-pressed={isActive}
            onClick={() => {
              document.getElementById(tab.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setActiveId(tab.id);
            }}
            className={`
              relative
              overflow-hidden
              min-h-11
              whitespace-nowrap
              rounded-xl
              px-3
              py-2.5
              text-xs
              font-medium
              transition-all
              md:block
              md:w-full
              md:px-3
              ${
                isActive
                  ? "text-background shadow-(--shadow-quick-tab-active)"
                  : "text-(--text-muted) hover:bg-muted/10 hover:text-foreground"
              }
            `}
          >
            {isActive && (
              <motion.span
                layoutId="journey-active-tab"
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                }}
                className="absolute inset-0 rounded-xl bg-foreground"
              />
            )}

            <span className="relative z-10">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}