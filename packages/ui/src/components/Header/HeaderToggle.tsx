"use client";

import { Menu, X } from "lucide-react";

import { cn } from "../../lib/cn";

interface HeaderToggleProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
}

export default function HeaderToggle({
  open,
  onToggle,
  className,
}: HeaderToggleProps) {
  return (
    <button
      type="button"
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-controls="header-mobile-menu"
      aria-expanded={open}
      aria-pressed={open}
      onClick={onToggle}
      className={cn(
        "inline-flex",
        "size-10",
        "items-center",
        "justify-center",
        "rounded-lg",
        "text-[var(--text-high-emphasis)]",
        "transition-colors",
        "duration-200",
        "hover:bg-[var(--color-hover)]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--color-primary)]",
        "md:hidden",
        className,
      )}
    >
      {open ? (
        <X className="size-5" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Menu className="size-5" strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
}