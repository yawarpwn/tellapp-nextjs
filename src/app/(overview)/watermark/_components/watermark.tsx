'use client'
import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { addWatermarkInPhoto } from '@/lib/actions/watermark'

export function Watermark() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)

  console.log({ loading, blob })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setLoading(true)

    try {
      const res = await fetch('/api/watermark', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Error en la respuesta')

      const blob = await res.blob()
      setBlob(blob)
      setImageSrc(URL.createObjectURL(blob))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!blob) return

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'watermarked-image.jpg' // Nombre del archivo a descargar
    document.body.appendChild(link) // Necesario para Firefox
    link.click()
    document.body.removeChild(link) // Limpiar el DOM
    URL.revokeObjectURL(url) // Liberar memoria
  }

  const handleShare = async () => {
    if (!blob) return

    if (!navigator.share) {
      console.log('share api no supported')
      return
    }

    const url = URL.createObjectURL(blob)

    try {
      await navigator.share({
        title: 'Imagen con Marca de Agua',
        text: 'Mira esta imagen con marca de agua.',
        files: [new File([blob], 'watermarked-image.jpg', { type: 'image/jpeg' })],
      })
      console.log('Compartido exitosamente')
    } catch (error) {
      console.error('Error al compartir:', error)
    } finally {
      URL.revokeObjectURL(url) // Liberar memoria
    }
  }

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0] as File
    const blob = new Blob([file])
    setImageSrc(URL.createObjectURL(blob))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {imageSrc ? (
          <div>
            <img src={imageSrc} />
          </div>
        ) : (
          <input required name="photo" className="block" type="file" />
        )}
        <button className="bg-primary" type="submit">
          {loading ? 'enviando...' : 'enviar'}
        </button>
      </form>
      {blob && (
        <div>
          <img src={URL.createObjectURL(blob)} />
          <div className="flex justify-between ">
            <Button onClick={handleDownload}>Descargar</Button>
            <Button onClick={handleShare}>Compartir</Button>
          </div>
        </div>
      )}
    </div>
  )
}
