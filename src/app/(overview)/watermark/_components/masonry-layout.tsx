'use client'
import type { Watermark as WatermarkType } from '@/schemas'
import { useCallback, useEffect, useRef } from 'react'
import { WatermarkCard } from '../_components/watermark-card'
import MiniMasonry from 'minimasonry'
interface Props {
  items: WatermarkType[]
}
export function MasonryLayout(props: Props) {
  const { items } = props
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    var masonry = new MiniMasonry({
      container: containerRef.current,
      baseWidth: 150,
      gutter: 10,
      minify: true,
    })
  }, [items])
  return (
    <div ref={containerRef} className="relative">
      {items.map(p => {
        return <WatermarkCard id={p.id} key={p.id} url={p.url} thumbUrl={p.thumbUrl} />
      })}
    </div>
  )
}
