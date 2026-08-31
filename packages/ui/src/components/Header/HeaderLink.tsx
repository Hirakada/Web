"use client";

import type { MouseEventHandler } from "react";

import Link from "next/link";

import { cn } from "../../lib/cn";
import type { HeaderItem } from "./types";

interface HeaderLinkProps {
  item: HeaderItem;
  pathname: string;
  internalUrls?: readonly string[];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function HeaderLink({
  item,
  pathname,
  internalUrls = [],
  onClick,
}: HeaderLinkProps) {

  const isHttpUrl =
    item.href.startsWith("http://") ||
    item.href.startsWith("https://");


  const isInternalDomain =
    isHttpUrl &&
    internalUrls.some((url) =>
      item.href.startsWith(url)
    );


  const isExternal =
    isHttpUrl &&
    !isInternalDomain;


  const isActive =
    !isHttpUrl &&
    (
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href ||
          pathname.startsWith(`${item.href}/`)
    );


  const className = cn(
    "inline-flex items-center justify-center",
    "rounded-lg",
    "px-3 py-2",
    "text-sm font-medium",
    "transition-all duration-200",
    "select-none",

    item.disabled
      ? "pointer-events-none opacity-50"
      : "hover:bg-[rgba(var(--color-primary-rgb),0.08)]",

    isActive
      ? [
          "bg-[rgba(var(--color-primary-rgb),0.10)]",
          "text-[var(--text-high-emphasis)]",
          "ring-1 ring-[rgba(var(--color-primary-rgb),0.20)]",
        ]
      : "text-[var(--text-disabled)]",
  );


  const content = (
    <>
      {item.icon && (
        <item.icon
          className="mr-2 size-4"
          aria-hidden="true"
        />
      )}

      {item.label}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...(onClick ? { onClick } : {})}
      >
        {content}
      </a>
    );
  }

  if (isInternalDomain) {
    return (
      <a
        href={item.href}
        className={className}
        {...(onClick ? { onClick } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      {...(onClick ? { onClick } : {})}
    >
      {content}
    </Link>
  );
}