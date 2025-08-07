import { supabase } from '../../supabase.js'

export async function fetchSubcategoryByCategory(categoryID) {
  const { data, error } = await supabase
    .from('category2')
    .select('*')
    .eq('category', categoryID);

  if (error) {
    console.error('Error fetching products by subcategory:', error);
    return [];
  }

  console.log('Fetched products for subcategory:', data);
  return data;
}