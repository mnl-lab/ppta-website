import { supabase } from '../../supabase.js'

export async function fetchProductByCategory(categoryID) {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('category', categoryID);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  console.log('Fetched products for category:', data);
  return data;
}