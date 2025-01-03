'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useActionState } from 'react';
import { SubmitButton } from './submit-button'

interface Props {
  action: (_: undefined, formData: FormData) => Promise<void>
  buttonComponent: React.JSX.Element
  children?: React.ReactNode
  // modalTitle?: string
  dialogTitle: string
  dialogDescription: string
}

export function ActionForm(props: Props) {
  const {
    action,
    buttonComponent,
    children,
    dialogTitle = 'dialog Title',
    dialogDescription = 'Dialog Description',
  } = props
  const [state, dispatch] = useActionState(action, null)
  return (
    <>
      <Dialog>
        <DialogContent className="max-h-[200px] max-w-xs">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form className="w-full" action={dispatch}>
              {children}
              <SubmitButton />
            </form>
          </DialogFooter>
        </DialogContent>
        <DialogTrigger asChild>{buttonComponent}</DialogTrigger>
      </Dialog>
    </>
  )
}
