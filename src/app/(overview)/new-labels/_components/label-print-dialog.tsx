import { LabelTemplate, PrintLabel } from '@/components/label-template'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { LabelType } from '@/types'
import React from 'react'
import { useReactToPrint } from 'react-to-print'
// import { useReactToPrint } from 'react-to-print'

interface Props {
  onOpenChange: (open: boolean) => void
  open: boolean
  label: LabelType
}
export function LabelPrintDialog({ open, onOpenChange, label }: Props) {
  const containerRef = React.useRef(null)

  const handlePrint = useReactToPrint({
    content: () => containerRef.current,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <button onClick={handlePrint}>Print</button>
      </DialogHeader>
      <DialogContent className="max-h-[800px]">
        <button onClick={handlePrint}>Print</button>
        <PrintLabel label={label} ref={containerRef} />
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  )
}
