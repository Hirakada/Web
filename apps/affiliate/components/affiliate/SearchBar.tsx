"use client";

import { Search, X } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

export default function SearchBar({
  compact = false,
}: {
  compact?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initial);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    const query = value.trim();

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    router.push(
      `${pathname}${params.toString() ? `?${params}` : ""}`,
    );
  }

  function clear() {
    setValue("");

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.delete("q");

    router.push(
      `${pathname}${params.toString() ? `?${params}` : ""}`,
    );
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      className="w-full"
    >
      <label
        className="sr-only"
        htmlFor={
          compact
            ? "header-search"
            : "catalog-search"
        }
      >
        Search products
      </label>

      <div className="flex min-h-11 items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) px-3 transition focus-within:border-(--color-border-strong) focus-within:ring-2 focus-within:ring-(--color-primary-subtle)">
        <Search
          size={18}
          className="shrink-0 text-(--text-muted)"
          aria-hidden
        />

        <input
          id={
            compact
              ? "header-search"
              : "catalog-search"
          }
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          placeholder="Search products..."
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-(--text-muted)"
        />

        {value && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md text-(--text-muted) hover:bg-(--color-primary-subtle) hover:text-(--text-high-emphasis)"
          >
            <X
              size={16}
              aria-hidden
            />
          </button>
        )}
      </div>
    </form>
  );
}