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


  return (
    <section
      className="
        key-skills-section

        flex
        w-full

        justify-center
        items-start

        bg-(--color-background)

        px-(--global-padding-x)

        pt-0
      "
    >

      <motion.div
        className="
          skills-grid

          flex
          w-full

          flex-wrap

          justify-center
          items-center

          gap-[clamp(1rem,2vw,1.75rem)]

          box-border
        "

        initial={{
          opacity: 0,
          y: 20,
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
          duration: 0.6,
          ease: "easeOut",
        }}
      >

        {sortedAttributes.map((attribute, index) => (

          <motion.div
            key={attribute.id}

            initial={{
              opacity: 0,
              scale: 0.95,
            }}

            whileInView={{
              opacity: 1,
              scale: 1,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
          >

            <AttributeTag
              iconUrl={attribute.iconUrl}
            >
              {attribute.name}
            </AttributeTag>

          </motion.div>

        ))}

      </motion.div>

    </section>
  );
}