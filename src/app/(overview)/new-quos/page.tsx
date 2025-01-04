import { QuotationsModel } from '@/models'
import { DataTable } from './data-table'
import { unstable_cache } from 'next/cache'

//TODO: this function don't work because 2MB limit cache
const getQuotations = unstable_cache(
  async () => {
    return QuotationsModel.getAll()
  },
  ['new-quos'],
  { revalidate: 3600, tags: ['new-quos'] },
)

export default async function Page() {
  const { data: quotations, error } = await QuotationsModel.getAll()

  if (error) {
    return <div>Algo salió mal</div>
  }

  return <DataTable data={quotations} />
}
