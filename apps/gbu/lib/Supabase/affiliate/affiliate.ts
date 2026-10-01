import { createClient } from "@/lib/Supabase/server";

export type AffiliateBanner = {
  id: string;
  imageUrl: string;
  affiliateUrl: string;
};

type MarketplaceRow = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
};

function one<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export async function getRandomAffiliateBanners(
  limit = 2,
): Promise<AffiliateBanner[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("affiliate")
    .from("products")
    .select(`
      id,
      image_url,
      product_marketplaces(
        id,
        affiliate_url,
        marketplaces(
          id,
          name,
          slug,
          icon,
          sort_order,
          active,
          created_at
        )
      )
    `)
    .not("image_url", "is", null);

  if (error) {
    throw error;
  }

  const banners: AffiliateBanner[] = (data ?? []).flatMap((product) => {
    const shopeeLink = product.product_marketplaces?.find((link) => {
      const marketplace = one(link.marketplaces);

      return (
        marketplace?.slug === "shopee" &&
        marketplace.active &&
        Boolean(link.affiliate_url)
      );
    });

    if (!product.image_url || !shopeeLink?.affiliate_url) {
      return [];
    }

    return [
      {
        id: product.id,
        imageUrl: product.image_url,
        affiliateUrl: shopeeLink.affiliate_url,
      },
    ];
  });

  for (let i = banners.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const current = banners[i]!;
    const random = banners[j]!;

    banners[i] = random;
    banners[j] = current;
  }

  return banners.slice(0, limit);
}