import type { ReactNode } from "react";

import { motion } from "framer-motion";

interface SocialButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export default function SocialButton({
  href,
  icon,
  label,
}: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{
        y: -2,
        scale: 1.05,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group/social
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-transparent
        text-2xl
        text-(--text-high-emphasis)
        transition-colors
        duration-300
        hover:text-(--color-primary)
      "
    >
      {icon}

      <span
        className="
          absolute
          -bottom-0.5
          left-1/2
          h-px
          w-0
          -translate-x-1/2
          bg-(--color-primary)
          transition-all
          duration-300
          group-hover/social:w-full
        "
      />
    </motion.a>
  );
}