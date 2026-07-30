import type { ReactNode } from "react";

export interface BulletTagProps {
  children: ReactNode;
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "muted";
  className?: string;
}

const variants = {
  default:
    "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800",

  muted:
    "bg-neutral-100 text-neutral-500 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:border-neutral-800",

  success:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",

  warning:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",

  danger:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",

  info:
    "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
} satisfies Record<NonNullable<BulletTagProps["variant"]>, string>;

export default function BulletTag({
  children,
  variant = "default",
  className = "",
}: BulletTagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        "rounded-full border",
        "px-3 py-1",
        "text-xs font-medium",
        variants[variant],
        className,
      ].join(" ")}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      <span>{children}</span>
    </span>
  );
}