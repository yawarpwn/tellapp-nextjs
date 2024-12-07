import { WatermarkModel } from '@/models'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MasonryLayout } from './_components/masonry-layout'

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

  // const handleShareSelectedImages = () => {}

  return <MasonryLayout items={items} />
}

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<MasonrySkeleton />}>
        <MasonryLayoutServer />
      </Suspense>
    </div>
  )
}
