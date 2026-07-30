"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialItem {
  label: string;
  href: string;
  icon: string;
}

export interface FooterProps {
  brand?: string;
  href?: string;
  startYear?: number;
  navigation?: readonly NavigationItem[];
  socials?: readonly SocialItem[];
}

export default function Footer({
  brand = "Hirakada",
  href = "/",
  startYear = new Date().getFullYear(),
  navigation = [],
  socials = [],
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const year =
    startYear === currentYear
      ? `${currentYear}`
      : `${startYear}–${currentYear}`;

  return (
      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6">
        <motion.nav
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="
            flex
            flex-nowrap
            items-center
            justify-center
            gap-2
            sm:gap-4
            md:gap-6
            lg:gap-8
            overflow-x-auto
          ">
          {navigation.map((item) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <motion.div
                whileHover={{ y: -2 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <Link
                  href={item.href}
                  className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  {item.label}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.nav>

        {socials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-5"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={
                  social.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.label}
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <Icon icon={social.icon} className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        )}

        <p className="text-center text-sm text-neutral-500">
          © {year}{" "}
          <Link
            href={href}
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {brand}
          </Link>
        </p>
      </div>
    </motion.footer>
  );
}