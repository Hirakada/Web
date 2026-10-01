"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { AffiliateBanner } from "@/lib/Supabase/affiliate/affiliate";

type AdsBannerProps = {
  slotId: string;
  banner?: AffiliateBanner | undefined;
  sizes?: string;
};

type BannerState = "adsense" | "affiliate";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_GBU_ADSENSE_CLIENT!;
const ADSENSE_SLOT = process.env.NEXT_PUBLIC_GBU_ADSENSE_SLOT!;
const ADSENSE_FILL_TIMEOUT = 8_000;
const initializedSlots = new WeakSet<HTMLElement>();

export default function AdsBanner({
  slotId,
  banner,
  sizes = "100vw",
}: AdsBannerProps) {
  const [state, setState] = useState<BannerState>("adsense");
  const adSlotRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const adSlot = adSlotRef.current;

    if (!adSlot) {
      return;
    }

    let active = true;

    const clearChecks = () => {
      window.clearTimeout(timeout);
      observer.disconnect();
      script?.removeEventListener("error", fallbackToAffiliate);
    };

    const fallbackToAffiliate = () => {
      if (!active) {
        return;
      }

      active = false;
      clearChecks();
      setState("affiliate");
    };

    const observer = new MutationObserver(() => {
      const status = adSlot.getAttribute("data-ad-status");

      if (status === "filled") {
        active = false;
        clearChecks();
      } else if (status === "unfilled") {
        fallbackToAffiliate();
      }
    });

    observer.observe(adSlot, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });

    const script = document.querySelector<HTMLScriptElement>(
      `script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"]`,
    );
    script?.addEventListener("error", fallbackToAffiliate);

    const timeout = window.setTimeout(
      fallbackToAffiliate,
      ADSENSE_FILL_TIMEOUT,
    );

    if (!initializedSlots.has(adSlot)) {
      initializedSlots.add(adSlot);

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch {
        queueMicrotask(fallbackToAffiliate);
      }
    }

    return () => {
      active = false;
      clearChecks();
    };
  }, [slotId]);

  if (state === "affiliate") {
    if (!banner) {
      return null;
    }

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
        ref={adSlotRef}
        data-banner-slot={slotId}
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
