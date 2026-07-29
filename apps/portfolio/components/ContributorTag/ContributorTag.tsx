import Link from "next/link";
import type { ReactNode } from "react";

export interface ContributorTagProps {
  name: string;
  role?: string;
  href: string;
  icon?: ReactNode;
  className?: string;
}

export default function ContributorTag({
  name,
  role,
  href,
  icon,
  className = "",
}: ContributorTagProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-3",
        "rounded-xl border border-neutral-200",
        "bg-white px-4 py-3",
        "transition-all duration-200",
        "hover:-translate-y-0.5",
        "hover:border-neutral-300",
        "hover:shadow-sm",
        "dark:border-neutral-800",
        "dark:bg-neutral-900",
        "dark:hover:border-neutral-700",
        className,
      ].join(" ")}
    >
      {icon && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          {icon}
        </span>
      )}

      <span className="flex flex-col">
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {name}
        </span>

        {role && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {role}
          </span>
        )}
      </span>
    </Link>
  );
}