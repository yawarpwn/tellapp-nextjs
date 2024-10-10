import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const photo = formData.get('photo') as File

  if (!photo) {
    return new NextResponse('NO photo provided', { status: 400 })
  }
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
      .sharpen()
      .withMetadata()
      .toBuffer()

    // return new Response('que fee')

    // Return the image as a binary response
    return new NextResponse(watermarkedImage, {
      headers: {
        'Content-Type': photo.type,
        'Content-Disposition': `inline; filename=${photo.name}`,
      },
    })
  } catch (error) {
    console.log(error)
    return new NextResponse('Error al agregar marca de agua', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return new Response('ok')
}
