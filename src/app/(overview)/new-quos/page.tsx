import { DataTable } from './data-table'
import { fetchQuotations } from '@/lib/data/quotations'

//TODO: this function don't work because 2MB limit cache
// const getQuotations = unstable_cache(
//   async () => {
//     return QuotationsModel.getAll()
//   },
//   ['new-quos'],
//   { revalidate: 3600, tags: ['new-quos'] },
// )

export default async function Page() {
  const quotations = await fetchQuotations()
  console.log('total Quotations ', quotations.length)
  return <DataTable data={quotations} />
}
