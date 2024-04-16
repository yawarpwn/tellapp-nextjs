import { fetchGalleryImages, getResources, getThumbUrl } from '@/lib/cloudinary'
import { createClient } from '@supabase/supabase-js'
import { GALLERY_CATEGORIES } from '@/constants'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
const apiKey = process.env.SUPABASE_API_KEY

const supabase = createClient(url, apiKey)

async function insertImage(data: any) {
 const { error } = await supabase.from('gallery').insert(data)
  if(error) throw error
}


async function  main () {
  try {

    const resources = await getResources()
    // const galleryImage = galleryImages[0]
    const galleryImages = resources.resources

    const promises = galleryImages.map(image => {
      const  { public_id, secure_url, width, height, format, created_at} = image 
    return insertImage({
      title: public_id,
      public_id,
      url: secure_url, 
      width, 
      height,
      format,
      created_at,
      updated_at: new Date().toISOString(),
      category: GALLERY_CATEGORIES.SenalesViales 
    })
    })


  } catch(error) {
    console.log(error)
  }

}

main()
