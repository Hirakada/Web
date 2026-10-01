import { getRandomAffiliateBanners } from "@/lib/Supabase/affiliate/affiliate";

import GBU from "./GBU";

export default async function GbuPage() {
  const banners = await getRandomAffiliateBanners(2);

  return <GBU banners={banners} />;
}