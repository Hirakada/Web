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

  animated?: boolean;

  className?: string;
}

const variants = {
  default:
    "border-neutral-200 bg-neutral-100 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",

  muted:
    "border-neutral-200 bg-neutral-100 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400",

  success:
    "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",

  warning:
    "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",

  danger:
    "border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",

  info:
    "border-sky-200 bg-sky-100 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300",
} satisfies Record<
  NonNullable<BulletTagProps["variant"]>,
  string
>;

export default function BulletTag({
  children,
  variant = "default",
  animated = false,
  className = "",
}: BulletTagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2.5",
        "rounded-lg border",
        "px-3.5 py-1.5",
        "text-sm font-medium leading-none",
        variants[variant],
        className,
      ].join(" ")}
    >
      <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center">
        {animated && (
          <span className="absolute inset-0 rounded-full bg-current animate-live-pulse" />
        )}

        <span className="relative h-2 w-2 rounded-full bg-current" />
      </span>

      {children}
    </span>
  );
}