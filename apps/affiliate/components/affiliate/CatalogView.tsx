import type {
  AffiliateProduct,
  Category,
  Marketplace,
  Subcategory,
} from "@/types/affiliate";

import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

export default function CatalogView({
  products,
  categories,
  subcategories,
  marketplaces,
  activeCategorySlug,
  activeSubcategorySlug,
  title,
}: {
  products: AffiliateProduct[];
  categories: Category[];
  subcategories: Subcategory[];
  marketplaces: Marketplace[];
  activeCategorySlug?: string;
  activeSubcategorySlug?: string;
  title: string;
}) {
  return (
    <section
      id="products"
      className="items-stretch! px-4! py-8! sm:px-6! md:py-12! lg:px-8! xl:px-10!"
    >
      <div className="mx-auto flex w-full max-w-(--container-width) flex-col gap-6 lg:flex-row lg:gap-8">
        <ProductFilters
          categories={categories}
          subcategories={subcategories}
          marketplaces={marketplaces}
          {...(activeCategorySlug
            ? { activeCategorySlug }
            : {})}
          {...(activeSubcategorySlug
            ? { activeSubcategorySlug }
            : {})}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {title}
              </h2>

              <p className="mt-1 text-sm text-(--text-muted)">
                {products.length
                  ? `${products.length} curated result${
                      products.length === 1 ? "" : "s"
                    }`
                  : "No products found"}
              </p>
            </div>
          </div>

          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-xl border border-dashed border-(--color-border) p-8 text-center sm:p-12">
              <h3 className="text-lg font-semibold">
                No products found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--text-medium-emphasis)">
                Try another keyword or browse our categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}