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
export default function Loading() {
  return <MasonrySkeleton />
}
