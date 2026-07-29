import type { ReactNode } from "react";
import { motion } from "framer-motion";


export interface OpenButtonProps {
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}


export default function OpenButton({
  icon,
  children,
  onClick,
}: OpenButtonProps) {

  return (
    <motion.button

      onClick={onClick}

      whileHover={{
        scale: 1.01,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
        open-button

        inline-flex

        items-center
        justify-center

        gap-2

        rounded-md

        bg-[var(--color-primary)]

        px-4
        py-2

        text-sm

        font-bold

        text-[var(--color-on-primary)]

        transition-colors
        duration-300

        hover:bg-[var(--color-primary-variant)]

        cursor-pointer
      "
    >

      {icon}

      {children}

    </motion.button>
  );
}