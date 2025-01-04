import { DataTable } from '@/components/data-table'
import { agencyColumns } from './_components/agency-columns'
import { CreateAgencyDialog } from './_components/create-agency-dialog'
import { AgenciesModel } from '@/models/agencies'

export default async function Page() {
  const { error, data: agencies } = await AgenciesModel.getAll()

  if (error) throw error
  return (
    <DataTable createComponent={<CreateAgencyDialog />} columns={agencyColumns} data={agencies} />
  )
}
