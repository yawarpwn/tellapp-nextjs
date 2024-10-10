import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
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

    // Read watermark image
    const waterMarkImageBuffer = await fs.readFile(
      process.cwd() + '/public/watermark-tellsenales-logo.svg',
    )

    // Process the image with sharp
    const watermarkedImage = await sharp(photoBuffer)
      .composite([
        {
          input: waterMarkImageBuffer,
          gravity: 'center',
        },
      ])
      .sharpen()
      .withMetadata()
      .toBuffer()

    // Return the image as a binary response
    return new NextResponse(watermarkedImage, {
      headers: {
        'Content-Type': photo.type,
        'Content-Disposition': `inline; filename=${photo.name}`,
      },
    })
  } catch (error) {
    return new NextResponse('Error al agregar marca de agua', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return new Response('ok')
}
