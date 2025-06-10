import { supabase } from "@/lib/supabaseClient";

export async function createRole(name) {
  // Insert new role, return id and name
  const { data, error } = await supabase
    .from("roles")
    .insert([{ name }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAllRolesDb() {
  const { data, error } = await supabase
    .from("roles")
    .select("id, name");
  if (error) throw error;
  return data || [];
}
