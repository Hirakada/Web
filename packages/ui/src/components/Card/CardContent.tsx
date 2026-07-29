import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface CardContentProps
  extends HTMLAttributes<HTMLDivElement> {}

export default function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between",
        "gap-4",
        "p-4 sm:p-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}