import { supabase } from '../../supabase.js'

export async function fetchAllSubCategories() {
  const { data, error } = await supabase
    .from("category2")
    .select("*");

  if (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }

  return data;
}