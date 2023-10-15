'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { DeleteIcon, EyeIcon } from '@/icons'
import { getIgv } from '@/utils'

function RealtimeQuotations({ serverQuotations }) {
  const [quotations, setQuotations] = useState(serverQuotations)
  const supabase = createClientComponentClient()

  const handleDeleteQuotation = async id => {
    const { error } = await supabase.from('quotations').delete().eq('id', id)

    if (error) {
      console.log('error delete quotation', error)
    }

    console.log('delete quotation', id)
  }

  useEffect(() => {
    setQuotations(serverQuotations)
  }, [serverQuotations])

  useEffect(() => {
    const TYPE = {
      INSERT: 'INSERT',
      UPDATE: 'UPDATE',
      DELETE: 'DELETE',
    }

    const handleSubscription = payload => {
      console.log('type:', payload.eventType)

      if (payload.eventType === TYPE.INSERT) {
        setQuotations(quotations => [...quotations, payload.new])
      }

      if (payload.eventType === TYPE.DELETE) {
        setQuotations(prevQuos => {
          const quosToUpdate = prevQuos.filter(q => q.id !== payload.old.id)
          console.log({ quosToUpdate })
          return quosToUpdate
        })
      }

      if (payload.eventType === TYPE.UPDATE) {
        setQuotations(quotations =>
          quotations.map(quotation =>
            quotation.id === payload.new.id ? payload.new : quotation,
          ),
        )
      }
    }

    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quotations' },
        handleSubscription,
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setQuotations, quotations])


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
          {quotations.map(quotation => {
            const {total} = getIgv(quotation.items)
            return (
              <tr key={quotation.id}>
                <th className='text-warning'>#{quotation.number}</th>
                <td>
                  <div>
                    <p className='w-[300px]'>{quotation.company}</p>
                    <p >{quotation.ruc}</p>
                  </div>
                </td>
                <td>S/{' '}{total}</td>
                <td className="flex gap-x-2">
                  <button
                    className="btn"
                    onClick={() => handleDeleteQuotation(quotation.id)}
                  >
                    <DeleteIcon />
                  </button>
                  <Link
                    href={`/quotations/${quotation.number}`}
                    className="btn"
                  >
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

export default RealtimeQuotations
