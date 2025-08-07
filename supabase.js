
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://krzyugyzqdizsvwiwwmv.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY 

if (!supabaseKey) {
  throw new Error('VUE_APP_SUPABASE_KEY is not defined. Please set it in your environment variables.')
}
else {
    console.log('Supabase key is set.')
    // console.log("API Key:", supabaseKey)
}

export const supabase = createClient(supabaseUrl, supabaseKey)