'use client'
import { QuotationClientUpdate, type Customer, type Product, QuotationClientCreate } from '@/types'

import {
  createQuotationStore,
  initQuotationStore,
  type QuotationStore,
} from '@/store/create-quotation-store'
import React from 'react'
import { useStore } from 'zustand'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'

type QuotationCreateStoreApi = ReturnType<typeof createQuotationStore>

export const QuotationCreateStoreContext = React.createContext<QuotationCreateStoreApi | undefined>(
  undefined,
)

// type QuotationProviderProps =  React.PropsWithChildren<Partial<QuotationStore>>
type QuotationCreateStoreProviderProps = {
  children: React.ReactNode
  customers: Customer[]
  products: Product[]
}

export function QuotationCreateStoreProvider(props: QuotationCreateStoreProviderProps) {
  const { children, customers, products } = props
  const storeRef = React.useRef<QuotationCreateStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createQuotationStore<QuotationClientCreate>(
      initQuotationStore({
        customers,
        products,
      }) as QuotationStore<QuotationClientUpdate>,
    )
  }
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const hasSavedQuotation = localStorage.getItem('TELL')

    if (hasSavedQuotation) {
      setConfirmModalOpen(true)
    }
  }, [])

  return (
    <QuotationCreateStoreContext value={storeRef.current}>
      {confirmModalOpen && (
        <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
          <DialogContent className="border">
            <DialogHeader>
              <DialogTitle>Recupear Cotización</DialogTitle>
              <DialogDescription>
                Hemos recuperando una cotización no guardarda, ¿Desea restaurarla?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  storeRef.current?.persist.clearStorage()
                  setConfirmModalOpen(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                variant={'primary'}
                onClick={() => {
                  storeRef.current?.persist.rehydrate()
                  setConfirmModalOpen(false)
                }}
              >
                Aceptar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {children}
    </QuotationCreateStoreContext>
  )
}

export function useQuotationCreateStore<T>(
  selector: (state: QuotationStore<QuotationClientCreate>) => T,
): T {
  const quotationCreateStoreContext = React.useContext(QuotationCreateStoreContext)

  if (!quotationCreateStoreContext)
    throw new Error('useQuotationCreateStore must be used within CounterStoreProvider')

  return useStore(quotationCreateStoreContext, selector)
}
