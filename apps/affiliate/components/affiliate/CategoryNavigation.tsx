import Link from "next/link";
import type { Category } from "@/types/affiliate";

export default function CategoryNavigation({ categories, activeSlug }: { categories: Category[]; activeSlug?: string }) {
  return (
    <div id="categories" className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${category.slug}`}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${activeSlug === category.slug ? "border-(--color-primary) bg-(--color-primary) text-(--color-background)" : "border-(--color-border) text-(--text-medium-emphasis) hover:border-(--color-border-strong) hover:text-(--text-high-emphasis)"}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
