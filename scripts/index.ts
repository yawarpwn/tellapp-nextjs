// import { fetchGalleryImages, getResources, getThumbUrl } from '@/lib/cloudinary'
import { createClient } from '@supabase/supabase-js'
import { TABLES } from '@/constants'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const apiKey = process.env.SUPABASE_API_KEY!

const supabase = createClient(url, apiKey)

async function main() {
  const { data: quotations, error } = await  supabase.from(TABLES.Quotations).select()

  if(!quotations) return

  // quotations.forEach(async quo => {
  //   const quoToInsert = {
  //     ...quo,
  //     updated_at: new Date().toISOString()
  //   }
  //   const {data, error} = await supabase.from(TABLES.Quotations).insert(quoToInsert)
  //   console.log('inserted data::', quo.number)
  // })
}

main()

