// import { fetchGalleryImages, getResources, getThumbUrl } from '@/lib/cloudinary'
import { createClient } from '@supabase/supabase-js'
import { getFire } from './fire'
console.log(getFire())
const valueNoused = ''

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const apiKey = process.env.SUPABASE_API_KEY!

const supabase = createClient(url, apiKey)

async function main() {}

const id = crypto.randomUUID()

main()
