"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const ADDRESS =
  "Jl. Bulak Kalitinjang Baru Timur II No. 4 Kav. 21, Bulak, Kec. Bulak, Surabaya, Jawa Timur 60124";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=GBU%20CENTER%20Bulak";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15832.203326922163!2d112.7748002!3d-7.235042599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9c8d63a6b6b%3A0xb2930a254195c81f!2sGBU%20CENTER%20Bulak!5e0!3m2!1sen!2sid!4v1790612104575!5m2!1sen!2sid";

const WHATSAPP_URL =
  "https://wa.me/62895401490641?text=Halo%20kak";

const HIRAKADA_URL =
  "https://hirakada.vercel.app/";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function GbuPage() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main
      className="min-h-dvh w-full"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-on-background)",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="
          mx-auto flex min-h-dvh w-full
          max-w-[520px]
          flex-col
          px-6
          sm:px-8
        "
        style={{
          paddingBlock: "var(--section-padding-y)",
        }}
      >
        {/* Profile */}
        <motion.header
          variants={itemVariants}
          className="flex w-full flex-col items-center text-center"
        >
          <div
            className="
              flex size-28 items-center justify-center
              overflow-hidden rounded-2xl
              border
              sm:size-32
            "
            style={{
              backgroundColor: "#ffffff",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-base)",
            }}
          >
            <Image
              src="/gbu/logo.svg"
              alt="GBU CENTER"
              width={128}
              height={128}
              priority
              className="size-full object-contain p-2"
            />
          </div>

          <h1
            className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-heading)",
            }}
          >
            GBU CENTER
          </h1>

          <p
            className="mt-2 text-sm sm:text-base"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
            }}
          >
            ATK • Print • Fotocopy • PPOB
          </p>

          <div
            className="mt-6 h-px w-full"
            style={{
              backgroundColor: "var(--color-border)",
            }}
          />
        </motion.header>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          className="mt-10 flex w-full flex-col gap-4"
        >
          {/* Google Maps Embed */}
          <motion.div
            variants={itemVariants}
            className="w-full overflow-hidden rounded-xl border"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-base)",
            }}
          >
            <div className="aspect-[4/5] w-full sm:aspect-[4/3]">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                title="Lokasi GBU CENTER Bulak di Google Maps"
                className="block size-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </motion.div>

          {/* Address */}
          <motion.button
            type="button"
            variants={itemVariants}
            onClick={copyAddress}
            whileTap={{ scale: 0.99 }}
            className="
              relative flex w-full items-start gap-3
              rounded-xl border
              px-4 py-4
              text-left
              transition-opacity
              hover:opacity-90
            "
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "inherit",
            }}
            aria-label="Salin alamat GBU CENTER"
          >
            <MapPin
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0"
              strokeWidth={1.8}
              style={{
                color: "var(--color-primary)",
              }}
            />

            <span
              className="min-w-0 text-xs leading-5 sm:text-sm"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-muted)",
              }}
            >
              {ADDRESS}
            </span>

            {/* Copy Toast */}
            <motion.span
              initial={false}
              animate={{
                opacity: copied ? 1 : 0,
                y: copied ? 0 : 4,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="
                pointer-events-none absolute
                bottom-2 right-2
                rounded-md
                px-2 py-1
                text-[11px] font-medium
              "
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--color-surface-elevated)",
                color: "var(--color-on-surface)",
                boxShadow: "var(--shadow-base)",
              }}
              aria-hidden={!copied}
            >
              Alamat disalin
            </motion.span>
          </motion.button>

          {/* Google Maps Button */}
          <motion.a
            variants={itemVariants}
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="
              flex min-h-[var(--button-height)] w-full
              items-center justify-center gap-2
              rounded-[var(--radius-button)]
              px-[var(--button-padding-x)]
              py-[var(--button-padding-y)]
              font-medium
            "
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              boxShadow: "var(--shadow-base)",
            }}
          >
            <MapPin
              aria-hidden="true"
              className="size-5"
              strokeWidth={1.8}
            />

            <span>Buka di Google Maps</span>
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a
            variants={itemVariants}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="
              flex min-h-[var(--button-height)] w-full
              items-center justify-center gap-2
              rounded-[var(--radius-button)]
              border
              px-[var(--button-padding-x)]
              py-[var(--button-padding-y)]
              font-medium
            "
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-on-surface)",
            }}
          >
            <MessageCircle
              aria-hidden="true"
              className="size-5"
              strokeWidth={1.8}
            />

            <span>WhatsApp</span>
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={itemVariants}
          className="mt-auto w-full text-center"
          style={{
            paddingTop: "var(--space-16)",
          }}
        >
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
            }}
          >
            Powered by{" "}
            <a
              href={HIRAKADA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-opacity hover:opacity-80"
              style={{
                color: "var(--text-high-emphasis)",
              }}
            >
              Hirakada
            </a>
          </p>
        </motion.footer>
      </motion.div>
    </main>
  );
}