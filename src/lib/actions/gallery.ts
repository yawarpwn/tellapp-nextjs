'use server'
import { uploadStream, deleteSource } from '@/lib/cloudinary'
import { type GalleryCategory } from '@/types'
import { GalleryModel } from '@/models'
import { revalidateTag } from 'next/cache'

export async function createGalleryAction(formData: FormData) {
  const photoFile = formData.get('photo') as File
  const title = formData.get('title') as string
  const category = formData.get('category') as GalleryCategory

  console.log({ photoFile, title, category })

  // const buf = await photoFile.arrayBuffer()
  // console.log(buf)

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
