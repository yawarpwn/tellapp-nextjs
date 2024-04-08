'use client'
import { type CustomerType, type ProductType } from '@/types'

import {
	createQuotationStore,
	initQuotationStore,
	type QuotationStore,
} from '@/store/quos'
import React from 'react'
import { StoreApi, useStore } from 'zustand'

export const QuotationContext = React.createContext<
	StoreApi<QuotationStore> | null
>(null)

export function useQuotationStore() {
	const store = React.useContext(QuotationContext)
	return store
}

// type QuotationProviderProps =  React.PropsWithChildren<Partial<QuotationStore>>
type QuotationProviderProps = {
	children: React.ReactNode
	customers: CustomerType[]
	products: ProductType[]
}

export function QuotationStoreProvider(
	{ children, ...props }: QuotationProviderProps,
) {
	const storeRef = React.useRef<StoreApi<QuotationStore>>()
	if (!storeRef.current) {
		storeRef.current = createQuotationStore(
			initQuotationStore(props.customers, props.products),
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
