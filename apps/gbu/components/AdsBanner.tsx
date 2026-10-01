"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import type { AffiliateBanner } from "@/lib/Supabase/affiliate/affiliate";

type AdsBannerProps =
  | {
      type: "affiliate";
      banner: AffiliateBanner;
      sizes?: string;
    }
  | {
      type: "adsense";
    };

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const ADSENSE_CLIENT = "ca-pub-8870847030549850";
const ADSENSE_SLOT = "2668088953";

export default function AdsBanner(props: AdsBannerProps) {
  if (props.type === "affiliate") {
    return (
      <a
        href={props.banner.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Lihat produk"
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
            src={props.banner.imageUrl}
            alt=""
            fill
            sizes={props.sizes ?? "100vw"}
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

  return <AdSenseBanner />;
}

function AdSenseBanner() {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // Ignore AdSense initialization errors.
    }
  }, []);

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