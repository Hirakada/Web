"use client";

import { AttributeTag } from "@hirakada/ui";
import type { Attribute } from "@hirakada/database";

import { InfiniteSlider } from "../ui/infinite-slider";

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
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-32
          z-10
          w-[calc(var(--global-padding-x)+12rem)]

          bg-linear-to-r
          from-(--color-background)
          to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-32
          z-10
          w-[calc(var(--global-padding-x)+12rem)]

          bg-linear-to-l
          from-(--color-background)
          to-transparent
        "
      />

        <InfiniteSlider
          gap={28}
          duration={60}
          durationOnHover={120}
          className="w-full"
        >
          {sortedAttributes.map((attribute) => (
            <div
              key={attribute.id}
              className="shrink-0"
            >
              <AttributeTag
                iconUrl={attribute.iconUrl}
              >
                {attribute.name}
              </AttributeTag>
            </div>
          ))}
        </InfiniteSlider>
    </section>
  );
}