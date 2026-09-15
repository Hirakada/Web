import type { Metadata } from "next";

import AffiliateHero from "@/components/affiliate/AffiliateHero";
import CategoryNavigation from "@/components/affiliate/CategoryNavigation";
import CatalogView from "@/components/affiliate/CatalogView";
import { createClient } from "@/lib/Supabase/server";
import {
  getCategories,
  getMarketplaces,
  getProducts,
} from "@/lib/Supabase/queries";
import type { SortMode } from "@/types/affiliate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Affiliate Picks",
  description: "Curated products worth checking out.",
};

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const q = first(params.q)?.trim() ?? "";
  const sort = (first(params.sort) ?? "recommended") as SortMode;
  const marketplace = first(params.marketplace) ?? "";

  const supabase = await createClient();

  const [categories, marketplaces, products] = await Promise.all([
    getCategories(supabase),
    getMarketplaces(supabase),
    getProducts(supabase, {
      search: q,
      ...(marketplace ? { marketplaceSlug: marketplace } : {}),
      sort,
      limit: 24,
    }),
  ]);

  return (
    <>
      <AffiliateHero />

      <section className="items-stretch! px-4! py-0! sm:px-6! lg:px-8! xl:px-10!">
        <div className="mx-auto w-full max-w-(--container-width)">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold">
              Browse categories
            </h2>
          </div>

          <CategoryNavigation categories={categories} />
        </div>
      </section>

      <CatalogView
        title={
          q
            ? `Search results for “${q}”`
            : "All Products"
        }
        products={products}
        categories={categories}
        subcategories={[]}
        marketplaces={marketplaces}
      />
    </>
  );
}