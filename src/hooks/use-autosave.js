'use client'
import { useEffect, useReducer, useRef } from 'react'

export default function useAutoSave({ callback, delay = 1000, deps =[]}) {
  const  savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {

    const runCallback  = () => {
      savedCallback.current()
    }

    if(typeof delay === 'number') {
      const id = setInterval(runCallback, delay)
      return () => clearInterval(id)
    }

  }, [delay, deps])
}
