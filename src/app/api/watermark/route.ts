import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const photos = formData.getAll('files[]') as File[]

  if (!photos) {
    return new NextResponse('NO photo provided', { status: 400 })
  }

  // return new Response('ok')
  let processedImages: string[] = []

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
      const outputFilePath = path.join(process.cwd(), 'public', 'watermarked-photos', photo.name)
      await fs.writeFile(outputFilePath, watermarkedImage)

      // Agregar la ruta del archivo procesado a la lista
      processedImages.push(`/watermarked-photos/${photo.name}`)
    } catch (error) {
      console.log(error)
      return new NextResponse('Error al agregar marca de agua', { status: 500 })
    }
  }

  // Devolver las rutas de las imágenes procesadas como respuesta JSON
  return NextResponse.json({ files: processedImages })
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
