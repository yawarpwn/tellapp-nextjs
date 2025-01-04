import { DataTable } from '@/components/data-table'
import { LabelsProvider } from '@/providers/labels-provider'
import { CreateLabelDialog } from './_components/create-label-dialog'
import { labelColumns } from './_components/label-columns'
import { fetchLabels } from '@/lib/data/labels'
import { fetchAgencies } from '@/lib/data/agencies'

export default async function Page() {
  // const labels = await fetchLabels()
  // const agencies = await fetchAgencies()
  const [labels, agencies] = await Promise.all([fetchLabels(), fetchAgencies()])
  console.log('Total Labels: ', labels.length)

  return (
    <LabelsProvider agencies={agencies}>
      <DataTable createComponent={<CreateLabelDialog />} columns={labelColumns} data={labels} />
    </LabelsProvider>
  )
}
