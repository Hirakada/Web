"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="!items-stretch !px-4 !py-16 sm:!px-6 lg:!px-8"><div className="mx-auto w-full max-w-xl text-center"><h1 className="text-2xl font-semibold">Unable to load products.</h1><p className="mt-2 text-sm text-[var(--text-medium-emphasis)]">Please try again later.</p><button type="button" onClick={() => reset()} className="mt-6 min-h-11 rounded-lg bg-[var(--color-primary)] px-5 text-sm font-medium text-[var(--color-background)]">Try again</button></div></section>;
}
