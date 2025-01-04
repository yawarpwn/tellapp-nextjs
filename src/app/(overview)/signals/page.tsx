import { DataTable } from '@/components/data-table'
import { SIGNALS_CATEGORIES } from '@/constants'
import { SignalsModel } from '@/models'
import { CreateSignalDialog } from './_components/create-signal-dialog'
import { signalsColumns } from './_components/signals-columns'

export default async function Page() {
  const { data: signals, error } = await SignalsModel.getAll()
  if (error) throw error

  return (
    <DataTable
      categories={SIGNALS_CATEGORIES}
      createComponent={<CreateSignalDialog />}
      columns={signalsColumns}
      data={signals}
    />
  )
}
