'use server'
import { uploadStream, deleteSource } from '@/lib/cloudinary'
import { type GalleryCategory } from '@/types'
import { GalleryModel } from '@/models'
import { revalidateTag } from 'next/cache'

export async function createGalleryAction(formData: FormData) {
  const photoFile = formData.get('photo') as File
  const title = formData.get('title') as string
  const category = formData.get('category') as GalleryCategory

  try {
    //transform to buffer
    const arrayBuffer = await photoFile.arrayBuffer()
    const photoBuffer = Buffer.from(arrayBuffer)

    //upload photo to cloudinary
    const res = await uploadStream(photoBuffer, {
      category,
      folder: 'gallery',
    })

    //insert info into db
    const { data, error } = await GalleryModel.create({
      title,
      publicId: res.public_id,
      width: res.width,
      height: res.height,
      format: res.format,
      category,
      url: res.secure_url,
    })

    if (error) throw error

    console.log(data)
    revalidateTag('/gallery')
  } catch (error) {
    console.log(error)
    throw new Error('Error subiendo photo')
  }
}

export async function deleteGalleryAction(id: string) {
  try {
    //find publicId in Db
    const { data, error } = await GalleryModel.getById(id)

    if (error) throw error

    const { publicId } = data

    //delete image in cloudinary
    await deleteSource(publicId)
    //delete from db
    const { data: photo, error: galleryError } = await GalleryModel.delete(id)
    if (galleryError) {
      throw galleryError
    }

    revalidateTag('/gallery')
    console.log(photo.id)
  } catch (error) {
    console.log('error deleting gallery photo', error)
  }
}

export async function updateGalleryAction(formData: FormData) {
  const photoFile = formData.get('photo') as File | undefined
  const title = formData.get('title') as string
  const category = formData.get('category') as GalleryCategory
  const publicId = formData.get('public-id') as string
  const id = formData.get('id') as string

  try {
    if (!photoFile) {
      // Si photoFile es undefined, no debería entrar aquí
      console.log('Entrando en la condición de photoFile')

      //transform to buffer
      const arrayBuffer = await photoFile.arrayBuffer()
      const photoBuffer = Buffer.from(arrayBuffer)

      //upload photo to cloudinary
      const res = await uploadStream(photoBuffer, {
        category,
        folder: 'gallery',
      })

      //insert info into db
      const { data, error } = await GalleryModel.update(
        {
          title,
          publicId: res.public_id,
          width: res.width,
          height: res.height,
          format: res.format,
          category,
          url: res.secure_url,
        },
        id,
      )

      if (error) throw error

      //borrar la imagen existente en cloudinary
      await deleteSource(publicId)
      console.log('assets with id: ' + publicId + ' deleted')
    } else {
      const { data, error } = await GalleryModel.update(
        {
          title,
          category,
        },
        id,
      )

      if (error) throw error
    }

    revalidateTag('/gallery')
  } catch (error) {
    console.log(error)
    throw new Error('Error subiendo photo')
  }
}
