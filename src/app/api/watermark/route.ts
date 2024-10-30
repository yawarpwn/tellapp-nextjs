import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { destroyResource, uploadStream } from '@/lib/cloudinary'
import { WatermarkModel } from '@/models'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const photos = formData.getAll('files[]') as File[]

  console.log(photos)

  if (!photos) {
    return new NextResponse('NO photo provided', { status: 400 })
  }

  // return new Response('ok')
  let processedImages = []

  for (const photo of photos) {
    try {
      //Transform photo to Buffer
      const photoBuffer = Buffer.from(await photo.arrayBuffer())

      // const watermarkLogo = await fs.readFile(path.join(__dirname, 'watermark-tellsenales-logo.svg'))
      // console.log('logo', watermarkLogo)

      const watermarkPath = path.join(process.cwd(), 'public', 'watermark-tellsenales-logo.svg')

      // Process the image with sharp
      const watermarkedImage = await sharp(photoBuffer)
        .composite([
          {
            input: watermarkPath,
            gravity: 'center',
          },
        ])
        .resize({
          width: 1000,
        })
        .sharpen()
        .withMetadata()
        .toBuffer()

      // Guardar la imagen procesada en el sistema de archivos
      const res = await uploadStream(watermarkedImage, {
        folder: 'watermarked',
        category: 'watermarked',
      })

      const watermarkToSave = {
        url: res.secure_url,
        width: res.width,
        height: res.height,
        format: res.format,
        publicId: res.public_id,
      }

      const { data, error } = await WatermarkModel.create(watermarkToSave)

      processedImages.push({ url: watermarkToSave.url })

      if (error) {
        console.log('Errur subiendo Watermark', error)
      }
    } catch (error) {
      console.log(error)
      return new NextResponse('Error al agregar marca de agua', { status: 500 })
    }
  }

  // Devolver las rutas de las imágenes procesadas como respuesta JSON
  revalidatePath('/watermark')
  return NextResponse.json(processedImages)
}

// return new NextResponse(watermarkedImage, {
//   headers: {
//     'Content-Type': photo.type,
//     'Content-Disposition': `inline; filename=${photo.name}`,
//   },
// })

// headers: {
//   'Content-Type': photo.type,
//   'Content-Disposition': `inline; filename=${photo.name}`,
// },

export async function GET(request: NextRequest) {
  return new Response('ok')
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    console.log(id)
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

    revalidatePath('/watermark')
    //Retornar respuesta
    return new Response('ok')
  } catch (error) {
    console.log(error)
    return new NextResponse('Error al eliminar marca de agua', { status: 500 })
  }
}
