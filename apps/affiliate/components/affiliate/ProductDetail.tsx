import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@hirakada/ui";
import type { AffiliateProduct } from "@/types/affiliate";

export default function ProductDetail({
  product,
}: {
  product: AffiliateProduct;
}) {
  return (
    <article className="mx-auto grid w-full max-w-(--container-width) gap-8 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-12 lg:px-8 xl:px-10">
      {/* Product Media */}
      <div className="relative aspect-square overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-surface)">
        {product.videoUrl ? (
          <video
            src={product.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            className="h-full w-full object-cover"
            aria-label={product.name}
          />
        ) : (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col justify-center">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-(--text-muted)"
        >
          <Link
            href="/"
            className="hover:text-(--text-high-emphasis)"
          >
            Products
          </Link>

          <span aria-hidden>/</span>

          <Link
            href={`/${product.category.slug}`}
            className="hover:text-(--text-high-emphasis)"
          >
            {product.category.name}
          </Link>

          <span aria-hidden>/</span>

          <Link
            href={`/${product.category.slug}/${product.subcategory.slug}`}
            className="hover:text-(--text-high-emphasis)"
          >
            {product.subcategory.name}
          </Link>
        </nav>

        <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
          {product.category.name} · {product.subcategory.name}
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.name}
        </h1>

        {product.description && (
          <p className="mt-5 max-w-2xl text-base leading-7 text-(--text-medium-emphasis)">
            {product.description}
          </p>
        )}

        <div className="mt-8">
          <h2 className="text-sm font-semibold">Available at</h2>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {product.marketplaces.map((link) => (
              <Button
                key={link.id}
                asChild
                className="min-h-11 w-full sm:w-auto"
              >
                <a
                  href={link.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.marketplace.name}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </Button>
            ))}
          </div>

          {!product.marketplaces.length && (
            <p className="mt-3 text-sm text-(--text-muted)">
              No marketplace link is currently available.
            </p>
          )}
        </div>

        <p className="mt-8 text-xs leading-5 text-(--text-muted)">
          Some links on this website are affiliate links. We may earn a
          commission when you make a purchase through them, at no additional
          cost to you.
        </p>
      </div>
    </article>
  );
}