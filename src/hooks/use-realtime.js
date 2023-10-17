import { useState, useEffect } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useRealTime({ initialData, table = 'quotations' }) {
  const [rows, setRows] = useState(initialData)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const deleteRow = async id => {
    const { error } = await supabase.from(table).delete().eq('id', id)

    if (error) {
      console.log('error delete quotation', error)
    }

    console.log('delete quotation', id)
  }

  const updateRow = async rowToUpdate => {
    const { error } = await supabase
      .from(table)
      .update(rowToUpdate)
      .eq('id', rowToUpdate.id)
    setError(error)
  }

  const insertRow = async rowToInsert => {
    const { data, error } = await supabase.from(table).insert(rowToInsert).select()
    if(error) {
      console.log(error)
      setError(error)
    }

    console.log('inserted Row',data)

  }

  const supabase = createClientComponentClient()
  useEffect(() => {
    const TYPE = {
      INSERT: 'INSERT',
      UPDATE: 'UPDATE',
      DELETE: 'DELETE',
    }

    const handleSubscription = payload => {
      if (payload.eventType === TYPE.INSERT) {
        setRows(quotations => [...quotations, payload.new])
      }

      if (payload.eventType === TYPE.DELETE) {
        setRows(prevQuos => {
          const quosToUpdate = prevQuos.filter(q => q.id !== payload.old.id)
          return quosToUpdate
        })
      }

      if (payload.eventType === TYPE.UPDATE) {
        setRows(quotations =>
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
        { event: '*', schema: 'public', table },
        handleSubscription,
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setRows, rows, table])

  return {
    rows,
    error,
    loading,
    deleteRow,
    insertRow,
    updateRow,
  }
}
