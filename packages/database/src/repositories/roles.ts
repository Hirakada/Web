import type { SupabaseClient } from "@supabase/supabase-js";

import type { Role } from "../types/role";

function mapRole(role: {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  description: string | null;
}): Role {
  return {
    id: role.id,

    name: role.name,

    ...(role.icon && {
      icon: role.icon,
    }),

    ...(role.color && {
      color: role.color,
    }),

    ...(role.description && {
      description: role.description,
    }),
  };
}

export async function getRoles(
  supabase: SupabaseClient
): Promise<Role[]> {
  const { data, error } = await supabase
    .from("roles")
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

  return data.map(mapRole);
}