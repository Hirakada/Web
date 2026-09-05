import type { AffiliateProduct } from "./types";

export const POPUP_INTERVAL =
  5 * 60 * 1000;

const SESSION_KEY =
  "hirakada-affiliate-session";

const LEASE_KEY =
  "hirakada-affiliate-popup-lease";

const SESSION_TTL =
  24 * 60 * 60 * 1000;

const LEASE_TTL =
  5_000;

export interface AffiliateSession {
  lastPopupAt: number;
  shownProductIds: string[];
  updatedAt: number;
}

interface PopupLease {
  owner: string;
  expiresAt: number;
}

function canUseStorage() {
  return typeof window !== "undefined";
}

export function readAffiliateSession():
  AffiliateSession | null {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const raw =
      window.localStorage.getItem(
        SESSION_KEY,
      );

    if (!raw) {
      return null;
    }

    const session =
      JSON.parse(raw) as AffiliateSession;

    if (
      !Number.isFinite(
        session.lastPopupAt,
      ) ||
      !Number.isFinite(
        session.updatedAt,
      ) ||
      !Array.isArray(
        session.shownProductIds,
      )
    ) {
      window.localStorage.removeItem(
        SESSION_KEY,
      );

      return null;
    }

    if (
      Date.now() - session.updatedAt >
      SESSION_TTL
    ) {
      window.localStorage.removeItem(
        SESSION_KEY,
      );

      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function writeAffiliateSession(
  session: AffiliateSession,
) {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session),
    );
  } catch {
    // Affiliate state is optional.
  }
}

export function claimPopupLease() {
  if (!canUseStorage()) {
    return false;
  }

  const owner =
    `${Date.now()}-${Math.random()}`;

  try {
    const raw =
      window.localStorage.getItem(
        LEASE_KEY,
      );

    if (raw) {
      const current =
        JSON.parse(raw) as PopupLease;

      if (
        current.expiresAt >
        Date.now()
      ) {
        return false;
      }
    }

    const lease: PopupLease = {
      owner,
      expiresAt:
        Date.now() + LEASE_TTL,
    };

    window.localStorage.setItem(
      LEASE_KEY,
      JSON.stringify(lease),
    );

    const stored =
      JSON.parse(
        window.localStorage.getItem(
          LEASE_KEY,
        ) ?? "null",
      ) as PopupLease | null;

    return stored?.owner === owner;
  } catch {
    return false;
  }
}

export function releasePopupLease() {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(
      LEASE_KEY,
    );
  } catch {
    // Affiliate state is optional.
  }
}

export function selectAffiliateProduct(
  products: AffiliateProduct[],
  shownProductIds: string[],
) {
  const activeProducts =
    products.filter(
      (product) =>
        Boolean(product.affiliateUrl),
    );

  if (activeProducts.length === 0) {
    return null;
  }

  const shown =
    new Set(shownProductIds);

  let available =
    activeProducts.filter(
      (product) =>
        !shown.has(product.id),
    );

  /*
   * Every active product has already
   * appeared. Start a new cycle.
   */
  if (available.length === 0) {
    available = activeProducts;
  }

  /*
   * Seller weighting:
   *
   * Mall   = 5
   * Star+  = 3
   * Star   = 1
   */
  const weightedProducts =
    available.flatMap((product) => {
      const weight =
        product.sellerLevel === "Mall"
          ? 5
          : product.sellerLevel === "Star+"
            ? 3
            : 1;

      return Array.from(
        { length: weight },
        () => product,
      );
    });

  return (
    weightedProducts[
      Math.floor(
        Math.random() *
          weightedProducts.length,
      )
    ] ?? null
  );
}