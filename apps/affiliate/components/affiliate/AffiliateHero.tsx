import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@hirakada/ui";

export default function AffiliateHero() {
  return (
    <section className="items-start! px-4! py-12! sm:px-6! md:py-16! lg:px-8! xl:px-10!">
      <div className="mx-auto w-full max-w-(--container-width)">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text-muted)">Affiliate Picks</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Curated products worth checking out.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-(--text-medium-emphasis) sm:text-lg">Discover useful products from selected marketplaces without the clutter of an online store.</p>
        <Button asChild className="mt-7 min-h-11">
          <Link href="#products">Browse Products <ArrowRight size={16} aria-hidden /></Link>
        </Button>
      </div>
    </section>
  );
}
