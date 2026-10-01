"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";

import type { AffiliateBanner } from "@/lib/Supabase/affiliate/affiliate";

type BannerType = "affiliate" | "adsense";

type AdsBannerProps = {
  slotId: string;
  banner?: AffiliateBanner | undefined;
  sizes?: string;
};

const clientBannerTypes = new Map<string, BannerType>();

function getBannerType(slotId: string): BannerType {
  const existing = clientBannerTypes.get(slotId);

  if (existing) {
    return existing;
  }

  const type: BannerType =
    Math.random() < 0.5 ? "affiliate" : "adsense";

  clientBannerTypes.set(slotId, type);

  return type;
}

function subscribe() {
  return () => {};
}

/*
 * Server snapshot must be deterministic.
 *
 * During hydration React uses this value first,
 * then switches to the client snapshot after hydration.
 */
function getServerBannerType(): BannerType {
  return "affiliate";
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const ADSENSE_CLIENT = "ca-pub-8870847030549850";
const ADSENSE_SLOT = "2668088953";

export default function AdsBanner({
  slotId,
  banner,
  sizes = "100vw",
}: AdsBannerProps) {
  const type = useSyncExternalStore(
    subscribe,
    () => getBannerType(slotId),
    getServerBannerType,
  );

  useEffect(() => {
    if (type !== "adsense") {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore AdSense initialization errors.
    }
  }, [type]);

  /*
   * Affiliate
   */
  if (type === "affiliate" && banner) {
    return (
      <a
        href={banner.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Lihat produk di Shopee"
        className="block h-full w-full"
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            boxShadow: "var(--shadow-base)",
          }}
        >
          <Image
            src={banner.imageUrl}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-opacity duration-[var(--duration-normal)] hover:opacity-90"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundColor:
                "rgba(var(--color-background-rgb), 0.42)",
            }}
          />
        </div>
      </a>
    );
  }

  /*
   * AdSense
   *
   * Same AdSense configuration is used for both:
   * - Desktop vertical banner
   * - Mobile/tablet 1:1 banner
   */
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--shadow-base)",
      }}
    >
      <ins
        className="adsbygoogle block h-full w-full"
        style={{
          display: "block",
        }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}