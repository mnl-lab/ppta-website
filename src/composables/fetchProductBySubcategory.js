import { supabase } from '../../supabase.js'

export async function fetchProductBySubcategory(subcategoryID) {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('category2', subcategoryID);

  if (error) {
    console.error('Error fetching products by subcategory:', error);
    return [];
  }

  console.log('Fetched products for subcategory:', data);
  return data;
}