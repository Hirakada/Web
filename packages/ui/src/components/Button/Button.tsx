import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function Button({
  children,
  startIcon,
  endIcon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-lg",
        "bg-primary",
        "px-4 py-2.5",
        "font-medium text-white",
        "transition-all duration-200",
        "hover:opacity-90",
        "active:scale-95",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      ].join(" ")}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}