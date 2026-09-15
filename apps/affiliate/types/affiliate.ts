export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  createdAt: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  createdAt: string;
}

export interface Marketplace {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  sortOrder: number;
  active: boolean;
}

export interface MarketplaceLink {
  id: string;
  marketplace: Marketplace;
  affiliateUrl: string;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string;
  videoUrl: string | null;
  category: Category;
  subcategory: Subcategory;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  marketplaces: MarketplaceLink[];
}

export type SortMode = "recommended" | "newest" | "az";

export interface ProductQueryOptions {
  search?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  marketplaceSlug?: string;
  sort?: SortMode;
  limit?: number;
  offset?: number;
}
