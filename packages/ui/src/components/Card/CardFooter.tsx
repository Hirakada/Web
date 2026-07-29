import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement> {}

export default function CardFooter({
  children,
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-auto",
        "flex",
        "items-center",
        "justify-between",
        "gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}