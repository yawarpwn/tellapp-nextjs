import { WatermarkModel } from '@/models'
import { MasonryLayout } from './_components/masonry-layout'
import { fetchWatermarkPhotos } from '@/lib/data/watermark'

export default async function Page() {
  const watermarkPhotos = await fetchWatermarkPhotos()
  console.log('Total Watermarks: ', watermarkPhotos.length)
  return <MasonryLayout items={watermarkPhotos} />
}
