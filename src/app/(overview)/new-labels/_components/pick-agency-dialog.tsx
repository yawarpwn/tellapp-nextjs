import { Agency } from '@/schemas'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface Props {
  agencies: Agency[]
  agencyId?: string | null
  onPickAgency: (agencyId: string | null) => void
}
export function PickAgencyDialog({ agencies, agencyId, onPickAgency }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="w-full">
          <span className="truncate">
            {agencyId ? agencies.find(a => a.id === agencyId)?.name : 'Agencia'}
          </span>
          <ChevronDown className="ml-2 size-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <button onClick={() => console.log('pick')}>opcion 1 </button>
      </DialogContent>
    </Dialog>
  )
}
