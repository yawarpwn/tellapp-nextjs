import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { Suspense } from 'react'
import { CustomersModel } from '@/models'
import { CreateCustomerDialog } from './_components/create-customer-dialog'
import { customerColumns } from './_components/customer-columns'
import { unstable_noStore as noStore } from 'next/cache'

async function ProductTable() {
  noStore()
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

export default async function Page() {
  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />}
    >
      <ProductTable />
    </Suspense>
  )
}
