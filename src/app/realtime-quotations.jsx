'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { EyeIcon } from '@/icons'
import { getIgv } from '@/utils'
import InputSearch from '@/components/input-search'
import { useRealTime } from '@/hooks/use-realtime'
import Pagination from '@/components/pagination'
import { ROW_PER_PAGE } from '@/constants'

function RealtimeQuotations({ serverQuotations }) {
  const [page, setPage] = useState(1)
  const { rows: quotations, deleteRow } = useRealTime({
    initialData: serverQuotations,
  })

  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = event => {
    const { value } = event.target
    setSearchValue(value)
    setPage(1)
  }

  const quotationsFiltered = useMemo(() => {
    if (!searchValue) {
      return quotations
    }
    return quotations.filter(quotation =>
      String(quotation.number).includes(searchValue),
    )
  }, [quotations, searchValue])

  const totalPages = useMemo(() => {
    return Math.ceil(quotationsFiltered.length / ROW_PER_PAGE)
  }, [quotationsFiltered])

  const nextPage = () => {
    if (page === totalPages) return
    setPage(page + 1)
  }

  const quotationsToRender = useMemo(() => {
    const start = (page - 1) * ROW_PER_PAGE
    const end = start + ROW_PER_PAGE
    return quotationsFiltered.slice(start, end)
  }, [page, quotationsFiltered])

  // useEffect(() => {
  //   setQuotations(serverQuotations)
  // }, [serverQuotations])

  return (
    <>
      <header className="flex justify-between items-center">
        <InputSearch
          onSearchChange={handleSearchChange}
          searchValue={searchValue}
          placeholder="Buscar cotización..."
        />
        <Link href="/quotations/create" className="btn btn-primary">
          Crear
        </Link>
      </header>

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
            {quotationsToRender.map(quotation => {
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
                    <Link
                      href={`/quotations/${quotation.number}`}
                      className="btn"
                    >
                      Ver
                      <EyeIcon />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        onNextPage={nextPage}
        updatePage={page => setPage(page)}
        totalPages={totalPages}
      />
    </>
  )
}

export default RealtimeQuotations
