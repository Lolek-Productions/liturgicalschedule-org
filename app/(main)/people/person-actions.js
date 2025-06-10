import { supabase } from "@/lib/supabaseClient";

export async function getPeople({ page = 1, pageSize = 10, sort = "first_name", order = "asc" }) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from("people")
    .select("*", { count: "exact" })
    .order(sort, { ascending: order === "asc" })
    .range(from, to);
  if (error) throw error;
  return { data, count };
}

export async function getPerson(id) {
  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createPerson(person) {
  const { data, error } = await supabase
    .from("people")
    .insert([person])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePerson(id, updates) {
  const { data, error } = await supabase
    .from("people")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePerson(id) {
  const { error } = await supabase
    .from("people")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}
