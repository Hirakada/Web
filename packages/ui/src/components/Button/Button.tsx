import {
  cloneElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  asChild?: boolean;
}

export default function Button({
  children,
  startIcon,
  endIcon,
  asChild = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
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
  ].join(" ");

  if (asChild) {
    if (!isReactElement(children)) {
      throw new Error("Button with asChild requires a single element child.");
    }

    const child = children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      className: [classes, child.props.className].filter(Boolean).join(" "),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

function isReactElement(value: ReactNode): value is ReactElement {
  return typeof value === "object" && value !== null && "type" in value;
}