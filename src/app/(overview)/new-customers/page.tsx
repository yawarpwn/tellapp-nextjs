import { DataTable } from '@/components/data-table'
import { CustomersModel } from '@/models'
import { CreateCustomerDialog } from './_components/create-customer-dialog'
import { customerColumns } from './_components/customer-columns'
import { fetchCustomers } from '@/lib/data/customers'

export default async function Page() {
  const customers = await fetchCustomers()
  console.log('Tottal Customers saved: ', customers.length)
  return (
    <DataTable
      createComponent={<CreateCustomerDialog />}
      columns={customerColumns}
      data={customers}
    />
  )
}
