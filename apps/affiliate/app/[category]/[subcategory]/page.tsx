import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CatalogView from "@/components/affiliate/CatalogView";
import { createClient } from "@/lib/Supabase/server";
import {
  getCategories,
  getCategoryBySlug,
  getMarketplaces,
  getProducts,
  getSubcategories,
  getSubcategoryBySlug,
} from "@/lib/Supabase/queries";
import type { SortMode } from "@/types/affiliate";

type Params = Promise<{
  category: string;
  subcategory: string;
}>;

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
  } = await params;

  const supabase = await createClient();

  const subcategory = await getSubcategoryBySlug(
    supabase,
    categorySlug,
    subcategorySlug,
  );

  return subcategory
    ? {
        title: `${subcategory.name} — Affiliate`,
        description:
          subcategory.description ??
          `Curated ${subcategory.name.toLowerCase()} products.`,
      }
    : {
        title: "Subcategory not found",
      };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
  } = await params;

  const query = await searchParams;
  const supabase = await createClient();

  const category = await getCategoryBySlug(
    supabase,
    categorySlug,
  );

  const subcategory = await getSubcategoryBySlug(
    supabase,
    categorySlug,
    subcategorySlug,
  );

  if (!category || !subcategory) {
    notFound();
  }

  const q = first(query.q)?.trim() ?? "";
  const marketplace = first(query.marketplace) ?? "";
  const sort = (first(query.sort) ??
    "recommended") as SortMode;

  const [
    categories,
    subcategories,
    marketplaces,
    products,
  ] = await Promise.all([
    getCategories(supabase),
    getSubcategories(supabase, category.id),
    getMarketplaces(supabase),
    getProducts(supabase, {
      categorySlug,
      subcategorySlug,
      search: q,
      ...(marketplace
        ? { marketplaceSlug: marketplace }
        : {}),
      sort,
      limit: 24,
    }),
  ]);

  return (
    <>
      <section className="items-stretch! px-4! py-8! sm:px-6! md:py-12! lg:px-8! xl:px-10!">
        <div className="mx-auto w-full max-w-(--container-width)">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap gap-2 text-xs text-(--text-muted)"
          >
            <Link
              href="/"
              className="hover:text-(--text-high-emphasis)"
            >
              Products
            </Link>

            <span aria-hidden>/</span>

            <Link
              href={`/${category.slug}`}
              className="hover:text-(--text-high-emphasis)"
            >
              {category.name}
            </Link>

            <span aria-hidden>/</span>

            <span>{subcategory.name}</span>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {subcategory.name}
          </h1>

          {subcategory.description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-(--text-medium-emphasis)">
              {subcategory.description}
            </p>
          )}
        </div>
      </section>

      <CatalogView
        title={
          q
            ? `Search results for “${q}”`
            : subcategory.name
        }
        products={products}
        categories={categories}
        subcategories={subcategories}
        marketplaces={marketplaces}
        activeCategorySlug={categorySlug}
        activeSubcategorySlug={subcategorySlug}
      />
    </>
  );
}