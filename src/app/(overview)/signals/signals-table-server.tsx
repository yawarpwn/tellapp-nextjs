import { CreateSignalDialog } from './_components/create-signal-dialog'
import { signalsColumns } from './_components/signals-columns'
import { DataTable } from '@/components/data-table'
import { SignalsModel } from '@/models'
import { SIGNALS_CATEGORIES } from '@/constants'
import { type Signal } from '@/schemas'
import { deleteSource, uploadAsset } from '@/lib/cloudinary'

const updateImage = async (signal: Signal) => {
  console.log('updating signal: ' + signal.code)
  try {
    const res = await uploadAsset(signal.url, {
      folder: 'signals',
      transformation: [
        {
          width: 'auto',
          height: 417,
          crop: 'scale',
          quality: 'auto',
          format: 'webp',
        },
      ],
    })

    const { data, error } = await SignalsModel.update(
      {
        width: res.width,
        height: res.height,
        format: res.format,
        url: res.secure_url,
        publicId: res.public_id,
      },
      signal.id,
    )

    await deleteSource(signal.publicId)

    if (error) throw error
  } catch (error) {
    console.log(error)
  }

  console.log('Success: ' + signal.code)
}

export async function SignalTableServer() {
  const { data: signals, error } = await SignalsModel.getAll()
  if (error) throw error

  // const filteredSignal = signals.filter(s => s.height >= 1000)
  //
  // for (const signal of filteredSignal) {
  //   updateImage(signal)
  // }

  return (
    <DataTable
      categories={SIGNALS_CATEGORIES}
      createComponent={<CreateSignalDialog />}
      columns={signalsColumns}
      data={signals}
    />
  )
}
