import Link from "next/link";

export default function NotFound() {
  return <section className="items-stretch! px-4! py-16! sm:px-6! lg:px-8!"><div className="mx-auto w-full max-w-xl text-center"><h1 className="text-2xl font-semibold">Not found</h1><p className="mt-2 text-sm text-(--text-medium-emphasis)">The product or category you requested does not exist.</p><Link href="/" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[var(--color-primary)] px-5 text-sm font-medium text-[var(--color-background)]">Back to products</Link></div></section>;
}
