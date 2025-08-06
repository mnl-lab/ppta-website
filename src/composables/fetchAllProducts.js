import { supabase } from '../../supabase.js'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return { data: null, error }
  } else {
    console.log('Products fetched successfully:', data)
    return { data, error: null }
  }
}
