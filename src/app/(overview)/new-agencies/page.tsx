import { DataTable } from '@/components/data-table'
import { agencyColumns } from './_components/agency-columns'
import { CreateAgencyDialog } from './_components/create-agency-dialog'
import { fetchAgencies } from '@/lib/data/agencies'

export default async function Page() {
  const agencies = await fetchAgencies()
  console.log('Total Agencies: ', agencies.length)

  return (
    <DataTable createComponent={<CreateAgencyDialog />} columns={agencyColumns} data={agencies} />
  )
}
