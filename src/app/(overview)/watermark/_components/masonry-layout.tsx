'use client'
import { useState } from 'react'
import { WatermarkCard } from '../_components/watermark-card'
import { CreateWatermark } from '../_components/create-watermark'
import { Watermark } from '@/schemas'
import type { Watermark as WatermarkType } from '@/schemas'
interface Props {
  items: WatermarkType[]
}
export function MasonryLayout({ items }: Props) {
  function divideArray(inputArray: Watermark[], size: number) {
    const result = []
    const totalLength = inputArray.length
    const baseSize = Math.floor(totalLength / size)
    let remainder = totalLength % size

    let startIndex = 0
    for (let i = 0; i < size; i++) {
      let portionSize = baseSize + (remainder > 0 ? 1 : 0) // Añade una posición extra si hay residuo.
      result.push(inputArray.slice(startIndex, startIndex + portionSize))
      startIndex += portionSize
      remainder--
    }

    return result
  }

  const handleShareSelectedImages = async () => {
    const photosToShare = [items[0].url, items[1].url, items[2].url, items[3].url]

    if (navigator.share) {
      const blobs = await Promise.all(photosToShare.map(url => fetch(url).then(res => res.blob())))
      console.log(blobs)
      try {
        await navigator.share({
          title: 'Imagen para compartir',
          text: 'Mira esta imagen interesante!',
          files: [
            ...blobs.map(
              (blob, index) =>
                new File([blob], `Tellsenales-foto-${index}.jpg`, { type: blob.type }),
            ),
          ],
        })
        console.log('Imagen compartida exitosamente')
      } catch (error) {
        console.error('Error al compartir la imagen:', error)
      }
    } else {
      alert('La funcionalidad de compartir no está disponible en este dispositivo.')
    }

    console.log(photosToShare)
  }

  const mobileArray = divideArray(items, 2)
  const desktopArray = divideArray(items, 4)
  return (
    <div className="flex flex-col items-center">
      <header className="mb-8 flex w-full justify-end gap-3">
        <button onClick={handleShareSelectedImages}>Compartir</button>
        <CreateWatermark />
      </header>
      {/* Mobile */}
      <div className="relative flex gap-3 md:hidden">
        {mobileArray.map((photos, index) => {
          return (
            <div className="flex flex-col gap-3" key={index}>
              {photos.map((photo, index) => {
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
          )
        })}
      </div>

      {/* Desktop */}
      <div className="hidden gap-3 md:flex">
        {desktopArray.map((photos, index) => {
          return (
            <div className="flex flex-col gap-3 " key={index}>
              {photos.map((photo, index) => {
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
          )
        })}
      </div>
    </div>
  )
}
