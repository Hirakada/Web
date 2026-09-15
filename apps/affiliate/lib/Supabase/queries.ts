import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  AffiliateProduct,
  Category,
  Marketplace,
  MarketplaceLink,
  ProductQueryOptions,
  SortMode,
  Subcategory,
} from "@/types/affiliate";

import type { Database } from "./types";

type Client = SupabaseClient<Database>;

type CategoryRow = Database["affiliate"]["Tables"]["categories"]["Row"];
type SubcategoryRow =
  Database["affiliate"]["Tables"]["subcategories"]["Row"];
type MarketplaceRow =
  Database["affiliate"]["Tables"]["marketplaces"]["Row"];

type ProductMarketplaceRow = {
  id: string;
  affiliate_url: string;
  marketplaces: MarketplaceRow | MarketplaceRow[] | null;
};

type ProductRow = Database["affiliate"]["Tables"]["products"]["Row"] & {
  categories: CategoryRow | CategoryRow[] | null;
  subcategories: SubcategoryRow | SubcategoryRow[] | null;
  product_marketplaces: ProductMarketplaceRow[] | null;
};

const PRODUCT_SELECT = `
  id,
  name,
  slug,
  description,
  image_url,
  video_url,
  category_id,
  subcategory_id,
  featured,
  sort_order,
  created_at,
  updated_at,
  categories(
    id,
    name,
    slug,
    description,
    image,
    sort_order,
    created_at
  ),
  subcategories(
    id,
    category_id,
    name,
    slug,
    description,
    sort_order,
    created_at
  ),
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
`;

function affiliate(supabase: Client) {
  return supabase.schema("affiliate");
}

function one<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    image: row.image,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function mapSubcategory(row: SubcategoryRow): Subcategory {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function mapMarketplace(row: MarketplaceRow): Marketplace {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    icon: row.icon,
    sortOrder: row.sort_order,
    active: row.active,
  };
}

function mapProduct(row: ProductRow): AffiliateProduct | null {
  const category = one(row.categories);
  const subcategory = one(row.subcategories);

  if (!category || !subcategory || !row.image_url) {
    return null;
  }

  const marketplaces: MarketplaceLink[] = (row.product_marketplaces ?? [])
    .map((link) => {
      const marketplace = one(link.marketplaces);

      if (!marketplace || !marketplace.active || !link.affiliate_url) {
        return null;
      }

      return {
        id: link.id,
        affiliateUrl: link.affiliate_url,
        marketplace: mapMarketplace(marketplace),
      } satisfies MarketplaceLink;
    })
    .filter(
      (value): value is MarketplaceLink => value !== null,
    )
    .sort(
      (a, b) =>
        a.marketplace.sortOrder - b.marketplace.sortOrder ||
        a.marketplace.name.localeCompare(b.marketplace.name),
    );

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    imageUrl: row.image_url,
    videoUrl: row.video_url,
    category: mapCategory(category),
    subcategory: mapSubcategory(subcategory),
    featured: row.featured,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    marketplaces,
  };
}

function sortProducts(
  products: AffiliateProduct[],
  sort: SortMode,
) {
  if (sort === "az") {
    return products.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  if (sort === "newest") {
    return products.sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  return products.sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.sortOrder - b.sortOrder ||
      b.createdAt.localeCompare(a.createdAt),
  );
}

export async function getCategories(
  supabase: Client,
): Promise<Category[]> {
  const { data, error } = await affiliate(supabase)
    .from("categories")
    .select(
      "id,name,slug,description,image,sort_order,created_at",
    )
    .order("sort_order")
    .order("name");

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapCategory);
}

export async function getCategoryBySlug(
  supabase: Client,
  slug: string,
): Promise<Category | null> {
  const { data, error } = await affiliate(supabase)
    .from("categories")
    .select(
      "id,name,slug,description,image,sort_order,created_at",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapCategory(data) : null;
}

export async function getSubcategories(
  supabase: Client,
  categoryId?: string,
): Promise<Subcategory[]> {
  let query = affiliate(supabase)
    .from("subcategories")
    .select(
      "id,category_id,name,slug,description,sort_order,created_at",
    )
    .order("sort_order")
    .order("name");

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapSubcategory);
}

export async function getSubcategoryBySlug(
  supabase: Client,
  categorySlug: string,
  subcategorySlug: string,
): Promise<Subcategory | null> {
  const category = await getCategoryBySlug(
    supabase,
    categorySlug,
  );

  if (!category) {
    return null;
  }

  const { data, error } = await affiliate(supabase)
    .from("subcategories")
    .select(
      "id,category_id,name,slug,description,sort_order,created_at",
    )
    .eq("category_id", category.id)
    .eq("slug", subcategorySlug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapSubcategory(data) : null;
}

export async function getMarketplaces(
  supabase: Client,
): Promise<Marketplace[]> {
  const { data, error } = await affiliate(supabase)
    .from("marketplaces")
    .select(
      "id,name,slug,icon,sort_order,active,created_at",
    )
    .eq("active", true)
    .order("sort_order")
    .order("name");

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapMarketplace);
}

async function getProductsByIds(
  supabase: Client,
  ids: string[],
): Promise<AffiliateProduct[]> {
  if (!ids.length) {
    return [];
  }

  const { data, error } = await affiliate(supabase)
    .from("products")
    .select(PRODUCT_SELECT)
    .in("id", ids)
    .limit(ids.length);

  if (error) {
    throw error;
  }

  const byId = new Map(
    (data as unknown as ProductRow[]).map((row) => [
      row.id,
      row,
    ]),
  );

  return ids
    .map((id) => byId.get(id))
    .filter((row): row is ProductRow => Boolean(row))
    .map(mapProduct)
    .filter(
      (value): value is AffiliateProduct => value !== null,
    );
}

function applyProductFilters(
  products: AffiliateProduct[],
  options: ProductQueryOptions,
) {
  return products.filter((product) => {
    if (
      options.categorySlug &&
      product.category.slug !== options.categorySlug
    ) {
      return false;
    }

    if (
      options.subcategorySlug &&
      product.subcategory.slug !== options.subcategorySlug
    ) {
      return false;
    }

    if (
      options.marketplaceSlug &&
      !product.marketplaces.some(
        (link) =>
          link.marketplace.slug === options.marketplaceSlug,
      )
    ) {
      return false;
    }

    return true;
  });
}

export async function getProducts(
  supabase: Client,
  options: ProductQueryOptions = {},
): Promise<AffiliateProduct[]> {
  const limit = Math.min(
    Math.max(options.limit ?? 24, 1),
    100,
  );

  const offset = Math.max(options.offset ?? 0, 0);
  const sort = options.sort ?? "recommended";
  const search = options.search?.trim() ?? "";

  if (search) {
    const { data, error } = await affiliate(supabase).rpc(
      "search_products",
      {
        search_query: search,
        result_limit: Math.min(
          1000,
          Math.max(100, offset + limit * 10),
        ),
        result_offset: 0,
      },
    );

    if (error) {
      throw error;
    }

    const ids = (data ?? []).map((row) => row.id);

    const products = await getProductsByIds(
      supabase,
      ids,
    );

    const filtered = applyProductFilters(
      products,
      options,
    );

    return sortProducts(filtered, sort).slice(
      offset,
      offset + limit,
    );
  }

  let query = affiliate(supabase)
    .from("products")
    .select(PRODUCT_SELECT);

  if (options.categorySlug) {
    const category = await getCategoryBySlug(
      supabase,
      options.categorySlug,
    );

    if (!category) {
      return [];
    }

    query = query.eq("category_id", category.id);
  }

  if (options.subcategorySlug) {
    const subcategory = await getSubcategoryBySlug(
      supabase,
      options.categorySlug ?? "",
      options.subcategorySlug,
    );

    if (!subcategory) {
      return [];
    }

    query = query.eq(
      "subcategory_id",
      subcategory.id,
    );
  }

  if (options.marketplaceSlug) {
    const {
      data: marketplace,
      error: marketplaceError,
    } = await affiliate(supabase)
      .from("marketplaces")
      .select("id")
      .eq("slug", options.marketplaceSlug)
      .eq("active", true)
      .maybeSingle();

    if (marketplaceError) {
      throw marketplaceError;
    }

    if (!marketplace) {
      return [];
    }

    const {
      data: links,
      error: linksError,
    } = await affiliate(supabase)
      .from("product_marketplaces")
      .select("product_id")
      .eq("marketplace_id", marketplace.id)
      .limit(1000);

    if (linksError) {
      throw linksError;
    }

    const ids = (links ?? []).map(
      (row) => row.product_id,
    );

    if (!ids.length) {
      return [];
    }

    query = query.in("id", ids);
  }

  if (sort === "newest") {
    query = query.order("created_at", {
      ascending: false,
    });
  } else if (sort === "az") {
    query = query.order("name", {
      ascending: true,
    });
  } else {
    query = query
      .order("featured", {
        ascending: false,
      })
      .order("sort_order", {
        ascending: true,
      })
      .order("created_at", {
        ascending: false,
      });
  }

  const { data, error } = await query.range(
    offset,
    offset + limit - 1,
  );

  if (error) {
    throw error;
  }

  return (data as unknown as ProductRow[])
    .map(mapProduct)
    .filter(
      (value): value is AffiliateProduct => value !== null,
    );
}

export async function getFeaturedProducts(
  supabase: Client,
  limit = 8,
): Promise<AffiliateProduct[]> {
  const { data, error } = await affiliate(supabase)
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("featured", true)
    .order("sort_order")
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data as unknown as ProductRow[])
    .map(mapProduct)
    .filter(
      (value): value is AffiliateProduct => value !== null,
    );
}

export async function getProductBySlug(
  supabase: Client,
  slug: string,
): Promise<AffiliateProduct | null> {
  const { data, error } = await affiliate(supabase)
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data
    ? mapProduct(data as unknown as ProductRow)
    : null;
}