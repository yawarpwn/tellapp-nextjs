import { Button } from '@/components/ui/button'
import { EmpetyIcon } from '@/icons'

export function NoResult() {
  return (
    <div className="flex flex-col items-center gap-4">
      <EmpetyIcon className="mt-16 h-20 w-20" />
      <h2 className="py-8 text-xl">Sin Produtos agregados</h2>
    </div>
  )
}
