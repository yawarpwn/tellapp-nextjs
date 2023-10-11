'use client'
import { useState, useEffect } from 'react'
import DownloadPDF from '@/components/pdf/download-pdf'

function RealtimeQuotation({ serverQuotation }) {
  const [quotation, setQuotation] = useState(serverQuotation)
  const { number, create_at, items } = quotation

  const formatedDate = new Intl.DateTimeFormat('es').format(create_at)
  return (
    <>
      <header className='flex gap-x-2'>
        <button className="btn btn-primary">Update</button>
        <DownloadPDF quotation={quotation} />
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold mb-2">Invoice #{number}</h2>
            <p className="text-sm">Creado: {formatedDate}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>U/M</th>
                  <th>Cant</th>
                  <th>P.Unit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>{item.unit_size}</td>
                      <td>{item.qty}</td>
                      <td>{item.price.toFixed(2)}</td>
                      <td>100.00</td>
                    </tr>
                  )
                })}
                <tr>
                  <td
                    colSpan={4}
                    className="text-right py-3 px-4 uppercase font-semibold text-sm"
                  >
                    Subtotal:
                  </td>
                  <td colSpan="" className="text-right py-3 px-4">
                    200.00
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    className="text-right py-3 px-4 uppercase font-semibold text-sm"
                  >
                    IGV:
                  </td>
                  <td colSpan="" className="text-right py-3 px-4">
                    20.00
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    className="text-right py-3 px-4 uppercase font-semibold text-sm"
                  >
                    Total{' '}:
                  </td>
                  <td colSpan="" className="text-right py-3 px-4">
                    220.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default RealtimeQuotation
