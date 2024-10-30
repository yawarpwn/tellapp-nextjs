import { WatermarkModel } from '@/models'
import { CreateWatermark } from './_components/create-watermark'
import { MasonryLayout } from './_components/masonry-layout'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function MasonrySkeleton() {
  const items = Array.from({ length: 40 }, (_, i) => i)
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2">
      {items.map(i => (
        <Skeleton key={i} className="h-[100px] w-[180px]"></Skeleton>
      ))}
    </div>
  )
}

async function MasonryLayoutServer() {
  const { data: photos, error } = await WatermarkModel.getAll()

  if (error) {
    console.log(error)
    throw error
  }

  return <MasonryLayout items={photos} />
}

export default async function Page() {
  return (
    <div>
      <header className="mb-8 flex justify-end">
        <CreateWatermark />
      </header>
      <Suspense fallback={<MasonrySkeleton />}>
        <MasonryLayoutServer />
      </Suspense>
    </div>
  )
}
