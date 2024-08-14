'use client'
import { type Customer, type Product, QuotationClient, QuotationClientUpdate } from '@/types'

import {
  createQuotationStore,
  initQuotationStore,
  type QuotationStore,
} from '@/store/create-quotation-store'
import React from 'react'
import { useStore } from 'zustand'

type QuotationCreateStoreApi = ReturnType<typeof createQuotationStore<QuotationClientUpdate>>

export const QuotationCreateStoreContext = React.createContext<QuotationCreateStoreApi | undefined>(
  undefined,
)

// type QuotationProviderProps =  React.PropsWithChildren<Partial<QuotationStore>>
type QuotationCreateStoreProviderProps = {
  quo: QuotationClient
  children: React.ReactNode
  customers: Customer[]
  products: Product[]
}

export function QuotationUpdateStoreProvider(props: QuotationCreateStoreProviderProps) {
  const { children, customers, products, quo } = props
  const storeRef = React.useRef<QuotationCreateStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createQuotationStore<QuotationClientUpdate>(
      initQuotationStore({
        quo: {
          id: quo.id,
          deadline: quo.deadline,
          address: quo.address,
          customerId: quo.customerId,
          company: quo.company,
          credit: quo.credit,
          includeIgv: quo.includeIgv,
          isRegularCustomer: quo.isRegularCustomer,
          number: quo.number,
          ruc: quo.ruc,
          createdAt: quo.createdAt,
          updatedAt: quo.updatedAt,
        },
        items: quo.items,
        customers,
        products,
      }) as QuotationStore<QuotationClientUpdate>,
    )
  }

  return (
    <QuotationCreateStoreContext.Provider value={storeRef.current}>
      {children}
    </QuotationCreateStoreContext.Provider>
  )
}

export function useQuotationUpdateStore<T>(
  selector: (state: QuotationStore<QuotationClientUpdate>) => T,
): T {
  const quotationCreateStoreContext = React.useContext(QuotationCreateStoreContext)

  if (!quotationCreateStoreContext)
    throw new Error('useQuotationUpdateStore must be used within QuotationUpdateStoreProvider')

  return useStore(quotationCreateStoreContext, selector)
}
