import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@hirakada/ui";
import type { AffiliateProduct } from "@/types/affiliate";

export default function ProductCard({ product }: { product: AffiliateProduct }) {
  return (
    <Card className="h-full">
      <Link href={`/product/${product.slug}`} className="flex h-full flex-col focus:outline-none">
        <div className="relative aspect-square w-full overflow-hidden bg-(--color-surface-elevated)">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-2 flex flex-wrap gap-1.5 text-[11px] uppercase tracking-wide text-(--text-muted)">
            <span>{product.category.name}</span><span aria-hidden>·</span><span>{product.subcategory.name}</span>
          </div>
          <h3 className="text-base font-semibold sm:text-lg">{product.name}</h3>
          {product.description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-(--text-medium-emphasis)">{product.description}</p>}
          <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-(--text-high-emphasis)">
            View Product <ArrowUpRight size={16} aria-hidden />
          </span>
        </div>
      </Link>
    </Card>
  );
}
