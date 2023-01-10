import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANNON_KEY

const supabase = createClient(supabaseUrl, supabaseAnnonKey)
export default supabase