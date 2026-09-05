"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardTitle,
} from "@hirakada/ui";

import type { AffiliateProduct } from "./types";

interface AffiliatePopupProps {
  product: AffiliateProduct | null;
  onClose: () => void;
}

export default function AffiliatePopup({
  product,
  onClose,
}: AffiliatePopupProps) {
  const [
    failedImageProductId,
    setFailedImageProductId,
  ] = useState<string | null>(null);

  const imageAvailable =
    Boolean(product?.productImage) &&
    failedImageProductId !== product?.id;

  const openAffiliateLink = () => {
    if (!product) return;

    window.open(
      product.affiliateUrl,
      "_blank",
      "noopener,noreferrer",
    );

    onClose();
  };

  const activateWithKeyboard = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openAffiliateLink();
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key={product.id}
          initial={{
            opacity: 0,
            y: 12,
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
            duration: 0.24,
            ease: "easeOut",
          }}
          className="
            fixed
            right-12
            bottom-[calc(1rem+env(safe-area-inset-bottom))]
            z-40
            w-[calc(100vw-2rem)]
            max-w-95
          "
        >
          <Card
            role="button"
            tabIndex={0}
            aria-label={`Open affiliate product: ${product.productName}`}
            onClick={openAffiliateLink}
            onKeyDown={activateWithKeyboard}
            className="relative cursor-pointer overflow-hidden"
          >
            <button
              type="button"
              aria-label="Close affiliate promotion"
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              className="
                absolute
                top-1
                right-1
                z-10
                flex
                min-h-11
                min-w-11
                items-center
                justify-center
                rounded-full
                text-(--text-medium-emphasis)
                transition-colors
                hover:bg-(--color-background)
                hover:text-(--color-on-background)
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-(--color-border-strong)
              "
            >
              <X
                size={16}
                aria-hidden="true"
              />
            </button>

            {imageAvailable ? (
              <Image
                src={product.productImage!}
                alt=""
                width={380}
                height={380}
                sizes="
                  (max-width: 380px)
                  calc(100vw - 32px),
                  380px
                "
                className="
                  aspect-square
                  h-auto
                  w-full
                  object-cover
                "
                onError={() =>
                  setFailedImageProductId(
                    product.id,
                  )
                }
              />
            ) : (
              <div
                className="
                  flex
                  aspect-square
                  w-full
                  items-center
                  justify-center
                  bg-(--color-background)
                  text-(--color-medium-emphasis)
                "
              >
                <ShoppingBag
                  size={32}
                  aria-hidden="true"
                />
              </div>
            )}

            <CardContent
              className="
                gap-1
                p-4
                pr-12
              "
            >
              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.08em]
                  text-(--text-medium-emphasis)
                "
              >
                {product.category ??
                  "Featured product"}
              </span>

              <CardTitle className="line-clamp-2 text-base">
                {product.productName}
              </CardTitle>

              <span
                className="
                  text-xs
                  text-(--text-medium-emphasis)
                "
              >
                {product.sellerLevel} seller
              </span>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}