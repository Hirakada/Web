"use client";

import { motion } from "framer-motion";

import { AttributeTag } from "@hirakada/ui";
import type { Attribute } from "@hirakada/database";

interface SkillsProps {
  attributes: Attribute[];
}

const TYPE_ORDER = [
  "language",
  "framework",
  "tool",
];

export default function Skills({
  attributes,
}: SkillsProps) {
  const sortedAttributes = [...attributes].sort((a, b) => {
    const indexA = TYPE_ORDER.indexOf(a.type ?? "");
    const indexB = TYPE_ORDER.indexOf(b.type ?? "");

    if (indexA === -1 && indexB === -1) {
      return a.name.localeCompare(b.name);
    }

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    if (indexA !== indexB) {
      return indexA - indexB;
    }

    return a.name.localeCompare(b.name);
  });

  if (sortedAttributes.length === 0) {
    return null;
  }

  const repeatCount =
    sortedAttributes.length <= 10
      ? 4
      : sortedAttributes.length <= 20
        ? 3
        : 2;

  const marqueeItems = Array.from(
    { length: repeatCount },
    () => sortedAttributes
  ).flat();

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        bg-(--color-background)

        px-(--global-padding-x)
        py-2
      "
    >
      {/* Left Fade */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-10
          w-16

          bg-gradient-to-r
          from-(--color-background)
          to-transparent
        "
      />

      {/* Right Fade */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-10
          w-16

          bg-gradient-to-l
          from-(--color-background)
          to-transparent
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="
            flex
            w-max
            items-center
            gap-[clamp(1rem,2vw,1.75rem)]
          "
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((attribute, index) => (
            <div
              key={`${attribute.id}-${index}`}
              className="shrink-0"
            >
              <AttributeTag
                iconUrl={attribute.iconUrl}
              >
                {attribute.name}
              </AttributeTag>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}