"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  CreditCard,
  ExternalLink,
  Files,
  MapPin,
  MessageCircle,
  Printer,
} from "lucide-react";

import AdsBanner from "@/components/AdsBanner";
import type { AffiliateBanner } from "@/lib/Supabase/affiliate/affiliate";

const GOOGLE_MAPS_EMBED_URL =
  process.env.NEXT_PUBLIC_GBU_GOOGLE_MAPS_EMBED_URL!;
const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GBU_GOOGLE_MAPS_URL!;
const ADDRESS = process.env.NEXT_PUBLIC_GBU_ADDRESS!;
const WHATSAPP_URL = process.env.NEXT_PUBLIC_GBU_WHATSAPP_URL!;
const GRABFOOD_URL = process.env.NEXT_PUBLIC_GBU_GRABFOOD_URL!;
const POWERED_BY_URL = process.env.NEXT_PUBLIC_GBU_POWERED_BY_URL!;

const CAOZY_LABELS = [
  "Time to caozy",
  "caozy sudah hadir",
  "Saatnya caozy",
  "Yuk, caozy!",
  "Temukan caozy",
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
} as const;

const services = [
  {
    icon: Files,
    title: "ATK",
    description: "Alat tulis & kebutuhan sekolah",
  },
  {
    icon: Printer,
    title: "Print / Cetak",
    description: "Dokumen & tugas",
  },
  {
    icon: Files,
    title: "Fotokopi",
    description: "Salin dokumen",
  },
  {
    icon: CreditCard,
    title: "PPOB",
    description: "Pembayaran & transaksi",
  },
];

type GBUProps = {
  banners: AffiliateBanner[];
};

/*
 * Caozy label
 *
 * Server always renders the first label.
 * Client gets a random label after hydration.
 * This prevents hydration mismatch caused by Math.random().
 */
const caozyLabelCache = new Map<
  string,
  (typeof CAOZY_LABELS)[number]
>();

function getCaozyLabel(): (typeof CAOZY_LABELS)[number] {
  const key = "gbu-caozy-label";

  const existing = caozyLabelCache.get(key);

  if (existing) {
    return existing;
  }

  const label =
    CAOZY_LABELS[
      Math.floor(Math.random() * CAOZY_LABELS.length)
    ] ?? CAOZY_LABELS[0];

  caozyLabelCache.set(key, label);

  return label;
}

function subscribeCaozyLabel() {
  return () => {};
}

function getServerCaozyLabel() {
  return CAOZY_LABELS[0];
}

export default function GBU({ banners }: GBUProps) {
  const leftBanner = banners[0];
  const rightBanner = banners[1];

  const [copied, setCopied] = useState(false);

  const caozyLabel = useSyncExternalStore(
    subscribeCaozyLabel,
    getCaozyLabel,
    getServerCaozyLabel,
  );

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(ADDRESS);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Ignore clipboard errors.
    }
  }

  return (
    <div
      className="min-h-dvh w-full"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--text-high-emphasis)",
      }}
    >
      {/* =====================================================
          DESKTOP BANNERS
          ===================================================== */}

      {/* Left desktop banner */}
      <motion.div
        variants={itemVariants}
        className="fixed left-0 z-20 hidden items-center justify-center xl:flex"
        style={{
          top: "var(--section-padding-y)",
          bottom: "var(--section-padding-y)",
          width:
            "calc((100vw - 520px - (2 * var(--space-8))) / 2)",
          padding: "var(--space-4)",
        }}
      >
        <div className="relative w-full max-h-full aspect-[3/5]">
          <AdsBanner
            slotId="desktop-left"
            banner={leftBanner}
            sizes="calc((100vw - 520px) / 2)"
          />
        </div>
      </motion.div>

      {/* Right desktop banner */}
      <motion.div
        variants={itemVariants}
        className="fixed right-0 z-20 hidden items-center justify-center xl:flex"
        style={{
          top: "var(--section-padding-y)",
          bottom: "var(--section-padding-y)",
          width:
            "calc((100vw - 520px - (2 * var(--space-8))) / 2)",
          padding: "var(--space-4)",
        }}
      >
        <div className="relative w-full max-h-full aspect-[3/5]">
          <AdsBanner
            slotId="desktop-right"
            banner={rightBanner}
            sizes="calc((100vw - 520px) / 2)"
          />
        </div>
      </motion.div>

      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col"
        style={{
          paddingBlock: "var(--section-padding-y)",
        }}
      >
        {/* Content with horizontal padding */}
        <div className="px-6 sm:px-8">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                border:
                  "1px solid rgba(var(--color-primary-rgb), 0.16)",
                boxShadow:
                  "0 8px 24px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.12)",
                padding: "10px",
              }}
            >
              <Image
                src="/gbu/logo.svg"
                alt="GBU CENTER"
                width={72}
                height={72}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Profile */}
          <motion.div
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <h1
              translate="no"
              className="notranslate text-2xl font-semibold tracking-tight"
              style={{
                color: "var(--text-heading)",
              }}
            >
              GBU CENTER
            </h1>

            <p
              className="mt-2 text-sm"
              style={{
                color: "var(--text-medium-emphasis)",
              }}
            >
              ATK • Print • Fotokopi • PPOB
            </p>
          </motion.div>
        </div>

        {/* Services — full container width */}
        <motion.section
          variants={itemVariants}
          className="mt-8 w-full"
        >
          <div className="grid w-full grid-cols-2 gap-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="w-full min-w-0"
                  style={{
                    borderRadius: "var(--radius-card)",
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "var(--shadow-base)",
                    padding: "var(--card-padding)",
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor:
                        "var(--color-primary-subtle)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.7}
                    />
                  </div>

                  <p
                    className="mt-4 text-sm font-medium"
                    style={{
                      color: "var(--text-high-emphasis)",
                    }}
                  >
                    {service.title}
                  </p>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Content with horizontal padding */}
        <div className="px-6 sm:px-8">
          {/* Address */}
          <motion.button
            variants={itemVariants}
            type="button"
            onClick={handleCopyAddress}
            className="mt-8 w-full text-left"
            style={{
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              boxShadow: "var(--shadow-base)",
              padding: "var(--card-padding)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex shrink-0 items-center justify-center"
                style={{
                  width: "var(--icon-xl)",
                  height: "var(--icon-xl)",
                  color: "var(--color-primary)",
                }}
              >
                <MapPin
                  size={24}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="text-sm leading-6"
                  style={{
                    color: "var(--text-medium-emphasis)",
                  }}
                >
                  {ADDRESS}
                </p>
              </div>

              <Copy
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
                style={{
                  color: "var(--text-muted)",
                }}
              />
            </div>
          </motion.button>

          {/* Google Maps */}
          <motion.a
            variants={itemVariants}
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 block overflow-hidden"
            style={{
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              boxShadow: "var(--shadow-base)",
            }}
          >
            <div
              className="relative aspect-video w-full overflow-hidden"
              style={{
                backgroundColor:
                  "var(--color-surface-elevated)",
              }}
            >
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                title="Lokasi GBU CENTER Bulak"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div
              className="flex items-center justify-between gap-4"
              style={{
                padding: "var(--card-padding)",
              }}
            >
              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: "var(--text-high-emphasis)",
                  }}
                >
                  Google Maps
                </p>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  Lihat lokasi di Google Maps
                </p>
              </div>

              <ExternalLink
                size={24}
                style={{
                  color: "var(--text-muted)",
                }}
              />
            </div>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            variants={itemVariants}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi GBU CENTER melalui WhatsApp"
            className="mt-4 flex w-full items-center justify-center gap-2"
            style={{
              minHeight: "var(--button-height)",
              borderRadius: "var(--radius-button)",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              paddingInline: "var(--button-padding-x)",
              paddingBlock: "var(--button-padding-y)",
              boxShadow: "var(--shadow-base)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle
              size={20}
              strokeWidth={2}
            />

            <span className="text-sm font-medium">
              WhatsApp
            </span>
          </motion.a>

          {/* Separator */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
            style={{
              marginBlock: "var(--space-10)",
            }}
            aria-hidden="true"
          >
            <div
              className="h-px flex-1"
              style={{
                backgroundColor: "var(--color-border)",
              }}
            />

            <div
              className="h-1 w-1 shrink-0 rounded-full"
              style={{
                backgroundColor: "var(--color-secondary)",
              }}
            />

            <div
              className="h-px flex-1"
              style={{
                backgroundColor: "var(--color-border)",
              }}
            />
          </motion.div>

          {/* Caozy */}
          <motion.a
            variants={itemVariants}
            href={GRABFOOD_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pesan Caozy melalui GrabFood"
            className="flex w-full items-center justify-center"
            style={{
              minHeight: "var(--button-height)",
              borderRadius: "var(--radius-button)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: "var(--text-high-emphasis)",
              paddingInline: "var(--button-padding-x)",
              paddingBlock: "var(--button-padding-y)",
              boxShadow: "var(--shadow-base)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              translate="no"
              className="notranslate text-sm font-medium"
            >
              {caozyLabel}
            </span>
          </motion.a>

          {/* =================================================
              MOBILE / TABLET BANNER
              1:1 — random Affiliate / AdSense
              ================================================= */}

          <motion.div
            variants={itemVariants}
            className="mt-10 block w-full overflow-hidden xl:hidden"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <AdsBanner
                slotId="mobile"
                banner={leftBanner}
                sizes="100vw"
              />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="mt-10 pb-1 text-center"
          >
            <a
              href={POWERED_BY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-opacity duration-[var(--duration-normal)] hover:opacity-70"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Powered by Hirakada
            </a>
          </motion.footer>
        </div>
      </motion.main>

      {/* Copy toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
          >
            <div
              className="flex items-center gap-2"
              style={{
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                backgroundColor:
                  "var(--color-surface-elevated)",
                color: "var(--text-high-emphasis)",
                paddingInline: "var(--space-4)",
                paddingBlock: "var(--space-2)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <Check size={16} />

              <span className="text-sm">
                Alamat disalin
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}