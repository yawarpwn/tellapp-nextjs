import { WatermarkModel } from '@/models'
import { MasonryLayout } from './_components/masonry-layout'

export default async function Page() {
  const { data: items, error } = await WatermarkModel.getAll()

  if (error) {
    throw error
  }
  return <MasonryLayout items={items} />
}
