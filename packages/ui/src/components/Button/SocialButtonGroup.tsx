import type { ReactNode } from "react";


export interface SocialButtonGroupProps {
  children: ReactNode;
  className?: string;
}


export default function SocialButtonGroup({
  children,
  className = "",
}: SocialButtonGroupProps) {

  return (
    <div
      className={[
        "flex",
        "w-fit",
        "items-center",
        "justify-center",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}