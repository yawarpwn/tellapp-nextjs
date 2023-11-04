import Link from 'next/link'
import { getIgv } from '@/utils'
import { fetchFilteredQuotations } from '@/lib/quotations-data'
import React from 'react'
import { EditButton } from '../buttons'
import { EyeIcon } from '@/icons'

async function QuotationsTable({ query, currentPage }) {
  const products = await fetchFilteredQuotations({ query, currentPage })
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(quotation => {
            const { total } = getIgv(quotation.items)
            const formatedDate = new Intl.DateTimeFormat('es').format(
              new Date(quotation.created_at),
            )
            return (
              <tr key={quotation.id}>
                <td>
                  <Link href={`/quotations/${quotation.number}`}>
                    <span className="text-primary font-bold">#</span>
                    {quotation.number}
                  </Link>
                </td>
                <td>
                  <div>
                    <p className="w-[300px]">{quotation.company}</p>
                    <p>{quotation.ruc}</p>
                  </div>
                </td>
                <td>
                  <span className="text-xs">{formatedDate}</span>
                </td>
                <td>{total}</td>
                <td className="flex gap-x-2">
                  <EditButton href={`/quotations/${quotation.number}/update`} />
                  <Link className="" href={`/quotations/${quotation.number}`}>
                    <EyeIcon />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default QuotationsTable
