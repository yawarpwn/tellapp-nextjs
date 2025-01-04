import { QuotationsModel } from '@/models'
import { DataTable } from './data-table'

export default async function Page() {
  const { data: quotations, error } = await QuotationsModel.getAll()

  if (error) throw error

  return <DataTable data={quotations} />
}
