const ITEMS_PER_PAGE = 8

import { TABLES } from '@/constants'
import { GalleryImageType } from '@/types'
import { cookies } from 'next/headers'
import { createServerClient } from '../supabase/server'

export async function fetchGalleryPages(query = '') {
  // create supabase client
  const cookieStore = await cookies()
  const supabase = createServerClient(cookieStore)

  const { count, error } = await supabase
    .from(TABLES.Gallery)
    .select('*', { count: 'exact' })
    .ilike('title', '%' + query + '%')

  if (error) {
    console.log(error)
  }

  return Math.ceil(count / ITEMS_PER_PAGE)
}

export async function fetchFilteredGallery(query: string, currentPage: number) {
  // create supabase client
  const cookieStore = await cookies()
  const supabase = createServerClient(cookieStore)
  console.log(supabase)

  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const { data: gallery, error } = await supabase
    .from(TABLES.Gallery)
    .select()
    .ilike('title', '%' + query + '%')
    .range(offset, offset + ITEMS_PER_PAGE)
    .order('updated_at', { ascending: false })
    .returns<GalleryImageType[]>()

  if (error) {
    console.log(error)
  }

  return gallery
}
