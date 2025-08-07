import { supabase } from '../../supabase.js'

export async function fetchAllCategories() {
  const { data, error } = await supabase
    .from("category")
    .select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}