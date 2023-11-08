import React from 'react'
import DeleteActionForm from '../delete-action-form'
import PrinterIcon from '@/icons/printer-icon'
import { EditButton } from '../buttons'
import { deleteLabel } from '@/lib/actions/labels'

async function LabelsTable({ onPrint, labels }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Destinatario</th>
            <th>Destino</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {labels?.map(label => {
            return (
              <tr key={label.id}>
                <td>
                  <div>
                    <p className="w-[300px]">{label.recipient}</p>
                    <p>{label.dni_ruc}</p>
                  </div>
                </td>
                <td>
                  <p>{label.address}</p>
                  <p style={{ width: '200px' }}>{label.destination}</p>
                </td>
                <td>{label.phone}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onPrint(label)}>
                      <PrinterIcon />
                    </button>
                    <EditButton href={`/labels/${label.id}/update`} />
                    <DeleteActionForm
                      id={label.id}
                      deleteAction={deleteLabel}
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LabelsTable
