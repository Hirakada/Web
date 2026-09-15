import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CategoryNavigation from "@/components/affiliate/CategoryNavigation";
import CatalogView from "@/components/affiliate/CatalogView";
import { createClient } from "@/lib/Supabase/server";
import { getCategories, getCategoryBySlug, getMarketplaces, getProducts, getSubcategories } from "@/lib/Supabase/queries";
import type { SortMode } from "@/types/affiliate";

export const dynamic = "force-dynamic";

type Params = Promise<{ category: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params;
  const supabase = await createClient();
  const category = await getCategoryBySlug(supabase, slug);
  return category
    ? { title: `${category.name} — Affiliate`, description: category.description ?? `Curated ${category.name.toLowerCase()} products.` }
    : { title: "Category not found" };
}

export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { category: slug } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  const category = await getCategoryBySlug(supabase, slug);
  if (!category) notFound();

  const q = first(query.q)?.trim() ?? "";
  const marketplace = first(query.marketplace) ?? "";
  const sort = (first(query.sort) ?? "recommended") as SortMode;
  const [categories, subcategories, marketplaces, products] = await Promise.all([
    getCategories(supabase),
    getSubcategories(supabase, category.id),
    getMarketplaces(supabase),
    getProducts(supabase, {
      categorySlug: slug,
      search: q,
      ...(marketplace ? { marketplaceSlug: marketplace } : {}),
      sort,
      limit: 24,
    }),
  ]);

  return (
    <>
      <section className="items-stretch! px-4! py-8! sm:!px-6 md:!py-12 lg:!px-8 xl:!px-10">
        <div className="mx-auto w-full max-w-(--container-width)">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-(--text-muted)"><a href="/" className="hover:text-[var(--text-high-emphasis)]">Products</a> <span aria-hidden>/</span> {category.name}</nav>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{category.name}</h1>
          {category.description && <p className="mt-3 max-w-2xl text-sm leading-6 text-(--text-medium-emphasis)">{category.description}</p>}
          <div className="mt-6"><CategoryNavigation categories={categories} activeSlug={slug} /></div>
        </div>
      </section>
      <CatalogView title={q ? `Search results for “${q}”` : category.name} products={products} categories={categories} subcategories={subcategories} marketplaces={marketplaces} activeCategorySlug={slug} />
    </>
  );
}
