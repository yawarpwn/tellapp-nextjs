import { QuotationClientCreate } from '@/schemas'
import { useState, useEffect } from 'react'

const IS_SERVER = typeof window === 'undefined'
const KEY = 'TELL_QUOTATIONS'
const INTERVAL = 3000

export function useAutoSaveLocalStorage(initialValue: QuotationClientCreate) {
  // Efecto para guardar el estado en localStorage cada `INTERVAL` segundos
  useEffect(() => {
    if (IS_SERVER) return

    const intervalId = setInterval(() => {
      window.localStorage.setItem(KEY, JSON.stringify(initialValue))
      console.log({ initialValue })
    }, INTERVAL)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)
  }, [initialValue])
}
