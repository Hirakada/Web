"use client";

import { useEffect, useRef, useState } from "react";

import { createClient } from "@/lib/Supabase/client";

import AffiliatePopup from "./AffiliatePopup";
import {
  POPUP_INTERVAL,
  claimPopupLease,
  readAffiliateSession,
  releasePopupLease,
  selectAffiliateProduct,
  writeAffiliateSession,
} from "./affiliateSession";
import type {
  AffiliateProduct,
  AffiliateSellerLevel,
} from "./types";

const RETRY_INTERVAL = 60_000;

interface AffiliateProductRow {
  id: string;
  product_name: string;
  category: string | null;
  affiliate_url: string;
  product_image: string | null;
  seller_level: string;
  priority: number | null;
}

export default function AffiliateProvider() {
  const [product, setProduct] =
    useState<AffiliateProduct | null>(null);

  const timeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    let mounted = true;

    const clearTimer = () => {
      if (!timeoutRef.current) return;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

    const schedule = (
      delay: number,
      callback: () => void,
    ) => {
      clearTimer();

      timeoutRef.current =
        setTimeout(() => {
          if (!mounted) return;

          timeoutRef.current = null;
          callback();
        }, Math.max(0, delay));
    };

    const showNextProduct = (
      products: AffiliateProduct[],
    ) => {
      if (!mounted || products.length === 0) {
        return;
      }

      const session = readAffiliateSession();
      const now = Date.now();

      /*
       * FIRST VISIT
       *
       * No session means the user has never
       * seen an affiliate popup in this origin.
       *
       * Therefore show immediately.
       */
      if (session) {
        const elapsed =
          now - session.lastPopupAt;

        const remaining =
          POPUP_INTERVAL - elapsed;

        /*
         * The previous popup is still inside
         * its 5-minute cooldown.
         */
        if (remaining > 0) {
          schedule(
            remaining,
            () => showNextProduct(products),
          );

          return;
        }
      }

      /*
       * Prevent multiple AffiliateProvider
       * instances/tabs from displaying the
       * popup simultaneously.
       */
      if (!claimPopupLease()) {
        schedule(
          RETRY_INTERVAL,
          () => showNextProduct(products),
        );

        return;
      }

      try {
        const shownProductIds =
          session?.shownProductIds ?? [];

        const nextProduct =
          selectAffiliateProduct(
            products,
            shownProductIds,
          );

        if (!nextProduct) {
          releasePopupLease();

          schedule(
            RETRY_INTERVAL,
            () => showNextProduct(products),
          );

          return;
        }

        const activeIds = new Set(
          products.map((item) => item.id),
        );

        /*
         * Remove IDs that are no longer active
         * in the database.
         */
        const validShownIds =
          shownProductIds.filter((id) =>
            activeIds.has(id),
          );

        const nextShownIds =
          validShownIds.includes(nextProduct.id)
            ? validShownIds
            : [
                ...validShownIds,
                nextProduct.id,
              ];

        /*
         * All currently active products have
         * now been shown.
         *
         * Start a new cycle after this popup.
         */
        const cycleCompleted =
          nextShownIds.length >= activeIds.size;

        writeAffiliateSession({
          lastPopupAt: now,
          shownProductIds: cycleCompleted
            ? []
            : nextShownIds,
          updatedAt: now,
        });

        /*
         * Display popup immediately.
         */
        setProduct(nextProduct);

        /*
         * Schedule next popup exactly 5 minutes
         * after the current popup was displayed.
         */
        schedule(
          POPUP_INTERVAL,
          () => showNextProduct(products),
        );
      } finally {
        releasePopupLease();
      }
    };

    const loadProducts = async () => {
      try {
        const { data, error } =
          await createClient()
            .from("affiliate_products")
            .select(
              [
                "id",
                "product_name",
                "category",
                "affiliate_url",
                "product_image",
                "seller_level",
                "priority",
              ].join(", "),
            )
            .eq("active", true)
            .order("priority", {
              ascending: false,
            });

        if (error) {
          throw error;
        }

        const products: AffiliateProduct[] =
          ((data ?? []) as AffiliateProductRow[])
            .map((item) => ({
              id: item.id,
              productName: item.product_name,
              category: item.category,
              affiliateUrl: item.affiliate_url,
              productImage: item.product_image,
              sellerLevel:
                item.seller_level as AffiliateSellerLevel,
              priority: item.priority,
            }))
            .filter(
              (item) =>
                Boolean(item.affiliateUrl),
            );

        if (!mounted) return;

        if (products.length > 0) {
          /*
           * This immediately evaluates the
           * session state.
           *
           * No session = popup immediately.
           */
          showNextProduct(products);
        }
      } catch (error) {
        console.error(
          "Affiliate products could not be loaded",
          error,
        );

        if (mounted) {
          schedule(
            RETRY_INTERVAL,
            loadProducts,
          );
        }
      }
    };

    /*
     * Load products immediately when the
     * provider mounts.
     */
    void loadProducts();

    /*
     * Synchronize other tabs/windows using
     * the same origin.
     */
    const handleStorage = (
      event: StorageEvent,
    ) => {
      if (
        event.key !==
        "hirakada-affiliate-session"
      ) {
        return;
      }

      const session =
        readAffiliateSession();

      if (!session) return;

      /*
       * Another tab has displayed a popup.
       * Hide ours and follow the shared timer.
       */
      setProduct(null);

      const remaining =
        POPUP_INTERVAL -
        (Date.now() - session.lastPopupAt);

      if (remaining > 0) {
        schedule(
          remaining,
          () => {
            void loadProducts();
          },
        );
      } else {
        void loadProducts();
      }
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    return () => {
      mounted = false;

      clearTimer();

      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  return (
    <AffiliatePopup
      product={product}
      onClose={() => setProduct(null)}
    />
  );
}