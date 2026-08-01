import type { SupabaseClient } from "@supabase/supabase-js";

import type { Attribute } from "../types/attribute";

function mapAttribute(
  attribute: {
    id: string;
    name: string;
    type: Attribute["type"];
    icon_url: string | null;
    description: string | null;
  }
): Attribute {
  return {
    id: attribute.id,

    name: attribute.name,

    ...(attribute.type && {
      type: attribute.type,
    }),

    ...(attribute.icon_url && {
      iconUrl: attribute.icon_url,
    }),

    ...(attribute.description && {
      description: attribute.description,
    }),
  };
}

export async function getAttributes(
  supabase: SupabaseClient
): Promise<Attribute[]> {
  const { data, error } = await supabase
    .from("attributes")
    .select(`
      id,
      name,
      type,
      icon_url,
      description
    `)
    .order("name");

  if (error) {
    throw error;
  }

  return data.map(mapAttribute);
}