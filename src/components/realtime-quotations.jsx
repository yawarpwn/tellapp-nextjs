'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

function RealtimeQuotations({ serverQuotations }) {
  const [quotations, setQuotations] = useState(serverQuotations)
  console.log({ serverQuotations })
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <td>No</td>
          <td>Cliente</td>
          <td>Total</td>
          <td>Acciones</td>
        </thead>
        <tbody>
          {quotations.map((quotation, index) => {
            const { company, number, items } = quotation
            return (
              <tr key={index}>
                <td>{number}</td>
                <td>{company}</td>
                <td>{items.length}</td>
                <td>
                  <div className='flex gap-x-2'>
                    <button className='btn btn-outline btn-primary'>Edit</button>
                    <button className='btn btn-outline btn-error'>Delete</button>
                    <Link className='btn btn-outline btn-success' href={`/quotations/${number}`}>
                       View
                    </Link>
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

export default RealtimeQuotations
