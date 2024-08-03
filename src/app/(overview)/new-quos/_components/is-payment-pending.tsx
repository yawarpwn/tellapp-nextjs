'use client'
import { Button } from '@/components/ui/button'
import { setIsPaymentPending } from '@/lib/actions/quoatations'
import { useTransition } from 'react'
export function IsPaymentPendingButton({
  isPaymentPending,
  id,
  quotationNumber,
}: {
  isPaymentPending: boolean
  id: string
  quotationNumber: number
}) {
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      setIsPaymentPending({
        id,
        value: !isPaymentPending,
        quoNumber: quotationNumber,
      })
    })
  }

  return (
    <form>
      <Button disabled={pending} onClick={handleClick} variant="secondary" size={'sm'}>
        {isPaymentPending ? (
          <>
            <span className="size-2 rounded-full bg-yellow-500"></span>
            <span className="ml-2 hidden lg:block">Pendiente</span>
          </>
        ) : (
          <>
            <span className="size-2 rounded-full bg-green-400"></span>
            <span className="ml-2 hidden lg:block">Pagado</span>
          </>
        )}
      </Button>
    </form>
  )
}
