'use client'
import type { Watermark as WatermarkType } from '@/schemas'
import { CreateWatermark } from '../_components/create-watermark'
import { useCallback, useEffect, useRef } from 'react'
import { WatermarkCard } from '../_components/watermark-card'
import MiniMasonry from 'minimasonry'
interface Props {
  items: WatermarkType[]
}
export function MasonryLayout(props: Props) {
  const evenItems = items.filter((_, i) => i % 2 === 0)
  const oddItems = items.filter((_, i) => i % 2 !== 0)

  return (
    <div>
      <header className="mb-8 flex justify-end">
        <CreateWatermark onLayout={mansonryRef.current?.layout} />
      </header>
      <div ref={containerRef} className="relative">
        <div>
          {evenItems.map((photo, index) => {
            return (
              <WatermarkCard
                onLayout={mansonryRef.current?.layout}
                id={photo.id}
                key={photo.id}
                url={photo.url}
                thumbUrl={photo.thumbUrl}
              />
            )
          })}
        </div>
        <div>
          {oddItems.map((photo, index) => {
            return (
              <WatermarkCard
                onLayout={mansonryRef.current?.layout}
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
