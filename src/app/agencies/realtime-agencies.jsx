'use client'

import { useState } from 'react'
import InputsCreateUpdateAgency from './inputs-create-update-agency'
import AddFormAction from '@/components/form-actions/add-form-action'
import DeleteFormAction from '@/components/form-actions/delete-form-action'
import EditFormAction from '@/components/form-actions/edit-form-action'
import {
  createAgencieAction,
  deleteAgencieAction,
  updateAgencieAction,
} from './actions'
import InputSearch from '@/components/input-search'

function RealTimeAgencies({ serverAgencies  }) {
  const [filterValue , setFilterValue] = useState('')
  const [isOpenModalAgency, setIsOpenModalAgency] = useState(false)
  const [editingAgency, setEditingAgency] = useState(null)
  const [agencies, setAgencies] = useState(serverAgencies)
  const handleSearchChange = (event) => {
    const value = event.target.value
    setFilterValue(value)
    const filteredData = serverAgencies.filter((agency) => {
      return agency.company.toLonerCase().includes(value.toLowerCase())
    })
    setAgencies(filteredData)
  }
  return (
    <div>
      <header className='flex justify-between'>
        <InputSearch  
          placeholder='Buscar agencias...'
          onSearchChange={handleSearchChange}
          value={filterValue}
        />
        <AddFormAction
          addAction={createAgencieAction}
          titleModal="Agregar Agencia"
        >
          <InputsCreateUpdateAgency />
        </AddFormAction>
      </header>
      {isOpenModalAgency  && (
        <EditFormAction agency={updateAgencieAction} isOpenModal={isOpenModalAgency}>
          <InputsCreateUpdateAgency agency={editingAgency}/>
        </EditFormAction>
      )}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Ruc</th>
              <th>Telefono</th>
              <th>Accciones</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map(agency => {
              const { company, id, ruc, address, destinations } = agency
              return (
                <tr key={id}>
                  <td>
                    <div>
                      <p className="w-[300px]">{company}</p>
                      <p className="text-xs">{address ?? 'Sin dirección'}</p>
                    </div>
                  </td>
                  <td>{ruc}</td>
                  <td>null</td>
                  <td>
                    <div className="flex gap-2">
                      <button className='btn' onClick={() => {
                        setEditingAgency(agency)
                        setIsOpenModalAgency(true)
                      }
                      }>edit</button>
                      <DeleteFormAction
                        titleModal="¿Seguro deseas eliminar esta agencia?"
                        deleteAction={deleteAgencieAction}
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

export default RealTimeAgencies
