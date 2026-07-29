import type { SupabaseClient } from "@supabase/supabase-js";

import type { Attribute } from "../types/attribute";


export async function getAttributes(
  supabase: SupabaseClient
): Promise<Attribute[]> {
  const { data, error } = await supabase
    .from("attributes")
    .select("*")
    .order("name");


  if (error) {
    throw error;
  }


  return data.map((attribute) => ({
    id: attribute.id,

    name: attribute.name,

    type: attribute.type,

    iconUrl:
      attribute.icon_url ?? undefined,

    description:
      attribute.description ?? undefined,
  }));
}