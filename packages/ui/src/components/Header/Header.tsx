"use client";

import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  contactHref,
  items = [],
  internalUrls = [],
  className,
  sticky = true,
  bordered = true,
}: HeaderProps) {

  const pathname = usePathname();

  const [open, setOpen] = useState(false);


  useEffect(() => {
    document.documentElement.classList.toggle(
      "no-scroll",
      open,
    );

    return () => {
      document.documentElement.classList.remove(
        "no-scroll",
      );
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

        sticky
          ? "sticky"
          : "relative",

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

        {/* Logo */}
        <Link
          href={logoHref}
          aria-label="Home"
          className="relative z-20 shrink-0 block"
        >
          <div 
            className="h-8 w-40 bg-current transition-colors duration-200"
            style={{
              maskImage: `url(${logo})`,
              WebkitMaskImage: `url(${logo})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          />
        </Link>

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

              <li
                key={`${item.label}-${item.href}`}
              >

                <HeaderLink
                  item={item}
                  pathname={pathname}
                  internalUrls={internalUrls}
                />

              </li>

            ))}

          </ul>

        </nav>


        {contactHref && (
          <Button
            asChild
            className="relative z-20 ml-auto hidden md:inline-flex"
          >
            <a href={contactHref}>Contact</a>
          </Button>
        )}

        {/* Mobile Toggle */}

        <div
          className="
            relative z-20 ml-3 md:hidden
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


      <HeaderMobileMenu
        open={open}
        pathname={pathname}
        items={[...items]}
        onNavigate={() => setOpen(false)}
      />

    </header>
  );
}