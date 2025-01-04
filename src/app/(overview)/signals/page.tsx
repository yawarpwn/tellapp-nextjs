import { DataTable } from '@/components/data-table'
import { SIGNALS_CATEGORIES } from '@/constants'
import { CreateSignalDialog } from './_components/create-signal-dialog'
import { signalsColumns } from './_components/signals-columns'
import { fetchSignals } from '@/lib/data/signals'

export default async function Page() {
  const signals = await fetchSignals()
  console.log('Total Signals: ', signals.length)

  return (
    <DataTable
      categories={SIGNALS_CATEGORIES}
      createComponent={<CreateSignalDialog />}
      columns={signalsColumns}
      data={signals}
    />
  )
}
