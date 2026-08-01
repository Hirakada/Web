import type { SupabaseClient } from "@supabase/supabase-js";

import type { Category } from "../types/category";

function mapCategory(category: {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  description: string | null;
}): Category {
  return {
    id: category.id,

    name: category.name,

    ...(category.icon && {
      icon: category.icon,
    }),

    ...(category.color && {
      color: category.color,
    }),

    ...(category.description && {
      description: category.description,
    }),
  };
}

export async function getCategories(
  supabase: SupabaseClient
): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      icon,
      color,
      description
    `)
    .order("sort_order")
    .order("name");

  if (error) {
    throw error;
  }

  return data.map(mapCategory);
}