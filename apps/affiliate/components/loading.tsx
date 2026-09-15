import ProductSkeleton from "@/components/affiliate/ProductSkeleton";

export default function Loading() {
  return <section className="items-stretch! px-4! py-8! sm:px-6! lg:px-8! xl:px-10!"><div className="mx-auto grid w-full max-w-(--container-width) grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}</div></section>;
}
