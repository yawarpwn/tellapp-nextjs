import { clsx } from 'clsx'
import { type ClassNameValue, twMerge } from 'tailwind-merge'
export * from './pagination'
export * from './format'
export * from './db'

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs))
}

export function resizeImageFile(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality = 0.7,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      let { width, height } = img

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height
        if (width > height) {
          width = maxWidth
          height = maxWidth / aspectRatio
        } else {
          height = maxHeight
          width = maxHeight * aspectRatio
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        blob => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(resizedFile)
          } else {
            reject(new Error('No se pudo crear el Blob de la imagen redimensionada'))
          }
        },
        file.type,
        quality,
      )

      URL.revokeObjectURL(url)
    }

    img.onerror = error => reject(error)
    img.src = url
  })
}
