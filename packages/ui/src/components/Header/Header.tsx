"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { cn } from "../../lib/cn";
import Button from "../Button/Button";

import { HEADER_HEIGHT } from "./constants";
import HeaderLink from "./HeaderLink";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderToggle from "./HeaderToggle";

import type { HeaderProps } from "./types";

export default function Header({
  logo,
  logoAlt = "Logo",
  logoHref = "/",
  logoLabel,
  contactHref,
  affiliateHref,
  items = [],
  internalUrls = [],
  className,
  sticky = true,
  bordered = true,
}: HeaderProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", open);

    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const desktopItems = useMemo(
    () =>
      items.filter(
        (item) =>
          !item.mobileOnly &&
          item.variant !== "button",
      ),
    [items],
  );

  return (
    <header
      className={cn(
        "top-0 z-50 w-full",
        sticky ? "sticky" : "relative",
        "bg-(--color-background)/80",
        "backdrop-blur-xl",
        bordered &&
          "border-b border-[rgba(var(--color-secondary-rgb),0.12)]",
        className,
      )}
    >
      <div
        className="
          relative mx-auto flex w-full
          max-w-container items-center
          px-(--global-padding-x)
        "
        style={{
          height: HEADER_HEIGHT,
        }}
      >
        {/* Logo + Application Label */}
        <div className="relative z-20 flex shrink-0 items-center">
          <Link
            href={logoHref}
            aria-label={logoAlt}
            className="block shrink-0"
          >
            <div
              className="h-8 w-40 bg-current transition-colors duration-200"
              style={{
                maskImage: `url(${logo})`,
                WebkitMaskImage: `url(${logo})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          </Link>

          {logoLabel && (
            <>
              <span
                aria-hidden="true"
                className="mx-3 h-5 w-px bg-[rgba(var(--color-secondary-rgb),0.18)]"
              />

              <h1 className="text-base font-semibold tracking-tight text-(--text-high-emphasis)">
                {logoLabel}
              </h1>
            </>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="
            absolute inset-0 hidden
            items-center justify-center
            md:flex
          "
        >
          <ul className="flex items-center gap-2">
            {desktopItems.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <HeaderLink
                  item={item}
                  pathname={pathname}
                  internalUrls={internalUrls}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div
          className="
            relative z-20 ml-auto
            hidden items-center gap-2
            md:flex
          "
        >
          {/* Affiliate */}
          {affiliateHref && (
            <Button
              asChild
              aria-label="Affiliate"
              title="Affiliate"
              className="inline-flex aspect-square size-10 items-center justify-center p-0"
            >
              <a href={affiliateHref}>
                <ShoppingBag
                  aria-hidden="true"
                  className="size-4"
                />
              </a>
            </Button>
          )}

          {/* Contact */}
          {contactHref && (
            <Button
              asChild
              className="inline-flex"
            >
              <a href={contactHref}>Contact</a>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div
          className="
            relative z-20 ml-auto
            md:hidden
          "
        >
          <HeaderToggle
            open={open}
            onToggle={() =>
              setOpen((prev) => !prev)
            }
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <HeaderMobileMenu
        open={open}
        pathname={pathname}
        items={[...items]}
        internalUrls={internalUrls}
        onNavigate={() => setOpen(false)}
      />
    </header>
  );
}