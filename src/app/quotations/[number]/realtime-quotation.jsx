'use client'
import { useState, useEffect } from 'react'
import DownloadPDF from '@/components/pdf/download-pdf'
import Link from 'next/link'

function RealtimeQuotation({ serverQuotation }) {
  const [quotation, setQuotation] = useState(serverQuotation)
  const { number, create_at, items, id } = quotation





  const formatedDate = new Intl.DateTimeFormat('es').format(create_at)
  return (
    <>
      <header className="flex gap-x-2">
        <Link href={`/quotations/update?id=${id}`} className="btn btn-primary">Editar</Link>
        <DownloadPDF quotation={quotation} />
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 flex justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Cotización #{number}</h2>
              <h3>{quotation.company}</h3>
              <p className="text-xs">{quotation?.address ?? 'Sin dirección'}</p>
            </div>
            <div>
              <p className="text-sm">Fecha: {formatedDate}</p>
            </div>
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
                    Total :
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
