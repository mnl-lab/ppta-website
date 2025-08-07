import { supabase } from '../../supabase.js'


export async function getProducts() {
  const { data, error } = await supabase.from('product').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  console.log('Fetched products:', data);
  return data;
}
