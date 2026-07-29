import Link from "next/link";
import type { ReactNode } from "react";


export interface BackButtonProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}


export default function BackButton({
  href,
  icon,
  children,
}: BackButtonProps) {

  return (
    <Link
      href={href}

      className="
        back-button

        z-2

        flex
        items-center
        justify-center

        gap-2

        no-underline

        text-[var(--text-disabled)]

        transition-colors
        duration-300

        hover:text-[var(--text-high-emphasis)]

        [&_*]:animate-none
        [&_*]:opacity-100
        [&_*]:transform-none
      "
    >

      {icon}

      {children}

    </Link>
  );
}