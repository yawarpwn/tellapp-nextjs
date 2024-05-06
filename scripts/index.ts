// import { fetchGalleryImages, getResources, getThumbUrl } from '@/lib/cloudinary'
import { TABLES } from '@/constants'
import { createClient } from '@supabase/supabase-js'

const valueNoused = ''

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const apiKey = process.env.SUPABASE_API_KEY!

const supabase = createClient(url, apiKey)

async function main() {
}

main()
