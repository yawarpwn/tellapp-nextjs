'use client'
import { type Customer, type Product } from '@/types'

import {
  createQuotationStore,
  initQuotationStore,
  type QuotationStore,
} from '@/store/create-quotation-store'
import React from 'react'
import { useStore } from 'zustand'

type QuotationCreateStoreApi = ReturnType<typeof createQuotationStore>

export const QuotationCreateStoreContext = React.createContext<
  QuotationCreateStoreApi | undefined
>(undefined)

// export function useQuotationStore() {
//   const store = React.useContext(QuotationCreateStoreContext)
//   return store
// }

// type QuotationProviderProps =  React.PropsWithChildren<Partial<QuotationStore>>
type QuotationCreateStoreProviderProps = {
  children: React.ReactNode
  customers: Customer[]
  products: Product[]
}

export function QuotationCreateStoreProvider(
  props: QuotationCreateStoreProviderProps,
) {
  const { children, customers, products } = props
  const storeRef = React.useRef<QuotationCreateStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createQuotationStore(
      initQuotationStore({
        customers,
        products,
      }),
    )
  }

  return (
    <QuotationCreateStoreContext.Provider value={storeRef.current}>
      {children}
    </QuotationCreateStoreContext.Provider>
  )
}

export function useQuotationCreateStore<T>(
  selector: (state: QuotationStore) => T,
): T {
  const quotationCreateStoreContext = React.useContext(
    QuotationCreateStoreContext,
  )

  if (!quotationCreateStoreContext)
    throw new Error(
      'useQuotationCreateStore must be used within CounterStoreProvider',
    )

  return useStore(quotationCreateStoreContext, selector)
}
