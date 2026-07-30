"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "../../lib/cn";

import {
  HEADER_HEIGHT,
  MENU_ANIMATION,
} from "./constants";

import HeaderLink from "./HeaderLink";

import type { HeaderItem } from "./types";


interface HeaderMobileMenuProps {
  open: boolean;
  pathname: string;
  items: HeaderItem[];
  internalUrls?: readonly string[];
  onNavigate: () => void;
}


export default function HeaderMobileMenu({
  open,
  pathname,
  items,
  internalUrls = [],
  onNavigate,
}: HeaderMobileMenuProps) {

  const mobileItems =
    items.filter(
      (item) => !item.desktopOnly,
    );


  return (
    <AnimatePresence>

      {open && (

        <motion.nav
          id="header-mobile-menu"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          transition={MENU_ANIMATION}

          className={cn(
            "fixed inset-x-0 bottom-0 z-40",

            "md:hidden",

            "overflow-y-auto",

            "bg-(--color-background)",

            "border-t border-[rgba(var(--color-secondary-rgb),0.12)]",
          )}

          style={{
            top: HEADER_HEIGHT,
            height: `calc(100dvh - ${HEADER_HEIGHT})`,
          }}
        >

          <motion.ul

            initial={{
              y: -24,
            }}

            animate={{
              y: 0,
            }}

            exit={{
              y: -24,
            }}

            transition={MENU_ANIMATION}

            className={cn(
              "flex flex-col",

              "gap-2",

              "px-(--global-padding-x)",

              "py-8",
            )}
          >

            {mobileItems.map((item) => (

              <li
                key={`${item.label}-${item.href}`}
              >

                <HeaderLink
                  item={item}
                  pathname={pathname}
                  internalUrls={internalUrls}
                  onClick={onNavigate}
                />

              </li>

            ))}

          </motion.ul>

        </motion.nav>

      )}

    </AnimatePresence>
  );
}