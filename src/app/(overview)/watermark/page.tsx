import { WatermarkModel } from '@/models'
import { MasonryLayout } from './_components/masonry-layout'
import react from 'react'
import { WatermarkCard } from './_components/watermark-card'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateWatermark } from './_components/create-watermark'

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
  const { data: items, error } = await WatermarkModel.getAll()

  if (error) {
    console.log(error)
    throw error
  }
  const evenItems = items.filter((_, i) => i % 2 === 0)
  const oddItems = items.filter((_, i) => i % 2 !== 0)

  return (
    <div className="flex flex-col items-center">
      <header className="mb-8 flex w-full justify-end">
        <CreateWatermark />
      </header>
      <div className="relative flex gap-3">
        <div className="flex flex-col gap-3">
          {evenItems.map((photo, index) => {
            return (
              <WatermarkCard
                width={photo.width}
                height={photo.height}
                id={photo.id}
                key={photo.id}
                url={photo.url}
                thumbUrl={photo.thumbUrl}
              />
            )
          })}
        </div>
        <div className="flex flex-col gap-3">
          {oddItems.map((photo, index) => {
            return (
              <WatermarkCard
                width={photo.width}
                height={photo.height}
                id={photo.id}
                key={photo.id}
                url={photo.url}
                thumbUrl={photo.thumbUrl}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default async function Page() {
  return (
    <div>
      <react.Suspense fallback={<MasonrySkeleton />}>
        <MasonryLayoutServer />
      </react.Suspense>
    </div>
  )
}
