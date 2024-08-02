'use client'
import { Button } from '@/components/ui/button'
import { StartIcon } from '@/icons'
import { setIsRegularCustomerAction } from '@/lib/actions/customers'
import { useTransition } from 'react'
export function IsRegularButton({
  isRegular,
  id,
  quotationNumber,
}: {
  isRegular: boolean
  id: string
  quotationNumber: number
}) {
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      setIsRegularCustomerAction({
        id,
        value: !isRegular,
        quoationNumber: quotationNumber,
      })
    })
  }

  return (
    <form>
      <Button
        disabled={pending}
        onClick={handleClick}
        variant="secondary"
        size={'sm'}
      >
        <StartIcon size={20} filled={isRegular} />
        <span className="ml-2 max-md:sr-only">Favorito</span>
      </Button>
    </form>
  )
}
