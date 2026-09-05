export type AffiliateSellerLevel =
  | "Mall"
  | "Star+"
  | "Star";

export interface AffiliateProduct {
  id: string;
  productName: string;
  category: string | null;
  affiliateUrl: string;
  productImage: string | null;
  sellerLevel: AffiliateSellerLevel;
  priority: number | null;
}