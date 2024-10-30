import { Watermark } from './_components/watermark'
import { WatermarkModel } from '@/models'
import { WatermarkCard } from './_components/watermark-card'
import { CreateWatermark } from './_components/create-watermark'

export default async function Page() {
  const { data: photos, error } = await WatermarkModel.getAll()

  if (error) {
    console.log(error)
    return
  }

  return (
    <div>
      <header className="flex justify-end">
        <CreateWatermark />
      </header>
      <div className="mt-4 flex flex-col gap-4">
        {photos.map(p => {
          return <WatermarkCard key={p.id} url={p.url} />
        })}
      </div>
    </div>
  )
}
