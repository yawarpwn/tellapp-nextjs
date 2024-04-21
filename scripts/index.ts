// import { fetchGalleryImages, getResources, getThumbUrl } from '@/lib/cloudinary'
import { createClient } from '@supabase/supabase-js'
import { TABLES } from '@/constants'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const apiKey = process.env.SUPABASE_API_KEY!

const supabase = createClient(url, apiKey)

async function main() {
}

main()

