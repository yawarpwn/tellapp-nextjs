'use server'
import { WatermarkModel } from '@/models'
import path from 'node:path'
import sharp from 'sharp'
import { destroyResource, uploadStream } from '@/lib/cloudinary'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function createWatermarkAction(formData: FormData) {
  const photos = formData.getAll('files[]') as File[]

  if (!photos) {
    return {
      error: 'No photos Provided',
      data: null,
    }
  }

  for (const photo of photos) {
    try {
      //Transform photo to Buffer
      const photoBuffer = Buffer.from(await photo.arrayBuffer())

      const response = await fetch('https://tellapp.vercel.app/watermark-tellsenales-logo.svg')
      const watermarkBuffer = Buffer.from(await response.arrayBuffer())

      // Process the image with sharp
      const watermarkedImage = await sharp(photoBuffer)
        .composite([
          {
            input: watermarkBuffer,
            gravity: 'center',
          },
        ])
        .resize({
          width: 1000,
        })
        .sharpen()
        .withMetadata()
        .toBuffer()

      let res

      let watermarkToSave
      // Guardar la imagen procesada en el sistema de archivos
      try {
        const res = await uploadStream(watermarkedImage, {
          folder: 'watermarked',
          category: 'watermarked',
        })

        watermarkToSave = {
          url: res.secure_url,
          width: res.width,
          height: res.height,
          format: res.format,
          publicId: res.public_id,
        }
      } catch (error) {
        console.log(error)
        throw new Error('Error subiendo imagen a cloudinary' + JSON.stringify(error))
      }

      const { data, error } = await WatermarkModel.create(watermarkToSave)

      if (error) {
        throw error
      }
    } catch (err) {
      return {
        error: `Error subiendo imagen: ${JSON.stringify(err)}`,
        data: null,
      }
    }
  }

  // Devolver las rutas de las imágenes procesadas como respuesta JSON
  revalidatePath('/watermark')
  return {
    data: 'Success',
    error: null,
  }
}

export async function deleteWatermarkAction({ id }: { id: string }) {
  try {
    if (!id) throw new Error('id no provided')

    //Obtener publicId
    const { data: watermarkedPhoto, error: watermarkedError } = await WatermarkModel.getById(id)

    if (watermarkedError) {
      throw watermarkedError
    }

    //Eliminar foto en clodinary
    await destroyResource(watermarkedPhoto.publicId)

    console.log('publicId', watermarkedPhoto.publicId)

    //Eliminar foto en base de daos
    const { data, error } = await WatermarkModel.delete(id)
    if (error) {
      console.log('Error eliminando watermarked photo ' + id, error)
      throw error
    }

    revalidateTag('/watermark')
    //Retornar respuesta
  } catch (error) {
    console.log(error)
  }
}
