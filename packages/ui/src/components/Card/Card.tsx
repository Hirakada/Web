import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface CardProps
  extends HTMLAttributes<HTMLDivElement> {}

export default function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        // Layout
        "group relative flex w-full h-fit flex-col overflow-hidden",

        // Shape
        "rounded-3xl",

        // Surface
        "bg-(--color-surface)",

        // Border
        "border border-[rgba(var(--color-secondary-rgb),0.15)]",

        // Shadow
        "shadow-sm",

        // Animation
        "transition-all duration-300 ease-out",

        // Hover
        "hover:-translate-y-1",
        "hover:shadow-lg",
        "hover:border-[rgba(var(--color-primary-rgb),0.3)]",

        // Accessibility
        "focus-within:ring-2",
        "focus-within:ring-[rgba(var(--color-primary-rgb),0.3)]",

        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}