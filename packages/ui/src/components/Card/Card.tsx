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
        "rounded-(--radius-card)",

        // Surface
        "bg-(--color-surface)",

        // Border
        "border border-(--color-border)",

        // Shadow
        "shadow-sm",

        // Animation
        "transition-all duration-300 ease-out",

        // Hover
        "hover:-translate-y-1",
        "hover:shadow-lg",
        "hover:border-(--color-border-strong)",

        // Accessibility
        "focus-within:ring-2",
        "focus-within:ring-(--color-border-strong)",

        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}