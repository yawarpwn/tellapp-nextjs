import { SignalsModel } from '@/models'
import { SignalCategory } from '@/types'
import { uploadAsset, deleteSource } from '@/lib/cloudinary'
import reguladorasJson from '@/data/preventivas.json'
import fs from 'node:fs/promises'
import path from 'node:path'

const basePath = path.join(process.cwd(), '..', 'viales-preventivas')
const reguladoras = reguladorasJson.map((s, i) => {
  const index = (i + 1).toString().padStart(2, '0')
  return {
    ...s,
    image: '/preventiva-' + index + '.png',
  }
})

// console.log(reguladoras)

export default async function Page() {
  const signals = await SignalsModel.getAll()

  if (!signals.data) return

  const codes = signals.data.map(s => s.code)
  const filteredSignals = signals.data
    .filter(s => s.category === 'viales')
    .filter(s => s.code.toLowerCase().startsWith('p'))
  console.log(filteredSignals.length)
  //
  //
  //Borrar en db
  // filteredSignals.forEach(async signal => {
  //   try {
  //     await SignalsModel.delete(signal.id)
  //     await deleteSource(signal.publicId)
  //     console.log(`[BORRADO]: ${signal.code} - ${signal.title}`)
  //   } catch (error) {
  //     console.log(error)
  //     console.log('error borrando signal')
  //   }
  //
  //   console.log('Borrado completo')
  // })

  // Insertar la imagen
  reguladoras.forEach(async signal => {
    if (!codes.includes(signal.code)) {
      try {
        const res = await uploadAsset(basePath + signal.image, {
          folder: 'demo',
        })

        await SignalsModel.create({
          title: signal.title,
          code: signal.code,
          category: 'viales' as SignalCategory,
          width: res.width,
          height: res.height,
          publicId: res.public_id,
          url: res.secure_url,
          format: res.format,
          description: signal.description,
        })

        console.log(`[INSERTED]: ${signal.code} - ${signal.title}`)
      } catch (error) {
        console.log(error)
      }
    }
  })

  // Guardar en base de datos

  return <h1>Only Scripts</h1>
}
