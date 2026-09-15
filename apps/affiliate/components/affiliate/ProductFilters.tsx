"use client";

import Link from "next/link";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { Category, Marketplace, Subcategory } from "@/types/affiliate";

export default function ProductFilters({
  categories,
  subcategories,
  marketplaces,
  activeCategorySlug,
  activeSubcategorySlug,
}: {
  categories: Category[];
  subcategories: Subcategory[];
  marketplaces: Marketplace[];
  activeCategorySlug?: string;
  activeSubcategorySlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const marketplace = searchParams.get("marketplace") ?? "";
  const sort = searchParams.get("sort") ?? "recommended";

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "recommended") params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}${params.toString() ? `?${params}` : ""}`);
    setOpen(false);
  }

  function reset() {
    const q = searchParams.get("q");
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    router.push(`${pathname}${params.toString() ? `?${params}` : ""}`);
    setOpen(false);
  }

  const controls = (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">Categories</h2>
          {(activeCategorySlug || activeSubcategorySlug || marketplace || sort !== "recommended") && (
            <button type="button" onClick={reset} className="text-xs text-(--text-medium-emphasis)r:text-[var(--text-high-emphasis)]">Reset</button>
          )}
        </div>
        <div className="space-y-1">
          <Link href={`/${searchParams.get("q") ? `?q=${encodeURIComponent(searchParams.get("q")!)}` : ""}`} className={`block rounded-lg px-3 py-2 text-sm ${!activeCategorySlug ? "bg-[var(--color-primary-subtle)] text-[var(--text-high-emphasis)]" : "text-[var(--text-medium-emphasis)] hover:bg-[var(--color-primary-subtle)]"}`}>All products</Link>
          {categories.map((category) => (
            <div key={category.id}>
              <Link href={`/${category.slug}${searchParams.toString() ? `?${searchParams}` : ""}`} className={`block rounded-lg px-3 py-2 text-sm ${activeCategorySlug === category.slug ? "bg-(--color-primary-subtle) text-(--text-high-emphasis)" : "text-(--text-medium-emphasis) hover:bg-(--color-primary-subtle)"}`}>
                {category.name}
              </Link>
              {activeCategorySlug === category.slug && subcategories.length > 0 && (
                <div className="ml-3 mt-1 border-l border-(--color-border) pl-2">
                  {subcategories.map((subcategory) => (
                    <Link key={subcategory.id} href={`/${category.slug}/${subcategory.slug}${searchParams.toString() ? `?${searchParams}` : ""}`} className={`block rounded-md px-3 py-1.5 text-sm ${activeSubcategorySlug === subcategory.slug ? "text-(--text-high-emphasis)" : "text-(--text-muted) hover:text-(--text-high-emphasis)"}`}>
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="affiliate-marketplace" className="mb-3 block text-xs font-semibold uppercase tracking-wider text-(--text-muted)">Marketplace</label>
        <select id="affiliate-marketplace" value={marketplace} onChange={(event) => updateParam("marketplace", event.target.value)} className="min-h-11 w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3 text-sm outline-none focus:border-(--color-border-strong)">
          <option value="">All marketplaces</option>
          {marketplaces.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="affiliate-sort" className="mb-3 block text-xs font-semibold uppercase tracking-wider text-(--text-muted)">Sort</label>
        <select id="affiliate-sort" value={sort} onChange={(event) => updateParam("sort", event.target.value)} className="min-h-11 w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3 text-sm outline-none focus:border-(--color-border-strong)">
          <option value="recommended">Recommended</option>
          <option value="newest">Newest</option>
          <option value="az">A–Z</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block lg:w-56 lg:shrink-0 xl:w-64">{controls}</aside>
      <div className="lg:hidden">
        <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-(--color-border) px-4 text-sm font-medium hover:bg-(--color-primary-subtle)">
          <SlidersHorizontal size={17} aria-hidden /> Filters
          {(marketplace || sort !== "recommended") && <span className="rounded-full bg-(--color-primary) px-2 py-0.5 text-xs text-(--color-background)">Active</span>}
        </button>
        {open && (
          <div className="fixed inset-0 z-70 bg-black/60" role="presentation" onClick={() => setOpen(false)}>
            <aside role="dialog" aria-modal="true" aria-label="Product filters" onClick={(event) => event.stopPropagation()} className="ml-auto h-full w-[min(88vw,360px)] overflow-y-auto border-l border-(--color-border) bg-(--color-background) p-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2"><Filter size={18} aria-hidden /><h2 className="text-base font-semibold">Filters</h2></div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-(--color-border)"><X size={18} aria-hidden /></button>
              </div>
              {controls}
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
