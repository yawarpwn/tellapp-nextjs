import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AddFormAction from '@/components/form-actions/add-form-action'
import DeleteFormAction from '@/components/form-actions/delete-form-action'
import Input from '@/components/input'
import {
  createCustomerAction,
  deleteCustomerAction,
  updateCustomerAction,
} from './actions'
import EditFormAction from '@/components/form-actions/edit-form-action'

function InputsCreateUpdate({ customer }) {
  // console.log(customer)
  //  name: 'PRODUCTOS QUIMICOS INDUSTRIALES S A',
  // ruc: '20100170681',
  // address: 'AV. EL SANTUARIO NRO. 1239 Z.I. ZARATE LIMA LIMA SAN JUAN DE LURIGANCHO',
  // phone: '',
  // email: null
  // const { name, ruc, address, phone, email } = customer
  return (
    <>
      <Input
        name="name"
        defaultValue={customer?.name}
        labelText={'Nombre'}
        placeholder="Nombre del cliente"
        type="text"
        required
      />
      <Input
        name="ruc"
        defaultValue={customer?.ruc}
        labelText={'Ruc'}
        placeholder="Ruc del cliente"
        type="number"
        required
      />
      <Input
        labelText={'Dirección'}
        defaultValue={customer?.address}
        name="address"
        type="text"
        placeholder="Av. Fauccett 232 - Callao"
      />

      <Input
        name="phone"
        defaultValue={customer?.phone}
        labelText={'Telefono'}
        type="number"
        placeholder="999 999 999"
      />
      <Input
        name="email"
        defaultValue={customer?.email}
        labelText={'Email'}
        type="email"
        placeholder="ventas@example.com"
      />
      <input defaultValue={customer?.id} name="id" className="sr-only" />
    </>
  )
}
export default async function CustomersPage() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data: customers } = await supabase.from('customers').select()
  return (
    <div>
      {/* <NewQuotation /> */}
      <header>
        <AddFormAction
          addAction={createCustomerAction}
          titleModal="Agregar cliente"
        >
          <InputsCreateUpdate />
        </AddFormAction>
      </header>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ruc</th>
              {/* <th>Telefono</th> */}
              {/* <th>Email</th> */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => {
              const { id, phone, email, ruc, name, address } = customer
              return (
                <tr key={id}>
                  <td>
                    <div>
                      <p className="w-[300px] text-yellow-100">{name}</p>
                      <p className="text-xs">{address}</p>
                    </div>
                  </td>
                  <td>{ruc}</td>
                  {/* <td>{phone}</td> */}
                  {/* <td>{email}</td> */}
                  <td>
                    <div className="flex gap-2">
                      <EditFormAction
                        titleModal="Editar Cliente"
                        updateAction={updateCustomerAction}
                      >
                        <InputsCreateUpdate customer={customer} />
                      </EditFormAction>
                      <DeleteFormAction
                        titleModal="¿Seguro deseas eliminar esta empresa?"
                        deleteAction={deleteCustomerAction}
                        id={id}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
