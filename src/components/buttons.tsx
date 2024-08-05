import { PlusIcon } from '@/icons'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'

export function AddButton() {
  return (
    <DialogTrigger asChild>
      <Button variant="primary" size="sm">
        <PlusIcon />
        <span className="ml-2 hidden sm:block">Crear</span>
      </Button>
    </DialogTrigger>
  )
}
