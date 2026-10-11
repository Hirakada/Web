"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const REVALIDATE_AFTER = 5 * 60 * 1000;

export function RefreshOnFocus() {
  const router = useRouter();
  const lastRefreshAt = useRef(0);

  useEffect(() => {
    lastRefreshAt.current = Date.now();

    function refreshIfStale() {
      if (
        document.visibilityState !== "visible" ||
        Date.now() - lastRefreshAt.current < REVALIDATE_AFTER
      ) {
        return;
      }

      lastRefreshAt.current = Date.now();
      router.refresh();
    }

    window.addEventListener("focus", refreshIfStale);
    window.addEventListener("pageshow", refreshIfStale);
    document.addEventListener("visibilitychange", refreshIfStale);

    return () => {
      window.removeEventListener("focus", refreshIfStale);
      window.removeEventListener("pageshow", refreshIfStale);
      document.removeEventListener("visibilitychange", refreshIfStale);
    };
  }, [router]);

  return null;
}
