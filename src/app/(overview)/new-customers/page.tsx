import { DataTable } from '@/components/data-table'
import { CustomersModel } from '@/models'
import { CreateCustomerDialog } from './_components/create-customer-dialog'
import { customerColumns } from './_components/customer-columns'

export default async function Page() {
  const { data: customers, error } = await CustomersModel.getAll()
  if (error) throw error
  return (
    <DataTable
      createComponent={<CreateCustomerDialog />}
      columns={customerColumns}
      data={customers}
    />
  )
}
