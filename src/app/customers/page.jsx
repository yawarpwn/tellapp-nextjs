import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
export default async function CustomersPage() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data: customers } = await supabase.from('customers').select()
  return (
    <div>
      {/* <NewQuotation /> */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ruc</th>
              <th>Telefono</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => {
              return (
                <tr key={customer.id}>
                  <td>
                    <div>
                      <p className="w-[300px] text-yellow-100">{customer.name}</p>
                      <p className='text-xs'>{customer.address}</p>
                    </div>
                  </td>
                  <td>{customer.ruc}</td>

                  <td>{customer?.phone}</td>

                  <td>{customer?.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
