import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface CardTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export default function CardTitle({
  children,
  className,
  ...props
}: CardTitleProps) {
  return (
    <h4
      className={cn(
        "line-clamp-3",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}