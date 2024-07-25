'use client'
import {
  type CustomerType,
  type ProductType,
  type QuotationCreateType,
  type QuotationItemType,
  type QuotationType,
  type QuotationUpdateType,
} from '@/types'

import {
  createQuotationStore,
  initQuotationStore,
  type QuotationStore,
} from '@/store/quos'
import React from 'react'
import { StoreApi, useStore } from 'zustand'

type QuoStore = ReturnType<typeof createQuotationStore>

export const QuotationContext = React.createContext<QuoStore | null>(null)

export function useQuotationStore() {
  const store = React.useContext(QuotationContext)
  return store
}

// type QuotationProviderProps =  React.PropsWithChildren<Partial<QuotationStore>>
type QuotationCreateProviderProps = {
  children: React.ReactNode
  customers: CustomerType[]
  products: ProductType[]
  quoNumber: number
}

export function QuotationCreateProvider(props: QuotationCreateProviderProps) {
  props
  const storeRef = React.useRef<QuoStore>()
  if (!storeRef.current) {
    storeRef.current = createQuotationStore(
      initQuotationStore({
        customers,
        products,
        quo,
        items,
        isUpdate,
        quoNumber,
      }),
    )
  }

  return (
    <QuotationContext.Provider value={storeRef.current}>
      {children}
    </QuotationContext.Provider>
  )
}

export function useQuotationContext<T>(
  selector: (state: QuotationStore) => T,
): T {
  const store = React.useContext(QuotationContext)

  if (!store) throw new Error('Missing QuotationContext.Provider in the tree')

  return useStore(store, selector)
}
