import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/affiliate/ProductDetail";
import { createClient } from "@/lib/Supabase/server";
import { getProductBySlug } from "@/lib/Supabase/queries";

type Params = Promise<{ slug: string }>;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const product = await getProductBySlug(supabase, slug);
  return product
    ? { title: `${product.name} — Affiliate`, description: product.description ?? `Discover ${product.name}.` }
    : { title: "Product not found" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const product = await getProductBySlug(supabase, slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
