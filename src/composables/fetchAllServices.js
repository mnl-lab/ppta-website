import { supabase } from '../../supabase.js'

export async function fetchAllServices() {
  const { data, error } = await supabase
    .from("service")
    .select("*");

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data;
}