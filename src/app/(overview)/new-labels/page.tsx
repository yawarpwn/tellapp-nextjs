import { DataTable } from '@/components/data-table'
import { AgenciesModel } from '@/models/agencies'
import { LabelsModel } from '@/models/labels'
import { LabelsProvider } from '@/providers/labels-provider'
import { CreateLabelDialog } from './_components/create-label-dialog'
import { labelColumns } from './_components/label-columns'

export default async function Page() {
  const [
    { data: labelsResponse, error: labelsError },
    { data: agenciesResponse, error: agenciesError },
  ] = await Promise.all([LabelsModel.getAll(), AgenciesModel.getAll()])

  if (labelsError || agenciesError) {
    throw new Error('Error al obtener los datos')
  }

  return (
    <LabelsProvider agencies={agenciesResponse}>
      <DataTable
        createComponent={<CreateLabelDialog />}
        columns={labelColumns}
        data={labelsResponse}
      />
    </LabelsProvider>
  )
}
