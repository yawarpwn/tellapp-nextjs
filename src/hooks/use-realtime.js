import { useState, useEffect } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useRealTime({ initialData}) {
  const [data, setData] = useState(initialData)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const deleteData= async id => {
    const { error } = await supabase.from('quotations').delete().eq('id', id)

    if (error) {
      console.log('error delete quotation', error)
    }

    console.log('delete quotation', id)
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
        setData(quotations => [...quotations, payload.new])
      }

      if (payload.eventType === TYPE.DELETE) {
        setData(prevQuos => {
          const quosToUpdate = prevQuos.filter(q => q.id !== payload.old.id)
          return quosToUpdate
        })
      }

      if (payload.eventType === TYPE.UPDATE) {
        setData(quotations =>
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
  }, [supabase, setData, data])

  return {
    data,
    error,
    loading,
    deleteData
  }
}
