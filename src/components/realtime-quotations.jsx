'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

function RealtimeQuotations({ serverQuotations }) {
  const [quotations, setQuotations] = useState(serverQuotations)
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => {
            return (
              <tr key={quotation.id}>
                <th>{quotation.number}</th>
                <td>
                  <div>
                    <p>
                      {quotation.company}
                    </p>

                    <p>
                      {quotation.ruc}
                    </p>
                  </div>
                </td>
                <td>{quotation.items.length}</td>
                <td className='flex gap-x-2'>
                  <button className='btn'>Edit</button>
                  <Link href={`/quotations/${quotation.number}`} className='btn'>View</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RealtimeQuotations
