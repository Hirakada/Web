import { getRandomAffiliateBanners } from "@/lib/Supabase/affiliate/affiliate";
import GBU from "./GBU";

const BANNER_TYPE = "affiliate" as const;

export default async function GbuPage() {
  const banners =
    BANNER_TYPE === "affiliate"
      ? await getRandomAffiliateBanners(2)
      : [];

  return (
    <GBU
      banners={banners}
      bannerType={BANNER_TYPE}
    />
  );
}