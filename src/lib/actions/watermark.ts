'use server'

import fs from 'node:fs/promises'

import sharp from 'sharp'

export async function addWatermarkInPhoto(formData: FormData) {
  const photo = formData.get('photo') as File

  if (!photo) throw new Error('NO photo provided')

  try {
    //Transofrm photo a un tipo Buffer
    const photoBuffer = Buffer.from(await photo.arrayBuffer())

    // Leer logo como marca de agua
    const waterMarkImageBuffer = await fs.readFile(
      process.cwd() + '/public/watermark-tellsenales-logo.svg',
    )

    // Transformamos la imagen con sharp
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

    // TODO:Retornan
    return watermarkedImage
  } catch (error) {
    throw new Error('Error al agregar marca de agua')
  }
}
