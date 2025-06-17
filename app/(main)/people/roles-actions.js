import { createClient } from "@/lib/supabase/client";

export async function createRole(name) {
  // Insert new role, return id and name
  const { data, error } = await createClient()
    .from("roles")
    .insert([{ name }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAllRolesDb() {
  const { data, error } = await createClient()
    .from("roles")
    .select("id, name");
  if (error) throw error;
  return data || [];
}
