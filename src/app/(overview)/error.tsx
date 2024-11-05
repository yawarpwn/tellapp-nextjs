'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex h-full min-h-[100dvh] flex-col items-center justify-center">
      <div>
        <h2 className="text-center">Algo salió mal</h2>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Intentar de nuevo
        </Button>
      </div>
    </main>
  )
}
